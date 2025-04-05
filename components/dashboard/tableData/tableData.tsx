import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { dashboardData } from "@/constants/dashboardData";



const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800";
    case "info":
      return "bg-blue-100 text-blue-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function RecentActivity() {
const content = dashboardData

  return (
    <div className="mt-5 p-5">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <Table className="border">
        <TableHeader className="bg-gray-100 dark:bg-neutral-800">
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.recentActivity.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center gap-2">
                {/* {item.icon} */}
                {item.type}
              </TableCell>
              <TableCell>{item.user}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
