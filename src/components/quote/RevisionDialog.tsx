import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send } from "lucide-react";

interface RevisionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export const RevisionDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isLoading = false 
}: RevisionDialogProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message.trim());
      setMessage("");
    }
  };

  const handleClose = () => {
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-xl border-2 shadow-2xl !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2">
        <DialogHeader className="space-y-3 px-6 pt-6">
          <DialogTitle className="flex items-center gap-2 text-warning text-lg sm:text-xl font-semibold">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            <span className="truncate">Yêu cầu điều chỉnh báo giá</span>
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Vui lòng mô tả chi tiết những thay đổi bạn mong muốn. 
            Chúng tôi sẽ xem xét và gửi lại báo giá điều chỉnh sớm nhất.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 px-6">
          <div>
            <Label htmlFor="revision-message" className="text-sm font-medium">
              Nội dung yêu cầu điều chỉnh <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="revision-message"
              placeholder="Ví dụ: Cần điều chỉnh số lượng sản phẩm A từ 10 xuống 5, thay đổi model sản phẩm B..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="mt-2 text-sm resize-none rounded-lg border-2 focus:border-warning"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 px-6 pb-6">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="w-full sm:w-auto h-11 text-sm rounded-lg border-2"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !message.trim()}
            className="bg-warning hover:bg-warning/90 text-warning-foreground w-full sm:w-auto h-11 text-sm rounded-lg font-medium"
          >
            <Send className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{isLoading ? "Đang gửi..." : "Gửi yêu cầu"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};