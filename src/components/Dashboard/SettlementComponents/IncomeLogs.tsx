import { Badge } from "@/components/ui/badge";
import { formatDate, GBP } from "@/utils/config";
import incomeLogs from "@/utils/income-logs.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function IncomeLogs() {
  function renderStatusBadge(status: string) {
    return (
      <Badge
        variant={status === "Failed" ? "destructive" : "default"}
        className={`rounded-none text-xs`}
      >
        {status}
      </Badge>
    );
  }

  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Payment ID</TableHead>
          <TableHead>Amount Paid</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Payment Date</TableHead>
          <TableHead>Payment Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incomeLogs.map((log, idx) => {
          return (
            <TableRow>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{log.patient_name}</TableCell>
              <TableCell>{log.product}</TableCell>
              <TableCell>{log.payment_id}</TableCell>
              <TableCell>{GBP.format(log.amount_paid)}</TableCell>
              <TableCell>{renderStatusBadge(log.status)}</TableCell>
              <TableCell>{formatDate(log.payment_date)}</TableCell>
              <TableCell>{log.payment_method}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default IncomeLogs;
