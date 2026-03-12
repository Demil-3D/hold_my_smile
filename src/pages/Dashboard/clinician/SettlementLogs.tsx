import IncomeLogs from "@/components/Dashboard/SettlementComponents/IncomeLogs";
import Metrics from "@/components/Dashboard/SettlementComponents/Metrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SettlementLogsPage() {
  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <Tabs defaultValue="metrics">
          <TabsList variant="line">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics">
            <Metrics />
          </TabsContent>
          <TabsContent value="logs">
            <IncomeLogs />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default SettlementLogsPage;
