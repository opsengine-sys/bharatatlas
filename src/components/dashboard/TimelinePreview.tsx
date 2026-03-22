import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const eraColors: Record<string, string> = {
  Ancient: "bg-secondary",
  Medieval: "bg-primary",
  Modern: "bg-accent",
};

const events = [
  { year: "3300 BCE", title: "Indus Valley Civilization", desc: "Advanced urban planning, drainage, and trade networks at Harappa and Mohenjo-daro.", era: "Ancient" },
  { year: "1500 BCE", title: "Vedic Period", desc: "Composition of the Vedas, development of early kingdoms and philosophical traditions.", era: "Ancient" },
  { year: "322 BCE", title: "Maurya Empire", desc: "First pan-Indian empire under Chandragupta. Ashoka spread Buddhism across Asia.", era: "Ancient" },
  { year: "320 CE", title: "Gupta Golden Age", desc: "Breakthroughs in math (zero), astronomy, art, and literature by Kalidasa and Aryabhata.", era: "Ancient" },
  { year: "1526", title: "Mughal Empire", desc: "Built the Taj Mahal and Red Fort. Akbar's era of religious tolerance and cultural fusion.", era: "Medieval" },
  { year: "1674", title: "Maratha Empire", desc: "Shivaji Maharaj founded a powerful Hindu empire challenging Mughal dominance.", era: "Medieval" },
  { year: "1857", title: "First War of Independence", desc: "Major uprising against British East India Company rule across northern India.", era: "Modern" },
  { year: "1947", title: "Independence", desc: "India gained freedom on August 15. Jawaharlal Nehru became the first Prime Minister.", era: "Modern" },
];

const TimelinePreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-bold text-foreground">Historical Timeline</h3>
        <Link to="/history" className="flex items-center gap-1 text-xs font-medium text-secondary hover:underline">
          Explore Full Timeline <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Horizontal era bar */}
      <div className="flex gap-1 mb-5">
        {["Ancient", "Medieval", "Modern"].map((era) => {
          const count = events.filter((e) => e.era === era).length;
          return (
            <div key={era} className="flex-1">
              <div className={`h-1.5 rounded-full ${era === "Ancient" ? "gradient-saffron" : era === "Medieval" ? "gradient-hero" : "gradient-emerald"}`} />
              <p className="text-[10px] text-muted-foreground mt-1 text-center">{era} ({count})</p>
            </div>
          );
        })}
      </div>

      <div className="relative">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-border" />
        <div className="space-y-1">
          {events.map((event, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={i}
                className={`relative flex gap-4 rounded-lg px-2 py-2.5 cursor-pointer transition-all duration-200 ${
                  isHovered ? "bg-muted" : "hover:bg-muted/50"
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`relative z-10 mt-1 h-[18px] w-[18px] shrink-0 rounded-full ${eraColors[event.era]} ring-4 ring-card transition-transform duration-200 ${isHovered ? "scale-125" : ""}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">{event.year}</span>
                    <p className="text-sm font-semibold text-foreground truncate">{event.title}</p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isHovered ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-xs text-muted-foreground leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelinePreview;
