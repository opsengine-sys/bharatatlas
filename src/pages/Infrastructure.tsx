import { Train, Route, Anchor, Plane, Zap, Radio, Building, Droplets, Wifi, Rocket, Shield, Globe, MapPin, TrendingUp, Gauge, Fuel } from "lucide-react";
import { SourceFooter } from "@/components/SourceLinks";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const keyStats = [
  { label: "Road Network", value: "6.37M km", detail: "2nd largest globally", icon: Route },
  { label: "Rail Network", value: "68,103 km", detail: "4th largest", icon: Train },
  { label: "Airports", value: "148", detail: "34 international", icon: Plane },
  { label: "Major Ports", value: "12", detail: "+200 minor ports", icon: Anchor },
  { label: "Power Capacity", value: "425 GW", detail: "3rd largest", icon: Zap },
  { label: "Renewable", value: "180+ GW", detail: "42% of capacity", icon: Fuel },
  { label: "Telecom Users", value: "1.15B", detail: "2nd largest market", icon: Radio },
  { label: "Fiber Optic", value: "3.8M km", detail: "BharatNet backbone", icon: Wifi },
];

const infraSectors = [
  {
    title: "Railways", icon: Train, color: "gradient-hero",
    overview: "Indian Railways is the world's 4th largest rail network and largest employer in India. It carried 8.7 billion passengers in FY24 — equivalent to the entire world's population riding Indian trains.",
    stats: [
      { label: "Network Length", value: "68,103 km" },
      { label: "Stations", value: "7,325" },
      { label: "Daily Passengers", value: "23 million" },
      { label: "Annual Freight", value: "1.4 billion tonnes" },
      { label: "Locomotives", value: "13,000+" },
      { label: "Revenue", value: "₹2.56 lakh crore" },
    ],
    projects: [
      { name: "Vande Bharat Express", detail: "Semi-high-speed trains (180 km/h). 102 rakes operational. Made in India at ICF Chennai. AC chair car & executive class." },
      { name: "Dedicated Freight Corridors", detail: "Eastern (1,337 km) & Western (1,506 km) corridors. 2x speed for freight. ₹81,459 crore investment. Reduce logistics cost." },
      { name: "Mumbai-Ahmedabad Bullet Train", detail: "India's first high-speed rail (320 km/h). 508 km in 2 hours. Japanese Shinkansen technology. ₹1.1 lakh crore project." },
      { name: "Station Redevelopment", detail: "1,300+ stations being modernized. Amrit Bharat Station Scheme. Airport-like amenities. ₹24,470 crore investment." },
    ]
  },
  {
    title: "Highways", icon: Route, color: "gradient-saffron",
    overview: "India has the world's second-largest road network at 6.37 million km. National Highway construction reached a record 13,327 km in FY24 — about 37 km/day.",
    stats: [
      { label: "National Highways", value: "145,240 km" },
      { label: "Expressways", value: "4,000+ km" },
      { label: "State Highways", value: "186,908 km" },
      { label: "Total Roads", value: "6.37 million km" },
      { label: "Bridges", value: "1,50,000+" },
      { label: "NH Budget FY24", value: "₹2.7 lakh crore" },
    ],
    projects: [
      { name: "Bharatmala Pariyojana", detail: "34,800 km of economic corridors, border roads, coastal roads. Phase I: ₹5.35 lakh crore. Connecting 550 districts." },
      { name: "Delhi-Mumbai Expressway", detail: "India's longest expressway (1,386 km). 8-lane, 120 km/h. Reduces travel from 24h to 12h. ₹98,000 crore." },
      { name: "Atal Tunnel (Rohtang)", detail: "World's longest highway tunnel above 10,000 ft (9.02 km). Connects Manali to Lahaul-Spiti. Year-round access." },
      { name: "Chenani-Nashri Tunnel", detail: "India's longest road tunnel (9.2 km) in J&K. Reduces Jammu-Srinagar travel by 2 hours." },
    ]
  },
  {
    title: "Ports & Shipping", icon: Anchor, color: "gradient-emerald",
    overview: "India has a 7,516 km coastline with 12 major ports handling 795 million tonnes annually. Sagarmala programme targets port-led development worth ₹8 lakh crore.",
    stats: [
      { label: "Major Ports", value: "12" },
      { label: "Non-Major Ports", value: "200+" },
      { label: "Cargo Handled", value: "795 MT/year" },
      { label: "Largest Port", value: "Mundra, Gujarat" },
      { label: "Container Traffic", value: "18.2M TEUs" },
      { label: "Shipping Fleet", value: "1,500+ vessels" },
    ],
    projects: [
      { name: "Sagarmala Programme", detail: "₹8 lakh crore port-led development. 600+ projects. Port modernization, coastal connectivity, industrialization, skill development." },
      { name: "Vadhavan Port", detail: "India's largest greenfield deep-water port in Maharashtra. Capacity: 298 MT. Will be among world's top 10. ₹65,544 crore." },
      { name: "Inland Waterways", detail: "National Waterway 1 (Ganga): 1,620 km. Cargo capacity being enhanced. Multi-modal terminals at Varanasi, Haldia, Sahibganj." },
    ]
  },
  {
    title: "Aviation", icon: Plane, color: "gradient-hero",
    overview: "India is the world's 3rd largest aviation market. Domestic passengers grew from 60M (2014) to 152M (2024). UDAN scheme connected 70+ underserved airports.",
    stats: [
      { label: "Operational Airports", value: "148" },
      { label: "International Airports", value: "34" },
      { label: "Busiest Airport", value: "Delhi IGI" },
      { label: "Annual Passengers", value: "376 million" },
      { label: "Airlines", value: "14 scheduled" },
      { label: "Heliports", value: "40+" },
    ],
    projects: [
      { name: "Noida International Airport", detail: "India's largest airport (at completion). 70 MPPA capacity. Phase 1 by 2025. Asia's largest (5,000 acres). ₹29,560 crore." },
      { name: "Navi Mumbai Airport", detail: "Second airport for Mumbai. 20 MPPA Phase 1. Eases pressure on existing CSMIA. ₹16,700 crore." },
      { name: "UDAN Scheme", detail: "Regional Connectivity Scheme. 519 routes operationalized. Flying to 76 airports that had no prior service. ₹2,500 fare cap." },
    ]
  },
  {
    title: "Power & Energy", icon: Zap, color: "gradient-saffron",
    overview: "India is the world's 3rd largest electricity producer and consumer. Renewable energy capacity crossed 180 GW — targeting 500 GW by 2030 and net-zero by 2070.",
    stats: [
      { label: "Installed Capacity", value: "425 GW" },
      { label: "Renewable Energy", value: "180+ GW" },
      { label: "Solar Capacity", value: "73+ GW" },
      { label: "Wind Capacity", value: "46+ GW" },
      { label: "Nuclear Capacity", value: "7.5 GW" },
      { label: "Village Electrification", value: "99.99%" },
    ],
    projects: [
      { name: "PM Surya Ghar (Rooftop Solar)", detail: "1 crore households to get free rooftop solar. ₹75,021 crore subsidy. 300 units free electricity/month. Largest residential solar scheme." },
      { name: "National Green Hydrogen Mission", detail: "5 MMT green hydrogen by 2030. ₹19,744 crore outlay. Making India a global hub. Electrolyser manufacturing incentives." },
      { name: "One Sun One World One Grid", detail: "India-led global solar grid initiative. Connecting solar energy across continents via HVDC cables. Proposed at COP26." },
    ]
  },
  {
    title: "Digital & Telecom", icon: Radio, color: "gradient-emerald",
    overview: "India has the world's cheapest mobile data (~$0.17/GB) and 2nd largest internet user base. UPI processed $2.2 trillion in FY24 — more than Visa+Mastercard in India combined.",
    stats: [
      { label: "Mobile Users", value: "1.15 billion" },
      { label: "Internet Users", value: "900+ million" },
      { label: "5G Base Stations", value: "4,15,000+" },
      { label: "UPI Monthly Txns", value: "14 billion+" },
      { label: "Data per User", value: "19.5 GB/month" },
      { label: "Digital Economy", value: "~$1 trillion" },
    ],
    projects: [
      { name: "BharatNet", detail: "World's largest rural broadband project. 6.4 lakh villages connected via fiber. ₹42,068 crore Phase II. 100 Mbps to gram panchayats." },
      { name: "5G Rollout", detail: "Launched Oct 2022. Covered 700+ districts by 2024. Jio & Airtel deployed 4.15 lakh+ towers. ₹1.5 lakh crore spectrum auction." },
      { name: "India Stack", detail: "Aadhaar (1.39B IDs) + UPI (14B txns/mo) + DigiLocker + eKYC. Adopted/studied by 50+ countries. World's largest digital public infrastructure." },
    ]
  },
];

const energyMix = [
  { name: "Thermal", value: 56, color: "hsl(30,100%,60%)" },
  { name: "Solar", value: 17, color: "hsl(45,100%,55%)" },
  { name: "Wind", value: 11, color: "hsl(200,70%,50%)" },
  { name: "Hydro", value: 11, color: "hsl(230,76%,30%)" },
  { name: "Nuclear", value: 2, color: "hsl(145,50%,34%)" },
  { name: "Biomass", value: 3, color: "hsl(80,50%,40%)" },
];

const capexData = [
  { year: "2019", value: 3.4 }, { year: "2020", value: 4.4 },
  { year: "2021", value: 5.5 }, { year: "2022", value: 7.5 },
  { year: "2023", value: 10.0 }, { year: "2024", value: 11.1 },
];

const Infrastructure = () => {
  const [activeSector, setActiveSector] = useState(0);
  const sector = infraSectors[activeSector];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Networks</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Infrastructure</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          India's infrastructure capital expenditure grew from ₹3.4 lakh crore (2019) to ₹11.1 lakh crore (2024) — a 3x increase powering roads, rails, airports, ports, and digital networks.
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

      {/* Sector Navigator */}
      <div className="flex flex-wrap gap-2 mb-6 sticky top-0 bg-background/80 backdrop-blur-sm py-3 z-10">
        {infraSectors.map((s, i) => {
          const Icon = s.icon;
          return (
            <button
              key={s.title}
              onClick={() => setActiveSector(i)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSector === i
                  ? "gradient-hero text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted shadow-card"
              }`}
            >
              <Icon className="h-4 w-4" /> {s.title}
            </button>
          );
        })}
      </div>

      {/* Active Sector Detail */}
      <div className="animate-fade-in-up mb-8" key={activeSector}>
        <div className="bg-card rounded-xl shadow-card overflow-hidden mb-4">
          <div className={`${sector.color} p-5`}>
            <div className="flex items-center gap-3">
              <sector.icon className="h-7 w-7 text-primary-foreground" />
              <div>
                <h2 className="text-xl font-display font-bold text-primary-foreground">{sector.title}</h2>
                <p className="text-primary-foreground/80 text-sm mt-1">{sector.overview}</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display font-bold text-foreground mb-3">Key Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              {sector.stats.map((stat) => (
                <div key={stat.label} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-bold font-mono text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
            <h3 className="font-display font-bold text-foreground mb-3">Major Projects & Initiatives</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {sector.projects.map((p) => (
                <div key={p.name} className="border border-border rounded-lg p-3 hover:border-secondary/50 transition-colors">
                  <h4 className="font-semibold text-foreground text-sm">{p.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Infra Capex (₹ Lakh Crore)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={capexData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(230,76%,30%)" radius={[4, 4, 0, 0]} name="Capex (₹L Cr)" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-muted-foreground text-center mt-2">3.3x increase in 5 years — highest ever infrastructure investment</p>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Energy Mix (% of Installed Capacity)</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={240}>
              <PieChart>
                <Pie data={energyMix} cx="50%" cy="50%" outerRadius={85} innerRadius={45} dataKey="value" label={({ value }) => `${value}%`}>
                  {energyMix.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {energyMix.map((e) => (
                <div key={e.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: e.color }} />
                  <span className="text-xs text-foreground">{e.name} ({e.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SourceFooter sources={["Ministry of Railways", "NHAI", "AAI", "MoP", "TRAI", "Sagarmala", "PIB"]} />
    </div>
  );
};

export default Infrastructure;
