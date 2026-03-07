import { Mail, Phone } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="">
              <img src="/logo2025.webp" alt="O.S.I Logo" className="h-12 w-auto filter brightness-0 invert" />
            </div>
            <div className="flex flex-col pl-2 border-l-2 border-white mt-4">
              <p className="text-white text-sm font-bold">
                Công ty TNHH Thiết bị Khoa học Lan Oanh
              </p>
              <p className="text-primary-light text-xs italic">
                "Your Customized Scientific Solutions"
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>sales.admin@osi.vn</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>028 3845 8289</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};