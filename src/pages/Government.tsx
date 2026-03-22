import { Landmark, User, Scale, Building, BookOpen, Globe, Shield, Vote, ChevronLeft, ChevronRight, Crown, Gavel, Users, FileText, MapPin, Calendar } from "lucide-react";
import { SourceFooter } from "@/components/SourceLinks";
import { useState, useRef, useEffect } from "react";

const leaders = [
  { role: "President", name: "Droupadi Murmu", since: "2022", icon: Landmark, desc: "Head of State, Supreme Commander of Armed Forces. First tribal woman to hold the office.", detail: "Elected as the 15th President. Represents the constitutional head of the Republic." },
  { role: "Prime Minister", name: "Narendra Modi", since: "2014", icon: User, desc: "Head of Government, leads the Council of Ministers.", detail: "Serving third consecutive term. Previously Chief Minister of Gujarat (2001–2014)." },
  { role: "Chief Justice", name: "Sanjiv Khanna", since: "2024", icon: Scale, desc: "Head of the Judiciary, Supreme Court of India.", detail: "51st Chief Justice. The Supreme Court is the apex court with original, appellate and advisory jurisdiction." },
  { role: "Lok Sabha Speaker", name: "Om Birla", since: "2019", icon: Building, desc: "Presides over the Lower House of Parliament.", detail: "Ensures orderly conduct of proceedings. Lok Sabha has 543 elected members." },
];

const branches = [
  {
    name: "Legislature",
    icon: BookOpen,
    color: "gradient-saffron",
    head: "Parliament of India",
    details: [
      "Bicameral: Rajya Sabha (245 seats) & Lok Sabha (543 seats)",
      "Rajya Sabha members elected by state legislatures for 6-year terms",
      "Lok Sabha members directly elected for 5-year terms",
      "Bills must pass both houses to become law",
      "Budget sessions, Monsoon sessions & Winter sessions annually",
    ],
  },
  {
    name: "Executive",
    icon: Shield,
    color: "gradient-hero",
    head: "President & Council of Ministers",
    details: [
      "President elected by Electoral College for 5-year term",
      "Real executive power vests in the Prime Minister",
      "Council of Ministers headed by PM aids & advises President",
      "Cabinet, Ministers of State & Deputy Ministers",
      "Bureaucracy headed by Cabinet Secretary & IAS officers",
    ],
  },
  {
    name: "Judiciary",
    icon: Gavel,
    color: "gradient-emerald",
    head: "Supreme Court of India",
    details: [
      "Independent judiciary — guardian of the Constitution",
      "Supreme Court: 34 judges including the Chief Justice",
      "25 High Courts across states & union territories",
      "District & subordinate courts at local level",
      "Power of Judicial Review to strike down unconstitutional laws",
    ],
  },
];

const keyFacts = [
  { label: "Constitution Adopted", value: "26 Jan 1950", icon: FileText },
  { label: "Articles", value: "448", icon: BookOpen },
  { label: "Schedules", value: "12", icon: Calendar },
  { label: "Amendments", value: "106", icon: Gavel },
  { label: "States", value: "28", icon: MapPin },
  { label: "Union Territories", value: "8", icon: Globe },
  { label: "Lok Sabha Seats", value: "543", icon: Users },
  { label: "Rajya Sabha Seats", value: "245", icon: Vote },
];

const pmTimeline = [
  { name: "Jawaharlal Nehru", period: "1947–1964", party: "INC", years: 17, achievement: "Architect of modern India. Championed Non-Aligned Movement, established IITs, built Bhakra Nangal Dam. Known as 'Chacha Nehru'.", birthYear: 1889, deathYear: 1964 },
  { name: "Lal Bahadur Shastri", period: "1964–1966", party: "INC", years: 2, achievement: "Led India during 1965 Indo-Pak War. Coined 'Jai Jawan Jai Kisan'. Signed Tashkent Declaration.", birthYear: 1904, deathYear: 1966 },
  { name: "Indira Gandhi", period: "1966–77, 80–84", party: "INC", years: 15, achievement: "First woman PM. Led during 1971 Bangladesh Liberation War. Nationalized banks. Green Revolution era.", birthYear: 1917, deathYear: 1984 },
  { name: "Morarji Desai", period: "1977–1979", party: "Janata", years: 2, achievement: "First non-Congress PM. Restored civil liberties post-Emergency. Received Bharat Ratna & Nishan-e-Pakistan.", birthYear: 1896, deathYear: 1995 },
  { name: "Charan Singh", period: "1979–1980", party: "Janata(S)", years: 0.5, achievement: "Champion of farmers' rights. Never faced a floor test as PM. Known as the 'Champion of India's peasants'.", birthYear: 1902, deathYear: 1987 },
  { name: "Rajiv Gandhi", period: "1984–1989", party: "INC", years: 5, achievement: "Youngest PM at 40. Initiated computerization & telecom revolution. Launched Technology Missions.", birthYear: 1944, deathYear: 1991 },
  { name: "V.P. Singh", period: "1989–1990", party: "Janata Dal", years: 1, achievement: "Implemented Mandal Commission recommendations for OBC reservations. Anti-corruption crusader.", birthYear: 1931, deathYear: 2008 },
  { name: "Chandra Shekhar", period: "1990–1991", party: "SJP", years: 0.5, achievement: "Led minority government. Navigated Gulf War crisis and balance of payments crisis.", birthYear: 1927, deathYear: 2007 },
  { name: "P.V. Narasimha Rao", period: "1991–1996", party: "INC", years: 5, achievement: "Father of economic reforms. Liberalized the economy with FM Manmohan Singh. Look East Policy.", birthYear: 1921, deathYear: 2004 },
  { name: "Atal Bihari Vajpayee", period: "1998–2004", party: "BJP", years: 6, achievement: "Pokhran-II nuclear tests. Golden Quadrilateral highway project. Lahore bus diplomacy. Sarva Shiksha Abhiyan.", birthYear: 1924, deathYear: 2018 },
  { name: "Manmohan Singh", period: "2004–2014", party: "INC", years: 10, achievement: "Architect of 1991 liberalization as FM. RTI Act, MGNREGA, Aadhaar, Indo-US Nuclear Deal.", birthYear: 1932, deathYear: 2024 },
  { name: "Narendra Modi", period: "2014–Present", party: "BJP", years: 11, achievement: "Digital India, Make in India, GST reform, Swachh Bharat. First PM born in independent India to win 3 terms.", birthYear: 1950, deathYear: null },
];

const partyColors: Record<string, string> = {
  INC: "hsl(30,100%,55%)",
  BJP: "hsl(30,90%,50%)",
  Janata: "hsl(145,50%,40%)",
  "Janata(S)": "hsl(145,40%,45%)",
  "Janata Dal": "hsl(160,50%,40%)",
  SJP: "hsl(200,50%,45%)",
};

const Government = () => {
  const [selectedPM, setSelectedPM] = useState<number | null>(null);
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
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  const selected = selectedPM !== null ? pmTimeline[selectedPM] : null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Governance</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Government of India</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          The world's largest democracy — a sovereign, socialist, secular, democratic republic with a parliamentary system and federal structure established by the Constitution of India.
        </p>
      </div>

      {/* Key Constitutional Facts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
        {keyFacts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label} className="bg-card rounded-xl shadow-card p-3 text-center">
              <Icon className="h-4 w-4 text-secondary mx-auto mb-1" />
              <p className="text-lg font-display font-bold text-foreground">{fact.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{fact.label}</p>
            </div>
          );
        })}
      </div>

      {/* Current Leadership */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Crown className="h-5 w-5 text-secondary" /> Current Leadership
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {leaders.map((leader) => {
          const Icon = leader.icon;
          return (
            <div key={leader.role} className="bg-card rounded-xl shadow-card p-5 flex gap-4 group hover:shadow-elevated transition-shadow">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg gradient-hero">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{leader.role}</p>
                <p className="text-lg font-display font-bold text-foreground">{leader.name}</p>
                <p className="text-sm text-muted-foreground">{leader.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{leader.detail}</p>
                <p className="text-xs text-secondary font-mono mt-1">Since {leader.since}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Three Branches */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Scale className="h-5 w-5 text-secondary" /> Three Pillars of Democracy
      </h2>
      <div className="grid lg:grid-cols-3 gap-4 mb-10">
        {branches.map((branch) => {
          const Icon = branch.icon;
          return (
            <div key={branch.name} className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className={`${branch.color} p-4 flex items-center gap-3`}>
                <Icon className="h-6 w-6 text-primary-foreground" />
                <div>
                  <p className="text-primary-foreground font-display font-bold text-lg">{branch.name}</p>
                  <p className="text-primary-foreground/80 text-xs">{branch.head}</p>
                </div>
              </div>
              <ul className="p-4 space-y-2">
                {branch.details.map((d, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Federal Structure */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <Globe className="h-5 w-5 text-secondary" /> Federal Structure
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="bg-card rounded-xl shadow-card p-5">
          <h3 className="font-display font-bold text-foreground mb-3">Centre–State Relations</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-secondary">•</span>Three lists: Union, State & Concurrent (7th Schedule)</li>
            <li className="flex gap-2"><span className="text-secondary">•</span>Governor appointed by President as constitutional head of state</li>
            <li className="flex gap-2"><span className="text-secondary">•</span>Chief Minister heads state government with Council of Ministers</li>
            <li className="flex gap-2"><span className="text-secondary">•</span>Finance Commission allocates revenue between Centre & States</li>
            <li className="flex gap-2"><span className="text-secondary">•</span>Inter-State Council for coordination under Article 263</li>
          </ul>
        </div>
        <div className="bg-card rounded-xl shadow-card p-5">
          <h3 className="font-display font-bold text-foreground mb-3">Electoral System</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-secondary">•</span>Election Commission of India — autonomous constitutional body</li>
            <li className="flex gap-2"><span className="text-secondary">•</span>Universal adult suffrage: ~970 million eligible voters (2024)</li>
            <li className="flex gap-2"><span className="text-secondary">•</span>First-past-the-post system for Lok Sabha & State Assemblies</li>
            <li className="flex gap-2"><span className="text-secondary">•</span>Electronic Voting Machines (EVMs) with VVPAT since 2014</li>
            <li className="flex gap-2"><span className="text-secondary">•</span>73rd & 74th Amendments: Local self-governance (Panchayati Raj)</li>
          </ul>
        </div>
      </div>

      {/* PM Timeline - Horizontal Interactive */}
      <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-secondary" /> Prime Ministers of India
      </h2>
      <div className="bg-card rounded-xl shadow-card p-5 mb-4">
        {/* Scroll controls */}
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 shadow-elevated rounded-full p-2 hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 shadow-elevated rounded-full p-2 hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          )}

          {/* Scrollable timeline */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex items-end gap-0 min-w-max pt-8 pb-2 px-8">
              {/* Timeline base line */}
              <div className="absolute bottom-6 left-8 right-8 h-0.5 bg-border" />
              {pmTimeline.map((pm, i) => {
                const isActive = selectedPM === i;
                const barHeight = Math.max(40, pm.years * 8);
                const color = partyColors[pm.party] || "hsl(230,76%,30%)";
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center cursor-pointer group relative"
                    style={{ width: "110px" }}
                    onClick={() => setSelectedPM(isActive ? null : i)}
                  >
                    {/* Bar */}
                    <div
                      className="w-10 rounded-t-md transition-all duration-300 relative"
                      style={{
                        height: `${barHeight}px`,
                        background: color,
                        opacity: isActive ? 1 : 0.6,
                        transform: isActive ? "scaleY(1.1)" : "scaleY(1)",
                        transformOrigin: "bottom",
                        boxShadow: isActive ? `0 0 20px ${color}40` : "none",
                      }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                        {pm.years}y
                      </span>
                    </div>
                    {/* Dot on timeline */}
                    <div
                      className="w-3 h-3 rounded-full border-2 border-background relative z-10 -mb-1.5 transition-transform"
                      style={{
                        background: color,
                        transform: isActive ? "scale(1.5)" : "scale(1)",
                      }}
                    />
                    {/* Name & period */}
                    <div className="mt-3 text-center">
                      <p className={`text-[11px] font-semibold leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"} transition-colors`}>
                        {pm.name.split(" ").slice(-1)[0]}
                      </p>
                      <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{pm.period.split("–")[0]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expanded PM info */}
        {selected && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg animate-fade-in-up border border-border">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: partyColors[selected.party] || "hsl(230,76%,30%)" }}
                  />
                  <span className="text-xs font-mono text-muted-foreground">{selected.party}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">{selected.name}</h3>
                <p className="text-sm font-mono text-secondary">{selected.period}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{selected.achievement}</p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{selected.years}</p>
                  <p className="text-[10px] text-muted-foreground">Years in Office</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{selected.birthYear}</p>
                  <p className="text-[10px] text-muted-foreground">Born</p>
                </div>
                {selected.deathYear && (
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">{selected.deathYear}</p>
                    <p className="text-[10px] text-muted-foreground">Passed</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {!selected && (
          <p className="text-xs text-muted-foreground text-center mt-2">Click on a Prime Minister to see details</p>
        )}
      </div>

      <SourceFooter sources={["Government of India", "Wikipedia", "Election Commission of India"]} />
    </div>
  );
};

export default Government;
