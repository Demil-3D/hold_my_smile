import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { GBP } from "@/utils/config";
import incomeLogs from "@/utils/income-logs.json";
import { Cell, Label, Pie, PieChart } from "recharts";

interface IncomeLogProps {
  patient_name: string;
  product: string;
  payment_id: string;
  amount_paid: number;
  payment_method: string;
  payment_date: string;
  status: string; //"Paid" | "Failed";
}

interface FinancialMetrics {
  totalGrossRevenue: string | number;
  totalProductionCosts: string | number;
  totalProfit: string | number;
  takeHomePay: string | number;
  breakEvenMonth: string | null;
}

interface OneOffPurchases {
  totalCount: number;
  totalRevenue: number;
  patients: string[];
}

interface PatientValueMetrics {
  arpp: number;
  planPopularity: Record<string, number>;
  oneOffPurchases: OneOffPurchases;
}

interface RiskMetrics {
  defaultRate: string; // Formatted as a percentage "X.X%"
  totalDefaultAmount: string | number; // GBP formatted
  currentMonthFailures: IncomeLogProps[]; // The "Needs Attention" list
}

// --- CALCULATION FUNCTIONS ---

function calculateFinancialMetrics(
  logs: Array<IncomeLogProps>,
  costPerPatient: number = 180,
  clinicianCut: number = 0.37,
): FinancialMetrics {
  const uniquePatients = new Set(logs.map((log) => log.patient_name)).size;
  const totalProductionCosts = uniquePatients * costPerPatient;

  const paidLogs = logs
    .filter((log) => log.status === "Paid")
    .sort(
      (a, b) =>
        new Date(a.payment_date).getTime() - new Date(b.payment_date).getTime(),
    );

  let totalGrossRevenue = 0;
  let breakEvenMonth: string | null = null;

  for (const log of paidLogs) {
    totalGrossRevenue += log.amount_paid;

    if (totalGrossRevenue >= totalProductionCosts && !breakEvenMonth) {
      const date = new Date(log.payment_date);
      breakEvenMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }
  }

  const totalProfit = totalGrossRevenue - totalProductionCosts;
  const takeHomePay = totalProfit > 0 ? totalProfit * clinicianCut : 0;

  return {
    totalGrossRevenue: GBP.format(totalGrossRevenue),
    totalProductionCosts: GBP.format(totalProductionCosts),
    totalProfit: GBP.format(totalProfit),
    takeHomePay: GBP.format(takeHomePay),
    breakEvenMonth,
  };
}

function calculatePatientValueMetrics(
  logs: Array<IncomeLogProps>,
): PatientValueMetrics {
  const paidLogs = logs.filter((log) => log.status === "Paid");

  const totalGrossRevenue = paidLogs.reduce(
    (sum, log) => sum + log.amount_paid,
    0,
  );
  const uniquePatientsCount = new Set(logs.map((log) => log.patient_name)).size;
  const arpp =
    uniquePatientsCount > 0 ? totalGrossRevenue / uniquePatientsCount : 0;

  const patientPlans: Record<string, string> = {};
  for (const log of logs) {
    if (log.product !== "Replacement Retainer") {
      patientPlans[log.patient_name] = log.product;
    }
  }

  const planPopularity: Record<string, number> = {};
  Object.values(patientPlans).forEach((plan) => {
    planPopularity[plan] = (planPopularity[plan] || 0) + 1;
  });

  const oneOffLogs = paidLogs.filter(
    (log) => log.product === "Replacement Retainer",
  );
  const oneOffPurchases: OneOffPurchases = {
    totalCount: oneOffLogs.length,
    totalRevenue: oneOffLogs.reduce((sum, log) => sum + log.amount_paid, 0),
    patients: Array.from(new Set(oneOffLogs.map((log) => log.patient_name))),
  };

  return { arpp, planPopularity, oneOffPurchases };
}

function calculateRiskMetrics(logs: Array<IncomeLogProps>): RiskMetrics {
  const totalTransactions = logs.length;
  if (totalTransactions === 0) {
    return {
      defaultRate: "0.0%",
      totalDefaultAmount: GBP.format(0),
      currentMonthFailures: [],
    };
  }

  const failedLogs = logs.filter((log) => log.status === "Failed");

  // 1. Default Rate
  const rate = (failedLogs.length / totalTransactions) * 100;

  // 2. Total Default Amount (Money Left on the Table)
  const totalLoss = failedLogs.reduce((sum, log) => sum + log.amount_paid, 0);

  // 3. Current Month "Needs Attention" List
  // Get the current year and month based on system time (e.g., "2026-03")
  const now = new Date();
  const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const currentMonthFailures = failedLogs.filter((log) =>
    log.payment_date.startsWith(currentMonthPrefix),
  );

  return {
    defaultRate: `${rate.toFixed(1)}%`,
    totalDefaultAmount: GBP.format(totalLoss),
    currentMonthFailures,
  };
}

// --- MAIN COMPONENT ---

export default function Metrics() {
  const financialMetrics = calculateFinancialMetrics(incomeLogs, 180, 0.37);
  const patientMetrics = calculatePatientValueMetrics(incomeLogs);
  const riskMetrics = calculateRiskMetrics(incomeLogs);

  const chartData = Object.entries(patientMetrics.planPopularity)
    .sort((a, b) => b[1] - a[1])
    .map(([plan, count]) => ({
      plan,
      count,
    }));

  const chartConfig = {
    count: { label: "Patients" },
  } satisfies ChartConfig;

  const totalPatients = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="flex flex-col gap-8 w-full mt-8">
      {/* TOP SECTION: MY POCKET & PATIENT VALUE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MY POCKET (Now slightly wider to accommodate more metrics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          {/* GROSS REVENUE */}
          <Card className="p-4 flex flex-col gap-2 rounded-none shadow-none border border-slate-200">
            <div>
              <p className="text-sm font-normal text-slate-500">
                Total Gross Revenue
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {financialMetrics.totalGrossRevenue}
              </h3>
            </div>
          </Card>

          {/* PRODUCTION COST */}
          <Card className="p-4 flex flex-col gap-2 rounded-none shadow-none border border-slate-200">
            <div>
              <p className="text-sm font-normal text-slate-500">
                Total Production Cost
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {financialMetrics.totalProductionCosts}
              </h3>
            </div>
          </Card>

          {/* PROFIT */}
          <Card className="p-4 flex flex-col gap-2 rounded-none shadow-none border border-slate-200">
            <div>
              <p className="text-sm font-normal text-slate-500">Total Profit</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {financialMetrics.totalProfit}
              </h3>

              <p className="text-xs font-normal text-emerald-700 mt-1">
                Take Home: {financialMetrics.takeHomePay} (37%)
              </p>
              <p className="text-xs font-normal text-slate-500 mt-1">
                Break Even: {financialMetrics.breakEvenMonth || "Not Reached"}
              </p>
            </div>
          </Card>

          {/* DEFAULTS AND FAILED TRANSACTIONS */}
          <Card className="p-4 flex flex-col gap-2 rounded-none shadow-none border border-slate-200">
            <div>
              <p className="text-sm font-normal text-slate-500">
                Total Defaults
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {riskMetrics.totalDefaultAmount}
              </h3>
              <p className="text-xs font-normal text-red-700 mt-1">
                Rate: {riskMetrics.defaultRate}
              </p>
            </div>
          </Card>
        </div>

        {/* PATIENT VALUE AND PRODUCT DISTRIBUTION */}
        <Card className="p-4 flex flex-col gap-2 rounded-none shadow-none border border-slate-200">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <div className="border-b md:border-b-0 md:border-r pb-2 md:pb-0 pr-2">
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {GBP.format(patientMetrics.arpp)}
              </h3>
              <p className="text-xs font-normal text-slate-500">
                Average Revenue Per Patient
              </p>
            </div>
            <div className="pl-2">
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {GBP.format(patientMetrics.oneOffPurchases.totalRevenue)}
              </h3>
              <p className="text-xs font-normal text-slate-500">
                One-Off Purchases ({patientMetrics.oneOffPurchases.totalCount})
              </p>
            </div>
          </div>

          <div className="w-full mt-4 grow">
            <h4 className="text-sm font-semibold text-slate-700 mb-2 text-center">
              Active Plan Popularity
            </h4>
            <PieChartRender
              chartConfig={chartConfig}
              chartData={chartData}
              dataKey="count"
              nameKey="plan"
              centerLabelValue={totalPatients}
              centerLabelName="Patients"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

// --- CHART COMPONENT ---

type PieChartProps = {
  chartConfig: ChartConfig;
  chartData: any[];
  dataKey: string;
  nameKey: string;
  centerLabelValue?: string | number;
  centerLabelName?: string;
};

function PieChartRender({
  chartConfig,
  chartData,
  dataKey,
  nameKey,
  centerLabelValue,
  centerLabelName,
}: PieChartProps) {
  const totalItems = chartData.length;
  const minOpacity = 0.15;
  const maxOpacity = 1;

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square w-full max-h-55 mx-auto"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={55}
          strokeWidth={3}
        >
          {chartData.map((_, index) => {
            const opacity =
              maxOpacity -
              ((maxOpacity - minOpacity) * index) / (totalItems - 1 || 1);

            return <Cell key={index} fill="#0f172a" fillOpacity={opacity} />;
          })}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {centerLabelValue && (
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {centerLabelValue}
                      </tspan>
                    )}
                    {centerLabelName && (
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        {centerLabelName}
                      </tspan>
                    )}
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
