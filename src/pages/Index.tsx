import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ArrowRight, Building2, Mail, Phone, Globe, Award } from "lucide-react";

const Index = () => {
  const [quoteId, setQuoteId] = useState("");
  const navigate = useNavigate();

  const handleQuoteAccess = () => {
    const id = quoteId.trim();
    if (!id) return;
    navigate(`/quote/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-primary-light/30">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Hệ thống báo giá
            <span className="block text-primary-dark">O.S.I Online</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Truy cập và quản lý báo giá thiết bị khoa học một cách nhanh chóng và hiệu quả
          </p>
          
          {/* Quote Access Form */}
          <Card className="max-w-md mx-auto border-primary/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <FileText className="h-5 w-5" />
                Truy cập báo giá
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="quote-id">Mã báo giá (Record ID)</Label>
                <Input
                  id="quote-id"
                  placeholder="Nhập mã báo giá của bạn..."
                  value={quoteId}
                  onChange={(e) => setQuoteId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleQuoteAccess()}
                />
              </div>
              <Button 
                onClick={handleQuoteAccess}
                disabled={!quoteId.trim()}
                className="w-full"
              >
                Truy cập báo giá
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Hoặc thử với mã mẫu: 
                <Link 
                  to="/quote/MT20250926-175521"
                  className="text-primary hover:underline ml-1"
                >
                  MT20250926-175521
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Báo giá chi tiết</h3>
              <p className="text-muted-foreground">
                Xem thông tin báo giá đầy đủ với giá cả và thông số kỹ thuật
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Xác nhận nhanh</h3>
              <p className="text-muted-foreground">
                Xác nhận hoặc yêu cầu điều chỉnh báo giá chỉ với vài click
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Hỗ trợ tận tâm</h3>
              <p className="text-muted-foreground">
                Đội ngũ chuyên gia sẵn sàng hỗ trợ và tư vấn 24/7
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Info */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Về O.S.I</h3>
                <p className="text-muted-foreground mb-4">
                  Công ty TNHH Thiết bị Khoa học Lan Oanh (O.S.I CO., LTD) là đơn vị hàng đầu 
                  trong lĩnh vực cung cấp thiết bị khoa học, phòng thí nghiệm, và giải pháp 
                  công nghệ cho các doanh nghiệp F&B, công nghiệp thực phẩm.
                </p>
                <p className="text-primary font-medium italic">
                  "Your Customized Solutions"
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>sale.osi@osi.vn</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>0283 845 8289 | 0283 990 0325</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>www.osi.vn</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
