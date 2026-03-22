import { useState } from "react";
import { Search, BookOpen, MapPin, User, Landmark, Calendar } from "lucide-react";

const allItems = [
  { type: "event", title: "Indus Valley Civilization", desc: "3300–1300 BCE — One of the world's earliest urban civilizations", icon: Calendar },
  { type: "person", title: "Mahatma Gandhi", desc: "Father of the Nation, led India's independence movement", icon: User },
  { type: "place", title: "Taj Mahal", desc: "Mughal architecture masterpiece in Agra, UNESCO World Heritage Site", icon: MapPin },
  { type: "event", title: "Battle of Plassey", desc: "1757 — Marked the beginning of British rule in India", icon: Calendar },
  { type: "person", title: "Ashoka the Great", desc: "Maurya Emperor who spread Buddhism across Asia", icon: User },
  { type: "place", title: "Varanasi", desc: "One of the oldest continuously inhabited cities in the world", icon: MapPin },
  { type: "monument", title: "Qutub Minar", desc: "73-meter tall victory tower built in 1193, Delhi", icon: Landmark },
  { type: "person", title: "Aryabhata", desc: "Ancient mathematician and astronomer, invented concept of zero", icon: User },
  { type: "place", title: "Kerala Backwaters", desc: "Network of interconnected canals, rivers, and lagoons", icon: MapPin },
  { type: "event", title: "Indian Independence", desc: "August 15, 1947 — India gained independence from British rule", icon: Calendar },
  { type: "person", title: "Rabindranath Tagore", desc: "Nobel laureate poet, author of India's national anthem", icon: User },
  { type: "monument", title: "Red Fort", desc: "Historic Mughal fortress in Delhi, built by Shah Jahan", icon: Landmark },
  { type: "dataset", title: "Census of India 2011", desc: "Comprehensive demographic data for 1.2 billion people", icon: BookOpen },
  { type: "dataset", title: "India GDP Data", desc: "Historical GDP data from World Bank and RBI", icon: BookOpen },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = allItems.filter((item) => {
    const matchesQuery = !query || item.title.toLowerCase().includes(query.toLowerCase()) || item.desc.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesQuery && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Knowledge Base</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Search BharatAtlas</h1>
        <p className="mt-2 text-muted-foreground">Search across people, places, events, monuments, and datasets.</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for anything about India..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-card py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground shadow-card focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      {/* Type filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {["all", "person", "place", "event", "monument", "dataset"].map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              typeFilter === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "all" ? "All" : t + "s"}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No results found for "{query}"</p>
        )}
        {filtered.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-card rounded-xl shadow-card p-5 flex gap-4 hover:shadow-elevated transition-shadow animate-fade-in-up" style={{ animationDelay: `${i * 30}ms` }}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-medium text-secondary">{item.type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
