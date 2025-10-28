import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/ui/header";
import { QuoteHeader } from "@/components/quote/QuoteHeader";
import { PdfViewer } from "@/components/quote/PdfViewer";
import { QuoteNotes } from "@/components/quote/QuoteNotes";
import { QuoteActions } from "@/components/quote/QuoteActions";
import { fetchQuoteById } from "@/lib/api";

type QuoteStatus = "pending" | "confirmed" | "revision_requested";

export default function Quote() {
  const { recordId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["quote", recordId],
    queryFn: async () => {
      if (!recordId) throw new Error("Thiếu recordId trên URL");
      return await fetchQuoteById(recordId);
    },
    enabled: !!recordId,
    refetchOnWindowFocus: false,
  });

  const mapped = useMemo(() => {
    if (!data) return null;
    const date = new Date(data.quote_date);
    const dateStr = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    return {
      id: data.quote_code,
      customerName: data.contact_name || data.customer_name,
      companyName: data.customer_name,
      date: dateStr,
      pdfUrl: data.quote_file?.file_url,
      saleNote: data.sale_note,
      recordId: data.record_id,
    };
  }, [data]);

  const [currentStatus, setCurrentStatus] = useState<QuoteStatus>("pending");

  const handleConfirm = (message?: string) => {
    setCurrentStatus("confirmed");
    console.log("Quote confirmed with message:", message);
  };

  const handleRequestRevision = (message: string) => {
    setCurrentStatus("revision_requested");  
    console.log("Revision requested with message:", message);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto px-0 sm:px-4 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {isLoading && (
          <div className="mx-2 sm:mx-0 text-sm text-muted-foreground">Đang tải dữ liệu báo giá...</div>
        )}
        {isError && (
          <div className="mx-2 sm:mx-0 text-sm text-destructive">{(error as Error)?.message || "Có lỗi xảy ra"}</div>
        )}
        {mapped && (
          <QuoteHeader
            quoteId={mapped.id}
            customerName={mapped.customerName}
            companyName={mapped.companyName}
            date={mapped.date}
            status={currentStatus}
          />
        )}

        {mapped && <PdfViewer quoteId={mapped.id} pdfUrl={mapped.pdfUrl} />}

        {mapped && <QuoteNotes notes={mapped.saleNote} />}

        {mapped && currentStatus === "pending" && (
          <QuoteActions
            quoteId={mapped.id}
            recordId={mapped.recordId}
            onConfirm={handleConfirm}
            onRequestRevision={handleRequestRevision}
          />
        )}

        {currentStatus === "confirmed" && (
          <div className="text-center py-6 sm:py-8 mx-2 sm:mx-0">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-success/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-success rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-success mb-2">Báo giá đã được xác nhận!</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">Cảm ơn bạn đã xác nhận. Chúng tôi sẽ liên hệ để tiến hành các bước tiếp theo.</p>
          </div>
        )}

        {currentStatus === "revision_requested" && (
          <div className="text-center py-6 sm:py-8 mx-2 sm:mx-0">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-warning/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-warning rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-warning-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-warning mb-2">Yêu cầu điều chỉnh đã được gửi!</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">Chúng tôi sẽ xem xét và gửi lại báo giá điều chỉnh trong thời gian sớm nhất.</p>
          </div>
        )}
      </main>
    </div>
  );
}