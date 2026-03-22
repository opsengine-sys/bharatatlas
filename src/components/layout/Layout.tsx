import { ReactNode } from "react";
import Navbar from "./Navbar";
import { SourceLink } from "@/components/SourceLinks";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="animate-fade-in">{children}</main>
      <footer className="border-t border-border bg-card py-10 mt-16 animate-fade-in">
        <div className="container mx-auto px-4 text-center space-y-3">
          <p className="text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "100ms" }}>
            🇮🇳 BharatAtlas — India's Digital Knowledge Atlas 🇮🇳
          </p>
          <p className="text-xs text-muted-foreground animate-slide-up" style={{ animationDelay: "200ms" }}>
            Data sourced from <SourceLink name="Government of India" />, <SourceLink name="Wikipedia" />, <SourceLink name="Census of India" /> & open datasets
          </p>
          <div className="pt-2 border-t border-border mt-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <p className="text-xs text-muted-foreground">
              Made with ❤️ in India 🇮🇳 by <span className="font-semibold text-foreground">Nagababu Basa</span>
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              © {new Date().getFullYear()} BharatAtlas™ — All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
