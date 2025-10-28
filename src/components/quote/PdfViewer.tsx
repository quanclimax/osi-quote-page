import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfViewerProps {
  quoteId: string;
  pdfUrl?: string;
}

export const PdfViewer = ({ quoteId, pdfUrl }: PdfViewerProps) => {
  const fallbackPdf = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
  const originalPdfUrl = pdfUrl || fallbackPdf;
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let revokedUrl: string | null = null;
    let cancelled = false;
    setLoadError(null);
    setBlobUrl(null);

    const load = async () => {
      try {
        // Use proxy approach: fetch as blob to avoid signature issues and auto-download
        const res = await fetch(originalPdfUrl, { 
          credentials: "omit",
          mode: 'cors',
          headers: {
            'Accept': 'application/pdf,application/octet-stream,*/*',
          }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        // Check if response is actually a PDF
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('pdf')) {
          throw new Error('Response is not a PDF file');
        }
        
        const blob = await res.blob();
        if (cancelled) return;
        
        // Create blob URL to prevent auto-download
        const url = URL.createObjectURL(blob);
        revokedUrl = url;
        setBlobUrl(url);
      } catch (e) {
        if (cancelled) return;
        console.error('PDF load error:', e);
        setLoadError((e as Error).message);
      }
    };
    
    // Always try blob approach for real PDF URLs to prevent auto-download
    if (pdfUrl && pdfUrl !== fallbackPdf) {
      load();
    } else {
      setBlobUrl(null);
    }

    return () => {
      cancelled = true;
      if (revokedUrl) URL.revokeObjectURL(revokedUrl);
    };
  }, [originalPdfUrl, pdfUrl]);

  const displayPdfUrl = useMemo(() => {
    // Always prefer blob URL to prevent auto-download issues
    // Only fallback to original URL if blob loading failed and we're using fallback PDF
    if (blobUrl) return blobUrl;
    if (pdfUrl === fallbackPdf) return originalPdfUrl;
    // For real PDF URLs, don't use original URL if blob failed to prevent auto-download
    return null;
  }, [blobUrl, originalPdfUrl, pdfUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = originalPdfUrl; // keep original (may force download)
    link.download = `Bao_gia_${quoteId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenExternal = () => {
    window.open(originalPdfUrl, '_blank');
  };

  return (
    <Card className="border-primary/20 mx-2 sm:mx-0">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-primary text-lg sm:text-xl">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">File báo giá chi tiết</span>
          </CardTitle>
          {/* <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1 sm:flex-none h-9 text-xs sm:text-sm"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate">Tải xuống</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenExternal}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1 sm:flex-none h-9 text-xs sm:text-sm"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate">Mở rộng</span>
            </Button>
          </div> */}
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border border-border rounded-lg overflow-hidden bg-muted/30">
          {displayPdfUrl ? (
            <iframe
              src={`${displayPdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full"
              title={`Báo giá ${quoteId}`}
              style={{ border: 'none' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-4">
              <div className="text-muted-foreground text-center">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Đang tải file PDF...</p>
                {loadError && (
                  <p className="text-xs text-destructive mt-2">
                    Không thể tải PDF trực tiếp
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenExternal}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Mở trong tab mới
                </Button>
              </div>
            </div>
          )}
        </div>
        {displayPdfUrl && !loadError && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center">
            Nếu PDF không hiển thị, vui lòng{' '}
            <button
              onClick={handleOpenExternal}
              className="text-primary hover:underline"
            >
              click vào đây
            </button>{' '}
            để xem trong tab mới.
          </p>
        )}
      </CardContent>
    </Card>
  );
};