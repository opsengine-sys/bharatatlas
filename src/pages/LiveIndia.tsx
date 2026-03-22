import { Users, Wifi, Zap, IndianRupee, Thermometer, Globe, TrendingUp, Building, Factory, Landmark, Train, Smartphone, GraduationCap, Heart, Banknote, ShoppingCart, Plane, Fuel, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import { SourceFooter } from "@/components/SourceLinks";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { useState } from "react";

const gdpData = [
  { year: "2015", value: 2.1 }, { year: "2016", value: 2.29 },
  { year: "2017", value: 2.65 }, { year: "2018", value: 2.7 },
  { year: "2019", value: 2.87 }, { year: "2020", value: 2.66 },
  { year: "2021", value: 3.18 }, { year: "2022", value: 3.39 },
  { year: "2023", value: 3.57 }, { year: "2024", value: 3.94 },
];

const gdpGrowthRate = [
  { year: "2015", rate: 8.0 }, { year: "2016", rate: 8.3 },
  { year: "2017", rate: 6.8 }, { year: "2018", rate: 6.5 },
  { year: "2019", rate: 3.9 }, { year: "2020", rate: -5.8 },
  { year: "2021", rate: 9.7 }, { year: "2022", rate: 7.0 },
  { year: "2023", rate: 7.8 }, { year: "2024", rate: 6.5 },
];

const sectorData = [
  { name: "Services", value: 54, color: "hsl(30,100%,60%)" },
  { name: "Industry", value: 26, color: "hsl(230,76%,30%)" },
  { name: "Agriculture", value: 17, color: "hsl(145,50%,34%)" },
  { name: "Others", value: 3, color: "hsl(220,20%,70%)" },
];

const tradeData = [
  { year: "2019", exports: 330, imports: 480 },
  { year: "2020", exports: 291, imports: 394 },
  { year: "2021", exports: 396, imports: 573 },
  { year: "2022", exports: 453, imports: 714 },
  { year: "2023", exports: 432, imports: 677 },
  { year: "2024", exports: 437, imports: 675 },
];

const fdiSectors = [
  { sector: "IT & Services", value: 85 },
  { sector: "Telecom", value: 42 },
  { sector: "Auto", value: 35 },
  { sector: "Pharma", value: 28 },
  { sector: "Chemicals", value: 22 },
  { sector: "Construction", value: 18 },
];

const stateGDP = [
  { name: "MH", gdp: 450 }, { name: "TN", gdp: 330 },
  { name: "KA", gdp: 310 }, { name: "UP", gdp: 280 },
  { name: "GJ", gdp: 270 }, { name: "WB", gdp: 210 },
  { name: "RJ", gdp: 175 }, { name: "AP", gdp: 165 },
];

const developmentIndex = [
  { metric: "Education", value: 74 },
  { metric: "Healthcare", value: 62 },
  { metric: "Digital", value: 85 },
  { metric: "Infrastructure", value: 68 },
  { metric: "Employment", value: 55 },
  { metric: "Innovation", value: 72 },
];

const metrics = [
  { title: "Population", value: "1.44B", subtitle: "World's most populous", icon: <Users className="h-5 w-5" />, variant: "saffron" as const, animateValue: true },
  { title: "GDP (Nominal)", value: "$3.94T", subtitle: "5th largest economy", icon: <IndianRupee className="h-5 w-5" />, variant: "primary" as const },
  { title: "GDP Growth", value: "6.5%", subtitle: "FY 2024-25 est.", icon: <TrendingUp className="h-5 w-5" />, variant: "emerald" as const },
  { title: "Per Capita", value: "$2,730", subtitle: "Nominal GDP per capita", icon: <Banknote className="h-5 w-5" /> },
  { title: "Internet Users", value: "900M+", subtitle: "2nd largest online population", icon: <Wifi className="h-5 w-5" />, variant: "saffron" as const },
  { title: "Forex Reserves", value: "$617B", subtitle: "4th largest globally", icon: <Globe className="h-5 w-5" />, variant: "primary" as const },
  { title: "FDI Inflow", value: "$71B", subtitle: "FY 2023-24", icon: <ShoppingCart className="h-5 w-5" />, variant: "emerald" as const },
  { title: "Electricity", value: "1,900 TWh", subtitle: "3rd largest producer", icon: <Zap className="h-5 w-5" /> },
  { title: "Smartphone Users", value: "750M+", subtitle: "Fastest growing market", icon: <Smartphone className="h-5 w-5" />, variant: "saffron" as const },
  { title: "Startups", value: "1,12,000+", subtitle: "3rd largest ecosystem", icon: <Factory className="h-5 w-5" />, variant: "primary" as const },
  { title: "UPI Transactions", value: "14B/mo", subtitle: "World's largest digital payment", icon: <Landmark className="h-5 w-5" />, variant: "emerald" as const },
  { title: "Railways", value: "68,000 km", subtitle: "4th largest network", icon: <Train className="h-5 w-5" /> },
];

const keyIndicators = [
  { label: "Inflation (CPI)", value: "4.9%", trend: "↓" },
  { label: "Repo Rate", value: "6.5%", trend: "→" },
  { label: "Fiscal Deficit", value: "5.1% GDP", trend: "↓" },
  { label: "Unemployment", value: "3.2%", trend: "↓" },
  { label: "Literacy Rate", value: "77.7%", trend: "↑" },
  { label: "HDI Rank", value: "134/193", trend: "↑" },
  { label: "Ease of Business", value: "63rd", trend: "↑" },
  { label: "Patent Filings", value: "83,000+", trend: "↑" },
];

const LiveIndia = () => {
  const [chartView, setChartView] = useState<"gdp" | "growth" | "trade">("gdp");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Live Dashboard</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Live India Metrics</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Comprehensive national indicators, economic data, and development metrics — India's pulse in numbers.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {metrics.map((m, i) => (
          <MetricCard key={m.title} {...m} delay={i * 80} />
        ))}
      </div>

      {/* Key Indicators Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {keyIndicators.map((ki) => (
          <div key={ki.label} className="bg-card rounded-xl shadow-card p-3 text-center">
            <p className="text-lg font-display font-bold text-foreground">{ki.value}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{ki.label}</p>
            <span className={`text-xs font-mono ${ki.trend === "↑" ? "text-accent" : ki.trend === "↓" ? "text-secondary" : "text-muted-foreground"}`}>{ki.trend}</span>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold text-foreground">Economic Trends</h3>
            <div className="flex gap-1">
              {[
                { id: "gdp" as const, label: "GDP" },
                { id: "growth" as const, label: "Growth %" },
                { id: "trade" as const, label: "Trade" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setChartView(t.id)}
                  className={`px-2 py-1 text-[10px] rounded font-medium transition-all ${
                    chartView === t.id ? "gradient-saffron text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            {chartView === "gdp" ? (
              <AreaChart data={gdpData}>
                <defs>
                  <linearGradient id="gdpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(30, 100%, 60%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(30, 100%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 90%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="hsl(30, 100%, 60%)" fill="url(#gdpGradient)" strokeWidth={2} name="GDP (T USD)" />
              </AreaChart>
            ) : chartView === "growth" ? (
              <BarChart data={gdpGrowthRate}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 90%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="rate" name="Growth %" radius={[4, 4, 0, 0]}>
                  {gdpGrowthRate.map((entry, i) => (
                    <Cell key={i} fill={entry.rate >= 0 ? "hsl(145,50%,34%)" : "hsl(0,84%,60%)"} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart data={tradeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 90%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="exports" fill="hsl(145,50%,34%)" name="Exports ($B)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="imports" fill="hsl(30,100%,60%)" name="Imports ($B)" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">GDP by Sector</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <ResponsiveContainer width="100%" height={200} className="sm:!w-1/2 shrink-0">
              <PieChart>
                <Pie data={sectorData} cx="50%" cy="50%" outerRadius={75} innerRadius={40} dataKey="value" label={({ value }) => `${value}%`}>
                  {sectorData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex sm:flex-col gap-3 flex-wrap justify-center">
              {sectorData.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: s.color }} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.value}% of GDP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Top States by GDP ($B)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stateGDP} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={30} />
              <Tooltip />
              <Bar dataKey="gdp" fill="hsl(230,76%,30%)" radius={[0, 4, 4, 0]} name="GDP ($B)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">FDI by Sector ($B)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fdiSectors}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis dataKey="sector" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(30,100%,60%)" radius={[4, 4, 0, 0]} name="FDI ($B)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Development Index</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={developmentIndex}>
              <PolarGrid stroke="hsl(220,20%,90%)" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "hsl(220,10%,46%)" }} />
              <PolarRadiusAxis tick={{ fontSize: 9 }} />
              <Radar dataKey="value" stroke="hsl(145,50%,34%)" fill="hsl(145,50%,34%)" fillOpacity={0.2} name="Score" />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <SourceFooter sources={["World Bank", "RBI", "MOSPI", "DPIIT", "Government of India Open Data Portal"]} />
    </div>
  );
};

export default LiveIndia;
