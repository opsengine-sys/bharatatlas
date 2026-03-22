import { Mountain, Waves, TreePine, Thermometer, Globe, MapPin, Compass, Droplets, Sun, Snowflake, Wind, Leaf, ChevronLeft, ChevronRight, Layers, Ruler, Navigation } from "lucide-react";
import { SourceFooter } from "@/components/SourceLinks";
import { useState, useRef, useEffect } from "react";

const keyStats = [
  { label: "Total Area", value: "3.29M km²", detail: "7th largest country", icon: Globe },
  { label: "Coastline", value: "7,516 km", detail: "Including island territories", icon: Navigation },
  { label: "Highest Point", value: "8,586 m", detail: "Kangchenjunga, Sikkim", icon: Mountain },
  { label: "Land Borders", value: "15,106 km", detail: "Shared with 7 nations", icon: Ruler },
  { label: "States", value: "28", detail: "Federated states", icon: MapPin },
  { label: "Union Territories", value: "8", detail: "Centrally administered", icon: Compass },
  { label: "Islands", value: "1,382", detail: "Andaman, Nicobar & Lakshadweep", icon: Layers },
  { label: "Forest Cover", value: "21.7%", detail: "7,13,789 km² (2021)", icon: TreePine },
];

const physioRegions = [
  { name: "The Himalayan Mountains", color: "hsl(230,76%,30%)", desc: "Young fold mountains stretching 2,400 km across northern India. Three parallel ranges — Greater Himalayas (Himadri), Lesser Himalayas (Himachal), and Outer Himalayas (Shivaliks). Home to K2, Kangchenjunga, Nanda Devi.", elevation: "200–8,586 m", area: "~5 lakh km²", features: ["Glaciers: Siachen, Gangotri, Zemu", "Passes: Khardung La, Rohtang, Nathu La", "Valleys: Kashmir, Kullu, Spiti"] },
  { name: "The Northern Plains", color: "hsl(145,50%,34%)", desc: "Vast alluvial plains formed by the Indus, Ganga, and Brahmaputra river systems. Among the most fertile regions on Earth. Divided into Bhabar, Terai, Bhangar, and Khadar zones.", elevation: "50–300 m", area: "~7 lakh km²", features: ["Indo-Gangetic Plain: Breadbasket of India", "Punjab Plains: Land of Five Rivers", "Brahmaputra Plains: Assam Valley"] },
  { name: "The Peninsular Plateau", color: "hsl(30,100%,55%)", desc: "One of the oldest landmasses — part of Gondwanaland. Triangular tableland divided into Central Highlands (Malwa Plateau) and Deccan Plateau. Rich in minerals — iron, coal, manganese.", elevation: "300–1,200 m", area: "~16 lakh km²", features: ["Deccan Traps: Basaltic lava formations", "Chota Nagpur Plateau: Mineral belt", "Malwa Plateau: Central India"] },
  { name: "The Coastal Plains", color: "hsl(200,70%,50%)", desc: "Narrow strips along the Arabian Sea (western) and Bay of Bengal (eastern). Western coast: Konkan, Malabar. Eastern coast: Coromandel, Northern Circars. Major ports and fishing.", elevation: "0–50 m", area: "~1 lakh km²", features: ["Konkan Coast: Goa to Mumbai", "Malabar Coast: Kerala backwaters", "Coromandel Coast: Tamil Nadu"] },
  { name: "The Thar Desert", color: "hsl(40,80%,60%)", desc: "World's 17th largest desert in western Rajasthan and Gujarat. Sandy arid landscape with sand dunes, rocky terrain, and salt flats. Luni is the only significant river.", elevation: "100–500 m", area: "~2 lakh km²", features: ["Great Rann of Kutch: Salt marsh", "Sam Sand Dunes: Jaisalmer", "Barmer-Jaisalmer: Fossil park"] },
  { name: "The Islands", color: "hsl(270,50%,50%)", desc: "Andaman & Nicobar Islands (572 islands) in Bay of Bengal — volcanic origin. Lakshadweep (36 islands) in Arabian Sea — coral atolls. Rich marine biodiversity and tropical forests.", elevation: "0–732 m", area: "~8,249 km²", features: ["Barren Island: Only active volcano", "Coral reefs: Lakshadweep atolls", "Indigenous Sentinelese tribes"] },
];

const rivers = [
  { name: "Ganges", length: "2,525 km", origin: "Gangotri Glacier", mouth: "Bay of Bengal", basin: "8,61,000 km²", detail: "Holiest river. Supports 40% of India's population. Tributaries: Yamuna, Son, Ghaghara, Gandak.", system: "Himalayan" },
  { name: "Brahmaputra", length: "3,848 km (total)", origin: "Angsi Glacier, Tibet", mouth: "Bay of Bengal", basin: "5,80,000 km²", detail: "Called Tsangpo in Tibet, Jamuna in Bangladesh. Majuli — world's largest river island.", system: "Himalayan" },
  { name: "Indus", length: "3,180 km (total)", origin: "Lake Manasarovar, Tibet", mouth: "Arabian Sea", basin: "11,65,000 km²", detail: "Gave India its name. Major tributaries: Jhelum, Chenab, Ravi, Beas, Sutlej (Panj-Aab/Punjab).", system: "Himalayan" },
  { name: "Godavari", length: "1,465 km", origin: "Trimbakeshwar, MH", mouth: "Bay of Bengal", basin: "3,13,000 km²", detail: "Longest Peninsular river. Called 'Dakshina Ganga'. Passes through Maharashtra, Telangana, AP.", system: "Peninsular" },
  { name: "Krishna", length: "1,400 km", origin: "Mahabaleshwar, MH", mouth: "Bay of Bengal", basin: "2,59,000 km²", detail: "Second largest Peninsular river. Major dams: Nagarjuna Sagar, Srisailam, Almatti.", system: "Peninsular" },
  { name: "Narmada", length: "1,312 km", origin: "Amarkantak, MP", mouth: "Arabian Sea", basin: "98,796 km²", detail: "Flows westward through a rift valley. Marble Rocks at Bhedaghat. Sardar Sarovar Dam.", system: "Peninsular" },
  { name: "Yamuna", length: "1,376 km", origin: "Yamunotri Glacier", mouth: "Ganges (Prayagraj)", basin: "3,66,000 km²", detail: "Largest tributary of the Ganges. Flows past Delhi, Agra (Taj Mahal), Mathura.", system: "Himalayan" },
  { name: "Kaveri", length: "800 km", origin: "Talakaveri, Karnataka", mouth: "Bay of Bengal", basin: "81,155 km²", detail: "Called 'Ganga of the South'. Jog Falls & Shivasamudram Falls. Grand Anicut — ancient dam.", system: "Peninsular" },
];

const mountains = [
  { name: "Himalayas", range: "Greater Himalaya", peaks: "Kangchenjunga (8,586m), Nanda Devi (7,816m)", span: "2,400 km across N India", detail: "Youngest & highest mountain range. Source of major rivers. Tectonic activity ongoing — rises ~5mm/year." },
  { name: "Western Ghats", range: "Sahyadri", peaks: "Anamudi (2,695m), Doddabetta (2,637m)", span: "1,600 km along west coast", detail: "UNESCO World Heritage. One of world's 8 'hottest hotspots' of biodiversity. Older than Himalayas (~150 million years)." },
  { name: "Eastern Ghats", range: "Discontinuous ranges", peaks: "Arma Konda (1,680m)", span: "Odisha to Tamil Nadu", detail: "Broken by major rivers (Godavari, Krishna, Kaveri). Rich in bauxite & iron ore. Araku Valley coffee." },
  { name: "Aravalli Range", range: "Oldest fold mountains", peaks: "Guru Shikhar (1,722m), Mt Abu", span: "800 km across Rajasthan", detail: "World's oldest surviving mountain range (~350 million years). Acts as barrier between Thar Desert and fertile plains." },
  { name: "Vindhya Range", range: "Central highlands", peaks: "Highest ~1,100 m", span: "Separates N & S India", detail: "Historical boundary between Hindustan and Deccan. Bhimbetka rock shelters (UNESCO) — 30,000-year-old cave paintings." },
  { name: "Satpura Range", range: "Central India", peaks: "Dhupgarh (1,350m), Pachmarhi", span: "900 km across MP", detail: "Parallel to Vindhya. Pachmarhi hill station — 'Queen of Satpura'. Major tiger reserves: Panna, Pench." },
];

const nationalParks = [
  { name: "Jim Corbett", state: "Uttarakhand", est: 1936, area: "520 km²", famous: "Bengal Tiger", detail: "India's first national park. Named after hunter-naturalist Jim Corbett. Part of Project Tiger." },
  { name: "Kaziranga", state: "Assam", est: 1974, area: "430 km²", famous: "Indian Rhinoceros", detail: "UNESCO World Heritage. Home to 2/3 of world's one-horned rhinos. Highest density of tigers in India." },
  { name: "Ranthambore", state: "Rajasthan", est: 1980, area: "392 km²", famous: "Bengal Tiger", detail: "Former royal hunting grounds. Tigers spotted in daylight among 10th-century ruins of Ranthambore Fort." },
  { name: "Sundarbans", state: "West Bengal", est: 1984, area: "1,330 km²", famous: "Royal Bengal Tiger", detail: "World's largest mangrove forest. Tigers here are excellent swimmers. Named for Sundari trees." },
  { name: "Gir", state: "Gujarat", est: 1965, area: "1,412 km²", famous: "Asiatic Lion", detail: "Only home of Asiatic Lions in the wild. Population recovered from ~20 (1913) to ~700+ (2023)." },
  { name: "Periyar", state: "Kerala", est: 1982, area: "925 km²", famous: "Indian Elephant", detail: "Centered around an artificial lake. Elephants bathing in the lake is an iconic sight. Bamboo rafting safaris." },
  { name: "Valley of Flowers", state: "Uttarakhand", est: 1982, area: "87 km²", famous: "Alpine Flora", detail: "UNESCO World Heritage. Over 600 species of flowering plants. Accessible only June–October. Nanda Devi biosphere." },
  { name: "Bandhavgarh", state: "Madhya Pradesh", est: 1968, area: "449 km²", famous: "White Tiger", detail: "Highest density of Bengal tigers in India. Ancient Bandhavgarh Fort. First white tiger captured here in 1951." },
];

const climateZones = [
  { name: "Tropical Wet (Am)", region: "Kerala, Coastal Karnataka, NE India", temp: "24–27°C avg", rainfall: "2,000–3,000+ mm", detail: "Heavy monsoon rainfall. Lush tropical forests. Mawsynram, Meghalaya — wettest place on Earth (11,871 mm/year).", icon: Droplets },
  { name: "Tropical Dry (Aw/As)", region: "Most of Peninsular India", temp: "25–30°C avg", rainfall: "750–1,500 mm", detail: "Distinct wet (June–Sep) and dry seasons. Deciduous forests shed leaves in summer. Agriculture dependent on monsoon.", icon: Sun },
  { name: "Semi-Arid (BSh)", region: "Rajasthan, Gujarat, rain-shadow areas", temp: "25–30°C avg", rainfall: "400–750 mm", detail: "Steppe-like grasslands. Thorn forests with acacia. Traditional water harvesting — stepwells, johads, tankas.", icon: Wind },
  { name: "Arid / Desert (BWh)", region: "Thar Desert, Kutch", temp: "28–35°C avg (summer 50°C+)", rainfall: "<250 mm", detail: "Extreme heat in summer, cold nights in winter. Sand dunes, rocky plains, salt flats. Indira Gandhi Canal for irrigation.", icon: Thermometer },
  { name: "Humid Subtropical (Cwa)", region: "Northern Plains, NE Plateau", temp: "15–25°C avg", rainfall: "1,000–2,000 mm", detail: "Hot summers, cool winters, monsoon rains. Indo-Gangetic breadbasket. Dense fog in winter. Extreme 45°C+ in May–June.", icon: Leaf },
  { name: "Alpine / Tundra (ET/H)", region: "Himalayan regions, Ladakh", temp: "-20°C to 15°C", rainfall: "150–300 mm (mostly snow)", detail: "Permafrost at high altitudes. Sparse vegetation above treeline. Siachen Glacier — world's highest battlefield.", icon: Snowflake },
];

const Geography = () => {
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [selectedRiver, setSelectedRiver] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const region = physioRegions[selectedRegion];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Geography</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Geographic Explorer</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          India's extraordinary diversity spans from the world's highest peaks to tropical archipelagos, arid deserts to dense rainforests — all within 3.29 million km².
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
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

      {/* Physiographic Regions - Interactive */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5 text-secondary" /> Physiographic Regions
      </h2>
      <div className="bg-card rounded-xl shadow-card p-5 mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {physioRegions.map((r, i) => (
            <button
              key={i}
              onClick={() => setSelectedRegion(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedRegion === i
                  ? "text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={selectedRegion === i ? { background: r.color } : {}}
            >
              {r.name}
            </button>
          ))}
        </div>
        <div className="animate-fade-in-up p-4 bg-muted/50 rounded-lg border border-border" key={selectedRegion}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full" style={{ background: region.color }} />
                <h3 className="text-xl font-display font-bold text-foreground">{region.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{region.desc}</p>
              <ul className="mt-3 space-y-1">
                {region.features.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-secondary">•</span>{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-sm font-display font-bold text-foreground">{region.elevation}</p>
                <p className="text-[10px] text-muted-foreground">Elevation</p>
              </div>
              <div>
                <p className="text-sm font-display font-bold text-foreground">{region.area}</p>
                <p className="text-[10px] text-muted-foreground">Area</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mountain Ranges */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Mountain className="h-5 w-5 text-secondary" /> Mountain Ranges
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {mountains.map((m) => (
          <div key={m.name} className="bg-card rounded-xl shadow-card p-4 hover:shadow-elevated transition-shadow">
            <h3 className="font-display font-bold text-foreground">{m.name}</h3>
            <p className="text-xs font-mono text-secondary mt-0.5">{m.range}</p>
            <p className="text-xs text-muted-foreground mt-1"><strong>Peaks:</strong> {m.peaks}</p>
            <p className="text-xs text-muted-foreground"><strong>Span:</strong> {m.span}</p>
            <p className="text-sm text-muted-foreground mt-2">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* Rivers - Horizontal scroll */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Waves className="h-5 w-5 text-secondary" /> Major River Systems
      </h2>
      <div className="bg-card rounded-xl shadow-card p-5 mb-10">
        <div className="relative">
          {canScrollLeft && (
            <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 shadow-elevated rounded-full p-2 hover:bg-muted transition-colors">
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          )}
          {canScrollRight && (
            <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 shadow-elevated rounded-full p-2 hover:bg-muted transition-colors">
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          )}
          <div ref={scrollRef} className="overflow-x-auto pb-2 px-6" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-3 min-w-max">
              {rivers.map((r, i) => {
                const isSelected = selectedRiver === i;
                return (
                  <div
                    key={r.name}
                    onClick={() => setSelectedRiver(isSelected ? null : i)}
                    className={`w-[280px] shrink-0 rounded-xl p-4 cursor-pointer transition-all border ${
                      isSelected ? "border-secondary shadow-elevated bg-muted/30" : "border-border hover:border-secondary/50 bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-foreground">{r.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        r.system === "Himalayan" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                      }`}>{r.system}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span><strong>Length:</strong> {r.length}</span>
                      <span><strong>Basin:</strong> {r.basin}</span>
                      <span><strong>Origin:</strong> {r.origin}</span>
                      <span><strong>Mouth:</strong> {r.mouth}</span>
                    </div>
                    {isSelected && (
                      <p className="text-sm text-muted-foreground mt-3 animate-fade-in-up leading-relaxed">{r.detail}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* National Parks */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <TreePine className="h-5 w-5 text-secondary" /> Iconic National Parks
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {nationalParks.map((np) => (
          <div key={np.name} className="bg-card rounded-xl shadow-card p-4 hover:shadow-elevated transition-shadow group">
            <div className="flex items-start justify-between">
              <h3 className="font-display font-bold text-foreground">{np.name}</h3>
              <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Est. {np.est}</span>
            </div>
            <p className="text-xs text-secondary font-medium mt-1">{np.famous}</p>
            <p className="text-xs text-muted-foreground">{np.state} • {np.area}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{np.detail}</p>
          </div>
        ))}
      </div>

      {/* Climate Zones */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-secondary" /> Climate Zones
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {climateZones.map((cz) => {
          const Icon = cz.icon;
          return (
            <div key={cz.name} className="bg-card rounded-xl shadow-card overflow-hidden hover:shadow-elevated transition-shadow">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-secondary" />
                  <h3 className="font-display font-bold text-foreground text-sm">{cz.name}</h3>
                </div>
                <p className="text-xs text-secondary font-medium">{cz.region}</p>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span><strong>Temp:</strong> {cz.temp}</span>
                  <span><strong>Rain:</strong> {cz.rainfall}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{cz.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <SourceFooter sources={["Survey of India", "Wikipedia", "National Geographic", "India Meteorological Department"]} />
    </div>
  );
};

export default Geography;
