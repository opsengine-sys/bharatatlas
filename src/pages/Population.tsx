import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from "recharts";
import { SourceFooter } from "@/components/SourceLinks";
import { Users, TrendingUp, MapPin, GraduationCap, Heart, Home, Baby, Globe, Scale } from "lucide-react";
import { useState } from "react";

const keyStats = [
  { label: "Total Population", value: "1.44B", detail: "World's most populous (2024)", icon: Users },
  { label: "Density", value: "481/km²", detail: "Among highest globally", icon: MapPin },
  { label: "Growth Rate", value: "0.9%", detail: "Declining steadily", icon: TrendingUp },
  { label: "Median Age", value: "28.4", detail: "Young nation", icon: Baby },
  { label: "Literacy", value: "77.7%", detail: "Male 84.7%, Female 70.3%", icon: GraduationCap },
  { label: "Life Expectancy", value: "70.8 yrs", detail: "Male 69.4, Female 72.4", icon: Heart },
  { label: "Sex Ratio", value: "1,020 F/1,000 M", detail: "First time F > M (2024)", icon: Scale },
  { label: "Urbanization", value: "35.9%", detail: "~520 million urban", icon: Home },
];

const stateData = [
  { name: "UP", pop: 231, lit: 73, density: 828 },
  { name: "MH", pop: 124, lit: 84, density: 365 },
  { name: "BR", pop: 128, lit: 70, density: 1102 },
  { name: "WB", pop: 100, lit: 80, density: 1029 },
  { name: "MP", pop: 85, lit: 73, density: 236 },
  { name: "TN", pop: 77, lit: 82, density: 555 },
  { name: "RJ", pop: 79, lit: 70, density: 200 },
  { name: "KA", pop: 67, lit: 78, density: 319 },
  { name: "GJ", pop: 64, lit: 83, density: 308 },
  { name: "AP", pop: 53, lit: 67, density: 304 },
  { name: "KL", pop: 35, lit: 96, density: 859 },
  { name: "TG", pop: 39, lit: 72, density: 312 },
];

const populationGrowth = [
  { year: "1951", pop: 361, growth: 1.25 },
  { year: "1961", pop: 439, growth: 1.96 },
  { year: "1971", pop: 548, growth: 2.20 },
  { year: "1981", pop: 683, growth: 2.22 },
  { year: "1991", pop: 846, growth: 2.16 },
  { year: "2001", pop: 1028, growth: 1.97 },
  { year: "2011", pop: 1210, growth: 1.64 },
  { year: "2024", pop: 1440, growth: 0.90 },
  { year: "2030E", pop: 1515, growth: 0.70 },
  { year: "2050E", pop: 1670, growth: 0.30 },
];

const urbanRural = [
  { name: "Urban", value: 35.9, color: "hsl(30,100%,60%)" },
  { name: "Rural", value: 64.1, color: "hsl(145,50%,34%)" },
];

const ageGroups = [
  { group: "0–14", pct: 26, label: "Children" },
  { group: "15–24", pct: 18, label: "Youth" },
  { group: "25–54", pct: 41, label: "Working age" },
  { group: "55–64", pct: 8, label: "Pre-retirement" },
  { group: "65+", pct: 7, label: "Elderly" },
];

const religions = [
  { name: "Hinduism", pct: 79.8, color: "hsl(30,100%,60%)" },
  { name: "Islam", pct: 14.2, color: "hsl(145,50%,34%)" },
  { name: "Christianity", pct: 2.3, color: "hsl(230,76%,30%)" },
  { name: "Sikhism", pct: 1.7, color: "hsl(200,70%,50%)" },
  { name: "Buddhism", pct: 0.7, color: "hsl(270,50%,50%)" },
  { name: "Jainism", pct: 0.4, color: "hsl(340,60%,50%)" },
  { name: "Others", pct: 0.9, color: "hsl(220,20%,70%)" },
];

const literacyTrend = [
  { year: "1951", total: 18.3, male: 27.2, female: 8.9 },
  { year: "1961", total: 28.3, male: 40.4, female: 15.4 },
  { year: "1971", total: 34.5, male: 46.0, female: 22.0 },
  { year: "1981", total: 43.6, male: 56.4, female: 29.8 },
  { year: "1991", total: 52.2, male: 64.1, female: 39.3 },
  { year: "2001", total: 64.8, male: 75.3, female: 53.7 },
  { year: "2011", total: 73.0, male: 80.9, female: 64.6 },
  { year: "2024E", total: 77.7, male: 84.7, female: 70.3 },
];

const megaCities = [
  { city: "Mumbai", pop: 21.7, state: "Maharashtra", detail: "Financial capital. Bollywood. Dharavi — Asia's most productive slum." },
  { city: "Delhi NCR", pop: 32.9, state: "Delhi", detail: "National capital. 2nd largest metro area globally. 7 UNESCO sites." },
  { city: "Bengaluru", pop: 13.2, state: "Karnataka", detail: "Silicon Valley of India. 800+ IT companies. Pleasant climate." },
  { city: "Hyderabad", pop: 10.5, state: "Telangana", detail: "Cyberabad IT hub. Charminar. Biryani capital." },
  { city: "Ahmedabad", pop: 8.6, state: "Gujarat", detail: "India's first UNESCO World Heritage City. Textile hub." },
  { city: "Chennai", pop: 11.5, state: "Tamil Nadu", detail: "Detroit of India (auto). Marina Beach — 2nd longest urban beach." },
  { city: "Kolkata", pop: 15.3, state: "West Bengal", detail: "Cultural capital. Howrah Bridge. Durga Puja UNESCO heritage." },
  { city: "Pune", pop: 7.8, state: "Maharashtra", detail: "Oxford of the East. IT corridor. Pleasant weather." },
];

const demographicHighlights = [
  { title: "Demographic Dividend", detail: "65% population under 35 years. India will be the world's largest workforce by 2027. This 'youth bulge' could add 2% to GDP growth annually if harnessed through education and employment." },
  { title: "Declining Fertility Rate", detail: "TFR dropped from 5.9 (1950) to 2.0 (2024) — below replacement level. Southern states already below 1.6. Northern states catching up rapidly." },
  { title: "Gender Ratio Improving", detail: "For the first time in recorded history, India has more females than males (1,020 F per 1,000 M in 2024). Beti Bachao Beti Padhao campaign impact visible." },
  { title: "Urbanization Wave", detail: "Urban population to reach 50% by 2050. 8,000+ new towns since 2001. Smart Cities Mission targeting 100 cities. Rural-urban migration: 10M+ annually." },
];

const Population = () => {
  const [stateMetric, setStateMetric] = useState<"pop" | "lit" | "density">("pop");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Demographics</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Population Analytics</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          India surpassed China in April 2023 to become the world's most populous nation — a young, diverse, and rapidly urbanizing nation of 1.44 billion.
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

      {/* Demographic Highlights */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {demographicHighlights.map((h) => (
          <div key={h.title} className="bg-card rounded-xl shadow-card p-4 hover:shadow-elevated transition-shadow">
            <h3 className="font-display font-bold text-foreground text-sm">{h.title}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{h.detail}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Population Growth (Millions)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={populationGrowth}>
              <defs>
                <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(30,100%,60%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(30,100%,60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="pop" stroke="hsl(30,100%,60%)" fill="url(#popGrad)" strokeWidth={2} name="Population (M)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Literacy Rate Trend (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={literacyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="hsl(230,76%,30%)" strokeWidth={2} name="Total" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="male" stroke="hsl(200,70%,50%)" strokeWidth={1.5} strokeDasharray="4 2" name="Male" dot={{ r: 2 }} />
              <Line type="monotone" dataKey="female" stroke="hsl(30,100%,60%)" strokeWidth={1.5} strokeDasharray="4 2" name="Female" dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold text-foreground">States Comparison</h3>
            <div className="flex gap-1">
              {[
                { id: "pop" as const, label: "Pop (M)" },
                { id: "lit" as const, label: "Literacy %" },
                { id: "density" as const, label: "Density" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setStateMetric(t.id)}
                  className={`px-2 py-1 text-[9px] rounded font-medium transition-all ${
                    stateMetric === t.id ? "gradient-saffron text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={stateData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={28} />
              <Tooltip />
              <Bar
                dataKey={stateMetric}
                fill={stateMetric === "pop" ? "hsl(30,100%,60%)" : stateMetric === "lit" ? "hsl(145,50%,34%)" : "hsl(230,76%,30%)"}
                radius={[0, 4, 4, 0]}
                name={stateMetric === "pop" ? "Population (M)" : stateMetric === "lit" ? "Literacy %" : "Density /km²"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Religion Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={religions} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="pct" label={({ name, pct, cx, cy, midAngle, outerRadius: or }) => {
                const RADIAN = Math.PI / 180;
                const radius = (or as number) + 22;
                const x = (cx as number) + radius * Math.cos(-midAngle * RADIAN);
                const y = (cy as number) + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} textAnchor={x > (cx as number) ? "start" : "end"} dominantBaseline="central" fontSize={10} fill="hsl(220,20%,50%)">
                    {`${name} ${pct}%`}
                  </text>
                );
              }} labelLine={true}>
                {religions.map((r, i) => <Cell key={i} fill={r.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {religions.map((r) => (
              <div key={r.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                {r.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Age Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis dataKey="group" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="pct" fill="hsl(145,50%,34%)" radius={[4, 4, 0, 0]} name="Percentage" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {ageGroups.map((a) => (
              <span key={a.group} className="text-[10px] text-muted-foreground">{a.group}: {a.label}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 justify-center">
            {urbanRural.map((u) => (
              <div key={u.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: u.color }} />
                <span className="text-xs text-foreground font-semibold">{u.name} {u.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mega Cities */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Globe className="h-5 w-5 text-secondary" /> Mega Cities
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {megaCities.map((c) => (
          <div key={c.city} className="bg-card rounded-xl shadow-card p-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-start justify-between">
              <h3 className="font-display font-bold text-foreground">{c.city}</h3>
              <span className="text-xs font-mono text-secondary">{c.pop}M</span>
            </div>
            <p className="text-xs text-muted-foreground">{c.state}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.detail}</p>
          </div>
        ))}
      </div>

      <SourceFooter sources={["Census of India", "World Bank", "UN Population Division", "NFHS-5", "Registrar General of India"]} />
    </div>
  );
};

export default Population;
