import { Plane } from "lucide-react";
import { useEffect, useState } from "react";
import indiaMapUrl from "@/assets/india-map.svg";

// Coordinates calibrated to the @svg-maps/india viewBox (0 0 612 696)
// Reference points: Delhi state path starts ~188,205; Goa ~115,504; Telangana ~196,448
const airports = [
  { code: "DEL", name: "Indira Gandhi Intl", city: "Delhi", x: 192, y: 210 },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj", city: "Mumbai", x: 108, y: 430 },
  { code: "BLR", name: "Kempegowda Intl", city: "Bengaluru", x: 170, y: 540 },
  { code: "MAA", name: "Chennai Intl", city: "Chennai", x: 240, y: 555 },
  { code: "CCU", name: "Netaji Subhas Chandra Bose", city: "Kolkata", x: 380, y: 345 },
  { code: "HYD", name: "Rajiv Gandhi Intl", city: "Hyderabad", x: 220, y: 450 },
  { code: "GOI", name: "Manohar Intl", city: "Goa", x: 120, y: 510 },
  { code: "AMD", name: "Sardar Vallabhbhai Patel", city: "Ahmedabad", x: 108, y: 320 },
  { code: "JAI", name: "Jaipur Intl", city: "Jaipur", x: 155, y: 260 },
  { code: "LKO", name: "Chaudhary Charan Singh", city: "Lucknow", x: 265, y: 248 },
  { code: "COK", name: "Cochin Intl", city: "Kochi", x: 165, y: 590 },
  { code: "SXR", name: "Sheikh ul-Alam Intl", city: "Srinagar", x: 140, y: 115 },
  { code: "GAU", name: "Lokpriya Gopinath Bordoloi", city: "Guwahati", x: 470, y: 260 },
  { code: "IXC", name: "Chandigarh Airport", city: "Chandigarh", x: 175, y: 180 },
  { code: "PAT", name: "Jay Prakash Narayan", city: "Patna", x: 330, y: 270 },
  { code: "TRV", name: "Trivandrum Intl", city: "Thiruvananthapuram", x: 165, y: 625 },
];

const sampleFlights = [
  { from: "DEL", to: "BOM", airline: "Air India", progress: 0 },
  { from: "BLR", to: "DEL", airline: "IndiGo", progress: 0 },
  { from: "CCU", to: "MAA", airline: "SpiceJet", progress: 0 },
  { from: "HYD", to: "BOM", airline: "Vistara", progress: 0 },
  { from: "AMD", to: "BLR", airline: "IndiGo", progress: 0 },
  { from: "DEL", to: "GOI", airline: "Air India", progress: 0 },
  { from: "JAI", to: "CCU", airline: "Vistara", progress: 0 },
  { from: "LKO", to: "HYD", airline: "SpiceJet", progress: 0 },
  { from: "SXR", to: "DEL", airline: "Air India", progress: 0 },
  { from: "GAU", to: "BLR", airline: "IndiGo", progress: 0 },
  { from: "COK", to: "DEL", airline: "Vistara", progress: 0 },
  { from: "PAT", to: "BOM", airline: "SpiceJet", progress: 0 },
  { from: "IXC", to: "MAA", airline: "Air India", progress: 0 },
  { from: "TRV", to: "CCU", airline: "IndiGo", progress: 0 },
];

const airlineColors: Record<string, string> = {
  "Air India": "hsl(30,100%,55%)",
  "IndiGo": "hsl(220,80%,50%)",
  "SpiceJet": "hsl(0,80%,55%)",
  "Vistara": "hsl(270,60%,50%)",
};

const Flights = () => {
  const [flights, setFlights] = useState(
    sampleFlights.map((f, i) => ({ ...f, progress: (i * 12 + 5) % 100 }))
  );
  const [hoveredAirport, setHoveredAirport] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((prev) =>
        prev.map((f) => ({
          ...f,
          progress: f.progress >= 100 ? 0 : f.progress + 0.4,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getAirport = (code: string) => airports.find((a) => a.code === code)!;

  const getFlightPath = (from: typeof airports[0], to: typeof airports[0]) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const offset = dist * 0.18;
    const cx = midX - (dy / dist) * offset;
    const cy = midY + (dx / dist) * offset;
    return { path: `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`, cx, cy };
  };

  const getPointOnCurve = (from: typeof airports[0], to: typeof airports[0], t: number) => {
    const { cx, cy } = getFlightPath(from, to);
    const x = (1 - t) ** 2 * from.x + 2 * (1 - t) * t * cx + t ** 2 * to.x;
    const y = (1 - t) ** 2 * from.y + 2 * (1 - t) * t * cy + t ** 2 * to.y;
    return { x, y };
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Aviation</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Flight Tracker</h1>
        <p className="mt-2 text-muted-foreground">
          Simulated live flight activity across {airports.length} major Indian airports.
        </p>
      </div>

      {/* Airline Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(airlineColors).map(([airline, color]) => (
          <div key={airline} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-full" style={{ background: color }} />
            {airline}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-2 sm:p-4 relative overflow-hidden">
          <svg viewBox="0 0 612 696" className="w-full h-auto">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {/* India Map SVG as background */}
            <image
              href={indiaMapUrl}
              x="0" y="0" width="612" height="696"
              opacity="0.35"
              style={{ pointerEvents: 'none' }}
            />

            {/* Flight paths and planes */}
            {flights.map((flight, i) => {
              const from = getAirport(flight.from);
              const to = getAirport(flight.to);
              const { path } = getFlightPath(from, to);
              const t = flight.progress / 100;
              const pos = getPointOnCurve(from, to, t);
              const nextPos = getPointOnCurve(from, to, Math.min(1, t + 0.02));
              const angle = Math.atan2(nextPos.y - pos.y, nextPos.x - pos.x) * (180 / Math.PI);
              const color = airlineColors[flight.airline] || "hsl(30,100%,55%)";
              const isSelected = selectedFlight === i;

              return (
                <g key={i} opacity={selectedFlight !== null && !isSelected ? 0.25 : 1}>
                  {/* Route arc */}
                  <path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth={isSelected ? "2" : "1"}
                    strokeDasharray="6,4"
                    opacity={0.4}
                  />
                  {/* Trail (progress portion) */}
                  <path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    strokeDasharray={`${t * 300}, 1000`}
                    opacity={0.7}
                  />
                  {/* Plane glow */}
                  <circle cx={pos.x} cy={pos.y} r="8" fill={color} opacity="0.15" filter="url(#softGlow)" />
                  {/* Plane */}
                  <g
                    transform={`translate(${pos.x}, ${pos.y}) rotate(${angle})`}
                    filter="url(#glow)"
                    className="cursor-pointer"
                    onClick={() => setSelectedFlight(isSelected ? null : i)}
                  >
                    <polygon points="-6,0 2,-3.5 7,0 2,3.5" fill={color} />
                  </g>
                </g>
              );
            })}

            {/* Airport markers */}
            {airports.map((a) => {
              const isHovered = hoveredAirport === a.code;
              return (
                <g
                  key={a.code}
                  onMouseEnter={() => setHoveredAirport(a.code)}
                  onMouseLeave={() => setHoveredAirport(null)}
                  className="cursor-pointer"
                >
                  {/* Pulse */}
                  <circle cx={a.x} cy={a.y} r="8" fill="none" stroke="hsl(230,76%,30%)" strokeWidth="0.6" opacity="0.3">
                    <animate attributeName="r" values="5;12;5" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
                  </circle>
                  {/* Marker dot */}
                  <circle
                    cx={a.x} cy={a.y}
                    r={isHovered ? "6" : "4.5"}
                    fill="hsl(230,76%,30%)"
                    stroke="hsl(0,0%,100%)"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.2s" }}
                  />
                  {/* Code label */}
                  <text
                    x={a.x + 10} y={a.y + 1}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    fill="hsl(230,60%,10%)"
                  >
                    {a.code}
                  </text>
                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={a.x - 70} y={a.y - 40}
                        width="140" height="28"
                        rx="4"
                        fill="hsl(230,60%,10%)"
                        opacity="0.92"
                      />
                      <text
                        x={a.x} y={a.y - 28}
                        fontSize="7.5"
                        fill="hsl(40,33%,98%)"
                        textAnchor="middle"
                        fontFamily="var(--font-body)"
                        fontWeight="600"
                      >
                        {a.name}
                      </text>
                      <text
                        x={a.x} y={a.y - 18}
                        fontSize="6.5"
                        fill="hsl(30,100%,60%)"
                        textAnchor="middle"
                        fontFamily="var(--font-body)"
                      >
                        {a.city}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Flight List */}
        <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
          <h3 className="text-lg font-display font-bold text-foreground mb-3 flex items-center gap-2 sticky top-0 bg-background py-2 z-10">
            <Plane className="h-4 w-4 text-secondary" /> {flights.length} Active Flights
          </h3>
          {flights.map((f, i) => {
            const statusLabel = f.progress < 15 ? "Departing" : f.progress > 85 ? "Arriving" : "En Route";
            const color = airlineColors[f.airline] || "hsl(30,100%,55%)";
            const isSelected = selectedFlight === i;
            return (
              <div
                key={i}
                className={`bg-card rounded-xl shadow-card p-3 cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-secondary shadow-elevated" : "hover:shadow-elevated"
                }`}
                onClick={() => setSelectedFlight(isSelected ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {f.from} → {f.to}
                      </p>
                      <p className="text-xs text-muted-foreground">{f.airline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-muted-foreground">{Math.round(f.progress)}%</p>
                    <p className="text-[10px] text-muted-foreground">{statusLabel}</p>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${f.progress}%`, background: color }}
                  />
                </div>
              </div>
            );
          })}
          <p className="text-[10px] text-muted-foreground pt-2">Simulated data for demonstration</p>
        </div>
      </div>
    </div>
  );
};

export default Flights;
