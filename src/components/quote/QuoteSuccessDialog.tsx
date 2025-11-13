import { Sparkles, PhoneCall, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QuoteSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteSuccessDialog = ({ open, onOpenChange }: QuoteSuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] sm:max-w-[520px] border border-border/50 p-0 overflow-hidden bg-card text-card-foreground shadow-[0_25px_65px_-30px_rgba(15,23,42,0.55)] rounded-3xl">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/75 text-white px-8 sm:px-10 pt-10 pb-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
            <Sparkles className="h-3.5 w-3.5 opacity-80" />
            Thành công
          </div>
          <div className="mx-auto w-20 h-20 rounded-full bg-white text-primary flex items-center justify-center shadow-[0_18px_45px_-25px_rgba(37,99,235,0.7)]">
            <CheckCircle2 className="w-11 h-11" strokeWidth={1.5} />
          </div>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl sm:text-3xl font-semibold tracking-tight text-white text-center">
              Báo giá đã được xác nhận
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-white/85 leading-relaxed mx-auto max-w-[420px]">
              Cảm ơn bạn đã lựa chọn chúng tôi. Đội ngũ kinh doanh sẽ liên hệ ngay để hoàn tất các bước tiếp theo của đơn hàng.
            </DialogDescription>
          </DialogHeader>
        </div>
        {/* <div className="px-8 sm:px-9 py-6 space-y-4 bg-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary">Đơn hàng an toàn</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Quy trình được ưu tiên và theo dõi trực tiếp bởi bộ phận kinh doanh.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 flex items-start gap-3">
              <PhoneCall className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary">Liên hệ trong 24h</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nhân viên phụ trách sẽ gọi cho bạn để xác nhận thông tin và thời gian bàn giao.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border/80 bg-muted/10 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
            Một email xác nhận đã được gửi tới hộp thư của bạn. Vui lòng kiểm tra và chuẩn bị thông tin cần thiết để chúng tôi hỗ trợ nhanh nhất.
          </div>
        </div> */}
        <DialogFooter className="bg-muted/20 px-6 sm:px-8 py-5">
          <Button
            className="w-full h-11 sm:h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[0_18px_45px_-20px_rgba(37,99,235,0.6)] rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Hoàn tất
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

