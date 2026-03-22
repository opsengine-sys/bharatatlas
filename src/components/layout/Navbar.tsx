import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "History", path: "/history" },
  { label: "Live India", path: "/live" },
  { label: "Population", path: "/population" },
  { label: "Trade & Economy", path: "/economy" },
  { label: "Flights", path: "/flights" },
  { label: "Government", path: "/government" },
  { label: "Geography", path: "/geography" },
  { label: "Culture", path: "/culture" },
  { label: "Infrastructure", path: "/infrastructure" },
  { label: "Resources", path: "/resources" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="BharatAtlas logo" className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
          <div className="flex flex-col leading-none">
            <span className="text-xl font-display text-foreground transition-all duration-300 group-hover:tracking-wider">
              Bharat<span className="italic text-secondary relative">Atlas
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 gradient-saffron transition-all duration-300 group-hover:w-full rounded-full" />
              </span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground hidden sm:block">India's Digital Knowledge Atlas</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.03] ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/search"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
