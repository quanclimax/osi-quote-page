import { FileText, Calendar, User, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuoteHeaderProps {
  quoteId: string;
  customerName: string;
  companyName: string;
  date: string;
  status: "pending" | "confirmed" | "revision_requested";
}

export const QuoteHeader = ({ 
  quoteId, 
  customerName, 
  companyName, 
  date, 
  status 
}: QuoteHeaderProps) => {
  const statusConfig = {
    pending: { label: "Chờ xác nhận", variant: "secondary" as const },
    confirmed: { label: "Đã xác nhận", variant: "success" as const },
    revision_requested: { label: "Yêu cầu điều chỉnh", variant: "warning" as const }
  };

  return (
    <Card className="border-primary/20 mx-2 sm:mx-0">
      <CardHeader className="bg-primary/5 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-primary text-lg sm:text-xl">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">Báo giá #{quoteId}</span>
          </CardTitle>
          <Badge variant={statusConfig[status].variant} className="self-start sm:self-center">
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:pt-6 sm:px-6 sm:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground">Khách hàng</p>
              <p className="font-medium text-sm sm:text-base truncate">{customerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Building className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground">Công ty</p>
              <p className="font-medium text-sm sm:text-base truncate">{companyName}</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground">Ngày tạo</p>
              <p className="font-medium text-sm sm:text-base">{date}</p>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};