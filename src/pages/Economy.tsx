import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { SourceFooter } from "@/components/SourceLinks";
import { IndianRupee, TrendingUp, Globe, ShoppingCart, Factory, Landmark, Banknote, BarChart3, Scale, Building, Coins, Briefcase, Leaf, Smartphone, Truck, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const keyStats = [
  { label: "GDP (Nominal)", value: "$3.94T", detail: "5th largest globally", icon: IndianRupee },
  { label: "GDP (PPP)", value: "$14.6T", detail: "3rd largest globally", icon: Globe },
  { label: "GDP Growth", value: "6.5%", detail: "FY 2024-25", icon: TrendingUp },
  { label: "Per Capita", value: "$2,730", detail: "Nominal GDP", icon: Banknote },
  { label: "Exports", value: "$460B", detail: "FY 2024", icon: ShoppingCart },
  { label: "FDI Inflow", value: "$71B", detail: "FY 2023-24", icon: Factory },
  { label: "Trade Deficit", value: "$230B", detail: "Imports > Exports", icon: ArrowUpDown },
  { label: "Forex Reserves", value: "$617B", detail: "4th largest", icon: Coins },
];

const gdpHistory = [
  { year: "2000", nominal: 0.47, ppp: 2.3 },
  { year: "2005", nominal: 0.82, ppp: 3.6 },
  { year: "2010", nominal: 1.68, ppp: 5.3 },
  { year: "2015", nominal: 2.10, ppp: 7.5 },
  { year: "2018", nominal: 2.70, ppp: 9.6 },
  { year: "2020", nominal: 2.66, ppp: 9.0 },
  { year: "2022", nominal: 3.39, ppp: 11.9 },
  { year: "2024", nominal: 3.94, ppp: 14.6 },
  { year: "2027E", nominal: 5.0, ppp: 18.0 },
  { year: "2030E", nominal: 7.0, ppp: 22.0 },
];

const gdpGrowthRate = [
  { year: "2015", rate: 8.0 }, { year: "2016", rate: 8.3 },
  { year: "2017", rate: 6.8 }, { year: "2018", rate: 6.5 },
  { year: "2019", rate: 3.9 }, { year: "2020", rate: -5.8 },
  { year: "2021", rate: 9.7 }, { year: "2022", rate: 7.0 },
  { year: "2023", rate: 7.8 }, { year: "2024", rate: 6.5 },
];

const sectorGDP = [
  { name: "Services", value: 54, color: "hsl(30,100%,60%)", detail: "IT, BPO, Banking, Telecom, Tourism, Healthcare. India is world's largest IT exporter ($194B). Employs ~31% of workforce." },
  { name: "Industry", value: 26, color: "hsl(230,76%,30%)", detail: "Manufacturing, Mining, Construction, Utilities. Make in India initiative targeting 25% of GDP. Auto, Pharma, Textiles, Steel." },
  { name: "Agriculture", value: 17, color: "hsl(145,50%,34%)", detail: "Employs ~42% of workforce despite low GDP share. World's largest producer of milk, pulses, spices. Second in rice & wheat." },
  { name: "Others", value: 3, color: "hsl(220,20%,70%)", detail: "Taxes on products minus subsidies." },
];

const tradeData = [
  { year: "2018", exports: 331, imports: 514 },
  { year: "2019", exports: 330, imports: 480 },
  { year: "2020", exports: 291, imports: 394 },
  { year: "2021", exports: 396, imports: 573 },
  { year: "2022", exports: 453, imports: 714 },
  { year: "2023", exports: 432, imports: 677 },
  { year: "2024", exports: 460, imports: 690 },
];

const topExports = [
  { name: "Petroleum", value: 87, color: "hsl(30,100%,60%)" },
  { name: "IT Services", value: 194, color: "hsl(230,76%,30%)" },
  { name: "Gems & Jewelry", value: 38, color: "hsl(270,50%,50%)" },
  { name: "Pharma", value: 28, color: "hsl(145,50%,34%)" },
  { name: "Auto & Parts", value: 22, color: "hsl(200,70%,50%)" },
  { name: "Textiles", value: 35, color: "hsl(340,60%,50%)" },
  { name: "Agri Products", value: 53, color: "hsl(80,60%,40%)" },
  { name: "Chemicals", value: 29, color: "hsl(40,80%,50%)" },
];

const partners = [
  { name: "USA", total: 128, exports: 87, imports: 41 },
  { name: "China", total: 118, exports: 16, imports: 102 },
  { name: "UAE", total: 83, exports: 35, imports: 48 },
  { name: "Saudi", total: 53, exports: 11, imports: 42 },
  { name: "Singapore", total: 35, exports: 15, imports: 20 },
  { name: "Germany", total: 28, exports: 10, imports: 18 },
  { name: "Iraq", total: 34, exports: 2, imports: 32 },
  { name: "Hong Kong", total: 27, exports: 15, imports: 12 },
];

const fdiSources = [
  { name: "Singapore", value: 27 },
  { name: "Mauritius", value: 22 },
  { name: "USA", value: 10 },
  { name: "Netherlands", value: 8 },
  { name: "Japan", value: 7 },
  { name: "UK", value: 5 },
];

const stateGDP = [
  { name: "Maharashtra", gdp: 450 }, { name: "Tamil Nadu", gdp: 330 },
  { name: "Karnataka", gdp: 310 }, { name: "Uttar Pradesh", gdp: 280 },
  { name: "Gujarat", gdp: 270 }, { name: "West Bengal", gdp: 210 },
  { name: "Rajasthan", gdp: 175 }, { name: "Telangana", gdp: 165 },
  { name: "Andhra Pradesh", gdp: 155 }, { name: "Kerala", gdp: 130 },
];

const economicReforms = [
  { year: "1991", title: "LPG Reforms", detail: "Liberalization, Privatization, Globalization under PM Narasimha Rao & FM Manmohan Singh. Ended License Raj. Opened economy to foreign investment. GDP growth jumped from 1% to 7%+." },
  { year: "2014", title: "Make in India", detail: "Manufacturing initiative targeting 25% of GDP. Eased FDI limits in defence (74%), insurance (74%), railways (100%). India became top greenfield FDI destination." },
  { year: "2016", title: "Demonetization", detail: "₹500 & ₹1,000 notes invalidated overnight (86% of currency). Aimed at black money & counterfeit. Accelerated digital payments — UPI grew 100x." },
  { year: "2017", title: "GST Launch", detail: "Goods & Services Tax unified India's fragmented indirect tax system. One Nation One Tax. Subsumed 17 taxes & 13 cesses. Simplified interstate commerce." },
  { year: "2020", title: "Atmanirbhar Bharat", detail: "Self-reliant India package of ₹20 lakh crore ($265B). PLI schemes for 14 sectors. Boosted domestic manufacturing in electronics, pharma, auto, textiles." },
  { year: "2023", title: "Digital India Stack", detail: "UPI: 14B+ transactions/month ($225B/month). Aadhaar: 1.39B biometric IDs. DigiLocker, CoWIN, ONDC — world's largest public digital infrastructure." },
];

const fiscalIndicators = [
  { metric: "Revenue", value: 72 },
  { metric: "Expenditure", value: 85 },
  { metric: "Tax-GDP", value: 65 },
  { metric: "Debt-GDP", value: 58 },
  { metric: "Savings Rate", value: 70 },
  { metric: "Investment", value: 68 },
];

const Economy = () => {
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [tradeView, setTradeView] = useState<"flow" | "partners" | "exports">("flow");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Trade & Economy</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Economic Analytics</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          The world's 5th largest economy by nominal GDP and 3rd by PPP — India is the fastest-growing major economy, projected to become a $7 trillion economy by 2030.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {keyStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card rounded-xl shadow-card p-3 text-center">
              <Icon className="h-4 w-4 text-secondary mx-auto mb-1" />
              <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* GDP Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">GDP Trajectory (Trillion USD)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={gdpHistory}>
              <defs>
                <linearGradient id="nomGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(30,100%,60%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(30,100%,60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pppGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(230,76%,30%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(230,76%,30%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="ppp" stroke="hsl(230,76%,30%)" fill="url(#pppGrad)" strokeWidth={2} name="GDP PPP ($T)" />
              <Area type="monotone" dataKey="nominal" stroke="hsl(30,100%,60%)" fill="url(#nomGrad)" strokeWidth={2} name="GDP Nominal ($T)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-secondary inline-block" /> Nominal</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary inline-block" /> PPP</span>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">GDP Growth Rate (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gdpGrowthRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="rate" name="Growth %" radius={[4, 4, 0, 0]}>
                {gdpGrowthRate.map((entry, i) => (
                  <Cell key={i} fill={entry.rate >= 0 ? "hsl(145,50%,34%)" : "hsl(0,84%,60%)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-muted-foreground text-center mt-2">COVID-19 contraction in 2020 followed by V-shaped recovery</p>
        </div>
      </div>

      {/* Sector GDP */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-secondary" /> GDP by Sector
      </h2>
      <div className="bg-card rounded-xl shadow-card p-5 mb-6">
        <div className="flex items-center gap-6 flex-wrap">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie data={sectorGDP} cx="50%" cy="50%" outerRadius={80} innerRadius={45} dataKey="value"
                onClick={(_, i) => setSelectedSector(selectedSector === i ? null : i)}>
                {sectorGDP.map((s, i) => (
                  <Cell key={i} fill={s.color} stroke={selectedSector === i ? "hsl(0,0%,100%)" : "none"} strokeWidth={selectedSector === i ? 3 : 0} cursor="pointer" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 min-w-[280px]">
            {selectedSector !== null ? (
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full" style={{ background: sectorGDP[selectedSector].color }} />
                  <h3 className="font-display font-bold text-foreground text-lg">{sectorGDP[selectedSector].name} — {sectorGDP[selectedSector].value}%</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{sectorGDP[selectedSector].detail}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {sectorGDP.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded" onClick={() => setSelectedSector(i)}>
                    <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                    <span className="text-sm font-semibold text-foreground flex-1">{s.name}</span>
                    <span className="text-sm font-mono text-muted-foreground">{s.value}%</span>
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground">Click a sector to see details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trade Section */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Globe className="h-5 w-5 text-secondary" /> International Trade
      </h2>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold text-foreground">Trade Data</h3>
            <div className="flex gap-1">
              {[
                { id: "flow" as const, label: "Exp/Imp" },
                { id: "partners" as const, label: "Partners" },
                { id: "exports" as const, label: "Exports" },
              ].map((t) => (
                <button key={t.id} onClick={() => setTradeView(t.id)}
                  className={`px-2 py-1 text-[10px] rounded font-medium transition-all ${tradeView === t.id ? "gradient-saffron text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {tradeView === "flow" ? (
              <AreaChart data={tradeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="exports" stroke="hsl(145,50%,34%)" fill="hsl(145,50%,34%)" fillOpacity={0.15} strokeWidth={2} name="Exports ($B)" />
                <Area type="monotone" dataKey="imports" stroke="hsl(30,100%,60%)" fill="hsl(30,100%,60%)" fillOpacity={0.15} strokeWidth={2} name="Imports ($B)" />
              </AreaChart>
            ) : tradeView === "partners" ? (
              <BarChart data={partners}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="exports" stackId="a" fill="hsl(145,50%,34%)" name="Exports ($B)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="imports" stackId="a" fill="hsl(30,100%,60%)" name="Imports ($B)" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={topExports} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={70} />
                <Tooltip />
                <Bar dataKey="value" name="Value ($B)" radius={[0, 4, 4, 0]}>
                  {topExports.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-xl shadow-card p-6">
            <h3 className="text-lg font-display font-bold text-foreground mb-4">FDI by Source Country ($B)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={fdiSources}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(230,76%,30%)" radius={[4, 4, 0, 0]} name="FDI ($B)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card rounded-xl shadow-card p-6">
            <h3 className="text-lg font-display font-bold text-foreground mb-3">Fiscal Health</h3>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={fiscalIndicators}>
                <PolarGrid stroke="hsl(220,20%,90%)" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "hsl(220,10%,46%)" }} />
                <Radar dataKey="value" stroke="hsl(145,50%,34%)" fill="hsl(145,50%,34%)" fillOpacity={0.2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* State GDP */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Building className="h-5 w-5 text-secondary" /> State Economies
      </h2>
      <div className="bg-card rounded-xl shadow-card p-6 mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stateGDP} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={95} />
            <Tooltip />
            <Bar dataKey="gdp" fill="hsl(30,100%,60%)" radius={[0, 6, 6, 0]} name="GDP ($B)" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-muted-foreground text-center mt-2">Maharashtra alone has a GDP comparable to the Philippines. Karnataka's GDP exceeds Ethiopia's.</p>
      </div>

      {/* Economic Reforms Timeline */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Landmark className="h-5 w-5 text-secondary" /> Landmark Economic Reforms
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {economicReforms.map((r) => (
          <div key={r.year} className="bg-card rounded-xl shadow-card p-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono font-bold text-secondary">{r.year}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <h3 className="font-display font-bold text-foreground">{r.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.detail}</p>
          </div>
        ))}
      </div>

      <SourceFooter sources={["Ministry of Commerce", "World Bank", "RBI", "DPIIT", "IMF", "MOSPI"]} />
    </div>
  );
};

export default Economy;
