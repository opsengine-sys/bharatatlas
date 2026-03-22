import { Users, IndianRupee, MapPin, Building2, Landmark, TrendingUp, Database, Globe, BookOpen, BarChart3, Shield, Layers } from "lucide-react";
import { SourceChip } from "@/components/SourceLinks";
import MetricCard from "@/components/dashboard/MetricCard";
import TimelinePreview from "@/components/dashboard/TimelinePreview";
import QuickLinks from "@/components/dashboard/QuickLinks";
import heroImage from "@/assets/hero-india.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="India panoramic view" className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-85" />
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="BharatAtlas logo" className="h-14 w-14 object-contain animate-scale-in" style={{ animationDelay: "100ms" }} />
              <p className="text-xs font-mono uppercase text-secondary animate-letter-spacing" style={{ animationDelay: "200ms" }}>
                India's Digital Knowledge Atlas
              </p>
            </div>
            <div className="space-y-1">
              <div className="overflow-hidden">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-display text-primary-foreground leading-[1.1] animate-title-reveal" style={{ animationDelay: "300ms" }}>
                  Explore India's
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-display italic text-gradient-saffron leading-[1.1] animate-title-reveal" style={{ animationDelay: "500ms" }}>
                  History, Data
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-display text-primary-foreground leading-[1.1] animate-title-reveal" style={{ animationDelay: "700ms" }}>
                  & Systems
                </h1>
              </div>
            </div>
            <div className="mt-5 mb-4 h-0.5 w-32 gradient-saffron animate-title-line" style={{ animationDelay: "900ms" }} />
            <p className="text-base lg:text-lg text-primary-foreground/60 max-w-lg font-heading animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
              Mapping India's past, present & future — from 5000 years of civilisation to real-time national metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <MetricCard title="Population" value="1.44B" subtitle="2024 estimate" icon={<Users className="h-5 w-5" />} variant="saffron" animateValue delay={0} />
          <MetricCard title="GDP" value="$3.94T" subtitle="Nominal 2024" icon={<IndianRupee className="h-5 w-5" />} variant="primary" animateValue delay={100} />
          <MetricCard title="States & UTs" value="36" subtitle="28 States, 8 UTs" icon={<MapPin className="h-5 w-5" />} delay={200} />
          <MetricCard title="Capital" value="New Delhi" subtitle="Est. 1911" icon={<Building2 className="h-5 w-5" />} delay={300} />
          <MetricCard title="Prime Minister" value="N. Modi" subtitle="Since 2014" icon={<Landmark className="h-5 w-5" />} delay={400} />
          <MetricCard title="Growth Rate" value="7.8%" subtitle="GDP FY24" icon={<TrendingUp className="h-5 w-5" />} variant="emerald" animateValue delay={500} />
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-3xl font-display text-foreground mb-4">
          Explore <span className="italic text-secondary">Sections</span>
        </h2>
        <QuickLinks />
      </section>

      {/* Timeline + About */}
      <section className="container mx-auto px-4 mt-8 grid lg:grid-cols-2 gap-4">
        <TimelinePreview />

        {/* About Section — detailed */}
        <div className="bg-card rounded-xl shadow-card p-6 flex flex-col">
          <h3 className="text-2xl font-display text-foreground mb-1">
            About <span className="italic">BharatAtlas</span>
          </h3>
          <div className="h-0.5 w-16 gradient-saffron rounded-full mb-4" />

          <p className="text-sm text-muted-foreground leading-relaxed font-heading">
            BharatAtlas is a comprehensive digital knowledge platform designed to make India's vast history,
            demographics, governance, economy, geography, and culture accessible through a single modern interface.
            It combines structured knowledge with interactive data visualizations to create an experience akin to 
            a digital operating system for India's information.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { icon: BookOpen, label: "5000+ Years", desc: "Historical coverage" },
              { icon: BarChart3, label: "Live Metrics", desc: "Real-time dashboards" },
              { icon: Globe, label: "36 States & UTs", desc: "Geographic explorer" },
              { icon: Layers, label: "11 Modules", desc: "Comprehensive sections" },
              { icon: Database, label: "Open Data", desc: "Public source datasets" },
              { icon: Shield, label: "Verified Sources", desc: "Gov.in, Census, Wiki" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                  <Icon className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{f.label}</p>
                    <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Data sources */}
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Data Sources</p>
            <div className="flex flex-wrap gap-1.5">
              {["Government of India", "Census of India", "Wikipedia", "World Bank", "RBI", "NHAI", "TRAI", "AAI"].map((s) => (
                <SourceChip key={s} name={s} />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 flex gap-2">
            <div className="h-1.5 flex-1 rounded-full gradient-saffron" />
            <div className="h-1.5 flex-1 rounded-full gradient-hero" />
            <div className="h-1.5 flex-1 rounded-full gradient-emerald" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
