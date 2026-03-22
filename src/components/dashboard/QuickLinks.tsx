import { Link } from "react-router-dom";
import {
  BookOpen, BarChart3, Globe, Landmark, MapPin, Music, Train, Database,
} from "lucide-react";

const links = [
  { label: "History", path: "/history", icon: BookOpen, desc: "5000+ years" },
  { label: "Live Metrics", path: "/live", icon: BarChart3, desc: "Real-time data" },
  { label: "Geography", path: "/geography", icon: Globe, desc: "States & terrain" },
  { label: "Government", path: "/government", icon: Landmark, desc: "Governance" },
  { label: "Economy", path: "/economy", icon: MapPin, desc: "Trade & GDP" },
  { label: "Culture", path: "/culture", icon: Music, desc: "Heritage" },
  { label: "Infrastructure", path: "/infrastructure", icon: Train, desc: "Networks" },
  { label: "Resources", path: "/search", icon: Database, desc: "Datasets" },
];

const QuickLinks = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {links.map((link, i) => {
      const Icon = link.icon;
      return (
        <Link
          key={link.path}
          to={link.path}
          className="group bg-card rounded-xl shadow-card p-4 hover:shadow-elevated hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
          <p className="mt-3 text-sm font-semibold text-foreground">{link.label}</p>
          <p className="text-xs text-muted-foreground">{link.desc}</p>
        </Link>
      );
    })}
  </div>
);

export default QuickLinks;
