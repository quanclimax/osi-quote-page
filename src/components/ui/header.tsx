import { Building2, Mail, Phone } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-2 rounded-lg">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">O.S.I CO., LTD</h1>
              <p className="text-primary-light text-sm">
                Công ty TNHH Thiết bị Khoa học Lan Oanh
              </p>
              <p className="text-primary-light text-xs italic">
                "Your Customized Solutions"
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>sale.osi@osi.vn</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>0283 845 8289</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};