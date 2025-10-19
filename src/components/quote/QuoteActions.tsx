import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, MessageSquare, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { acceptQuote, requestAdjust } from "@/lib/api";
import { RevisionDialog } from "./RevisionDialog";

interface QuoteActionsProps {
  quoteId: string; // Display code like QT-2025-001
  recordId: string; // Record id used for webhook APIs
  onConfirm: (message?: string) => void;
  onRequestRevision: (message: string) => void;
}

export const QuoteActions = ({ quoteId, recordId, onConfirm, onRequestRevision }: QuoteActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRevisionDialog, setShowRevisionDialog] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await acceptQuote(recordId);
      onConfirm();
      
      toast({
        title: "Xác nhận thành công",
        description: "Báo giá đã được xác nhận. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
      });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể xác nhận báo giá. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestRevision = async (message: string) => {
    setIsLoading(true);
    try {
      await requestAdjust(recordId, message);
      onRequestRevision(message);
      
      toast({
        title: "Yêu cầu đã được gửi",
        description: "Chúng tôi sẽ xem xét và điều chỉnh báo giá theo yêu cầu của bạn.",
      });
      
      setShowRevisionDialog(false);
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra", 
        description: "Không thể gửi yêu cầu điều chỉnh. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual PDF URL
    link.download = `Bao_gia_${quoteId}.pdf`;
    link.click();
    
    toast({
      title: "Đang tải xuống",
      description: "File báo giá đang được tải xuống...",
    });
  };

  return (
    <>
      <Card className="border-primary/20 mx-2 sm:mx-0">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-primary text-center text-lg sm:text-xl">
            Xác nhận báo giá
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Request Revision Button - Left */}
            <Button
              variant="outline"
              onClick={() => setShowRevisionDialog(true)}
              disabled={isLoading}
              className="border-warning text-warning hover:bg-warning hover:text-warning-foreground h-11 sm:h-10 text-sm sm:text-base order-2 sm:order-1"
            >
              <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Yêu cầu điều chỉnh</span>
            </Button>

            {/* Confirm Button - Right */}
            <Button 
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-success hover:bg-success/90 text-success-foreground h-11 sm:h-10 text-sm sm:text-base order-1 sm:order-2"
            >
              <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{isLoading ? "Đang xử lý..." : "Xác nhận báo giá"}</span>
            </Button>
          </div>

          {/* Download Section */}
          <div className="pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-primary text-sm sm:text-base">File báo giá chi tiết</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Tải xuống file báo giá đầy đủ với thông tin kỹ thuật và giá cả
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleDownload}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground h-10 sm:h-9 text-sm flex-shrink-0 w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Tải xuống PDF</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <RevisionDialog
        open={showRevisionDialog}
        onOpenChange={setShowRevisionDialog}
        onSubmit={handleRequestRevision}
        isLoading={isLoading}
      />
    </>
  );
};