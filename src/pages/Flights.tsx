// Flights page with live global flight tracking
import { Plane, Info, ExternalLink, RefreshCw, Navigation } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// India Bounding Box (used for demo fallback and map bounds)
const INDIA_BOUNDS = {
  lamin: 6.5,
  lomin: 68.1,
  lamax: 35.5,
  lomax: 97.4,
};

// Demo flights – fallback when live API is unavailable
const DEMO_FLIGHTS: FlightData[] = [
  // (demo flight data omitted for brevity – keep original array content)
];

interface FlightData {
  icao24: string;
  callsign: string;
  origin_country: string;
  longitude: number;
  latitude: number;
  altitude: number;
  velocity: number;
  heading: number;
  on_ground: boolean;
  airline: string;
  last_contact: number;
}

// ICAO callsign → airline lookup
const AIRLINE_LOOKUP: Record<string, string> = {
  // Indian airlines
  "AIC": "Air India",
  "IGO": "IndiGo",
  "SEJ": "SpiceJet",
  "VTI": "Vistara",
  "AXB": "Air India Express",
  "AKR": "Akasa Air",
  "LLR": "Alliance Air",
  "GOW": "Go First",
  "IAD": "AirAsia India",
  // Gulf / Middle East
  "UAE": "Emirates",
  "QTR": "Qatar Airways",
  "ETD": "Etihad Airways",
  "FDB": "flydubai",
  "GFA": "Gulf Air",
  "OMA": "Oman Air",
  "KAC": "Kuwait Airways",
  // European
  "BAW": "British Airways",
  "DLH": "Lufthansa",
  "AFR": "Air France",
  "KLM": "KLM",
  // Asian
  "SIA": "Singapore Airlines",
  "CPA": "Cathay Pacific",
  "MAS": "Malaysia Airlines",
  // American / Canadian
  "UAL": "United Airlines",
  "AAL": "American Airlines",
  "DAL": "Delta Air Lines",
  // African
  "ETH": "Ethiopian Airlines",
  // Cargo
  "FDX": "FedEx",
};

const getAirlineFromCallsign = (callsign: string) => {
  const clean = callsign.trim().toUpperCase();
  return (
    AIRLINE_LOOKUP[clean.substring(0, 3)] ||
    AIRLINE_LOOKUP[clean.substring(0, 2)] ||
    "Commercial Flight"
  );
};

const getAirlineColor = (airline: string) => {
  if (airline.includes("Air India")) return "hsl(30, 100%, 55%)";
  if (airline.includes("IndiGo")) return "hsl(220, 80%, 50%)";
  if (airline.includes("SpiceJet")) return "hsl(0, 80%, 55%)";
  if (airline.includes("Vistara")) return "hsl(270, 60%, 50%)";
  if (airline.includes("Akasa")) return "hsl(45, 100%, 50%)";
  if (airline.includes("Emirates")) return "hsl(148, 70%, 40%)";
  if (airline.includes("Qatar")) return "hsl(345, 65%, 35%)";
  if (airline.includes("Etihad")) return "hsl(200, 80%, 40%)";
  if (airline.includes("British Airways")) return "hsl(225, 80%, 40%)";
  if (airline.includes("Lufthansa")) return "hsl(50, 100%, 45%)";
  if (airline.includes("Air France")) return "hsl(215, 90%, 50%)";
  if (airline.includes("Singapore Airlines")) return "hsl(0, 70%, 50%)";
  if (airline.includes("Cathay")) return "hsl(185, 60%, 40%)";
  if (airline.includes("Thai Airways")) return "hsl(280, 55%, 45%)";
  if (airline.includes("United")) return "hsl(210, 75%, 35%)";
  if (airline.includes("American Airlines")) return "hsl(355, 75%, 45%)";
  if (airline.includes("Delta")) return "hsl(225, 65%, 40%)";
  if (airline.includes("Ethiopian")) return "hsl(120, 55%, 35%)";
  if (airline.includes("Gulf Air")) return "hsl(200, 60%, 45%)";
  if (airline.includes("flydubai")) return "hsl(15, 90%, 50%)";
  return "hsl(230, 40%, 55%)";
};

const FlightMarkers = ({ flights, selectedFlight, setSelectedFlight, createPlaneIcon, mapCenterRef }: any) => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  const [bounds, setBounds] = useState(map.getBounds());

  useEffect(() => {
    const updateMapState = () => {
      setZoom(map.getZoom());
      setBounds(map.getBounds());
      if (mapCenterRef) {
        const center = map.getCenter();
        mapCenterRef.current = { lat: center.lat, lng: center.lng };
      }
    };

    let timeout: NodeJS.Timeout;
    const throttledUpdate = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateMapState, 100);
    };

    map.on('move', throttledUpdate);
    map.on('zoom', throttledUpdate);
    return () => {
      map.off('move', throttledUpdate);
      map.off('zoom', throttledUpdate);
      clearTimeout(timeout);
    };
  }, [map]);

  const isDetailedZoom = zoom >= 6;

  const visibleFlights = flights.filter((f: any) => {
    let lng = f.longitude;
    const centerLng = bounds.getCenter().lng;

    while (lng < centerLng - 180) lng += 360;
    while (lng > centerLng + 180) lng -= 360;

    return bounds.contains([f.latitude, lng]);
  });

  return (
    <>
      {visibleFlights.map((flight: any) => {
        if (!isDetailedZoom && selectedFlight?.icao24 !== flight.icao24) {
          return (
            <CircleMarker
              key={flight.icao24}
              center={[flight.latitude, flight.longitude]}
              radius={2}
              color={getAirlineColor(flight.airline)}
              fillOpacity={0.8}
              stroke={false}
              eventHandlers={{ click: () => setSelectedFlight(flight) }}
            >
              <Popup className="flight-popup">
                <div className="p-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold">{flight.callsign}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-secondary/10 text-secondary rounded font-mono">{flight.icao24.toUpperCase()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">{flight.airline}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        }

        return (
          <Marker
            key={flight.icao24}
            position={[flight.latitude, flight.longitude]}
            icon={createPlaneIcon(flight)}
            eventHandlers={{ click: () => setSelectedFlight(flight) }}
          >
            <Popup className="flight-popup">
              <div className="p-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold">{flight.callsign}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-secondary/10 text-secondary rounded font-mono">{flight.icao24.toUpperCase()}</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-2">{flight.airline}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  <div className="flex items-center gap-1"><Navigation className="h-3 w-3 rotate-[-45deg]" /><span>{flight.heading}°</span></div>
                  <div className="text-right">{flight.altitude ? `${Math.round(flight.altitude)}m` : 'N/A'}</div>
                  <div className="font-medium">{flight.velocity} km/h</div>
                  <div className="text-right text-muted-foreground">{flight.origin_country}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

const Flights = () => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);
  const [usingDemo, setUsingDemo] = useState(false);
  const mapCenterRef = useRef<{ lat: number; lng: number }>({ lat: 20.5937, lng: 78.9629 });

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    try {
      const { lat, lng } = mapCenterRef.current;
      const response = await fetch(`https://api.adsb.lol/v2/lat/${lat}/lon/${lng}/dist/1500`, { signal: AbortSignal.timeout(15000) });

      if (response.ok) {
        const data = await response.json();
        if (data.ac) {
          const mapped: FlightData[] = data.ac.map((ac: any) => ({
            icao24: ac.hex,
            callsign: (ac.flight || "N/A").trim(),
            origin_country: "Unknown",
            longitude: ac.lon,
            latitude: ac.lat,
            altitude: (ac.alt_baro || ac.alt_geom || 0) * 0.3048,
            velocity: Math.round((ac.gs || 0) * 1.852),
            heading: ac.track || ac.true_heading || 0,
            on_ground: ac.alt_baro === "ground",
            airline: getAirlineFromCallsign(ac.flight || ""),
            last_contact: ac.seen || Date.now() / 1000,
          })).filter((f: FlightData) => f.latitude && f.longitude);

          setFlights(mapped);
          setLastUpdate(new Date());
          setError(null);
          setUsingDemo(false);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("ADSB.lol fetch failed:", err);
    }

    console.warn("API failed. Using demo data.");
    setFlights(DEMO_FLIGHTS.map(f => ({ ...f })));
    setLastUpdate(new Date());
    setError("Live API unavailable — showing animated demo data.");
    setUsingDemo(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFlights();
    if (autoRefresh) {
      refreshInterval.current = setInterval(fetchFlights, 30000);
    } else if (refreshInterval.current) {
      clearInterval(refreshInterval.current);
    }
    return () => { if (refreshInterval.current) clearInterval(refreshInterval.current); };
  }, [fetchFlights, autoRefresh]);

  const animateDemoFlights = useCallback(() => {
    setFlights(prev =>
      prev.map(f => {
        const rad = (f.heading * Math.PI) / 180;
        const newLat = f.latitude + Math.cos(rad) * 0.008;
        const newLon = f.longitude + Math.sin(rad) * 0.008;
        return { ...f, latitude: newLat, longitude: newLon };
      })
    );
  }, []);

  useEffect(() => {
    if (!usingDemo) return;
    const timer = setInterval(animateDemoFlights, 1500);
    return () => clearInterval(timer);
  }, [usingDemo, animateDemoFlights]);

  const createPlaneIcon = (flight: FlightData) => {
    const color = getAirlineColor(flight.airline);
    const isSelected = selectedFlight?.icao24 === flight.icao24;
    return L.divIcon({
      className: "custom-plane-icon",
      html: `
        <div style="transform: rotate(${flight.heading - 45}deg); transition: all 0.5s ease;">
          <svg width="${isSelected ? 32 : 24}" height="${isSelected ? 32 : 24}" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>
        ${isSelected ? `<div class="absolute -inset-2 rounded-full bg-secondary/20 animate-ping"></div>` : ''}
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const mapCenter: [number, number] = [20.5937, 78.9629];

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 flex flex-col h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Live Air Traffic</p>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            Real-Time Global Simulator
            {loading && <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />}
          </h1>
          <p className="mt-2 text-muted-foreground">Live ADS-B data from ADSB.lol showing active flights.</p>
        </div>
        <div className="flex items-center gap-4 bg-card p-2 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 px-2">
            <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-500 animate-pulse' : 'bg-muted'}`} />
            <span className="text-xs font-medium">Auto-refresh</span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`w-10 h-5 rounded-full transition-colors relative ${autoRefresh ? 'bg-secondary' : 'bg-muted'}`}
            >
              <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${autoRefresh ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          <div className="h-8 w-[1px] bg-border" />
          <div className="text-right px-2">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Last Update</p>
            <p className="text-xs font-mono">{lastUpdate.toLocaleTimeString()}</p>
          </div>
          <button
            onClick={fetchFlights}
            disabled={loading}
            className="p-2 hover:bg-muted rounded-md transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm flex items-center gap-3">
          <Info className="h-5 w-5 shrink-0" />
          <p>{error}</p>
          <button onClick={fetchFlights} className="ml-auto underline font-medium">Retry</button>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Map */}
        <div className="lg:col-span-3 bg-card rounded-2xl shadow-card overflow-hidden relative border min-h-[400px]">
          <MapContainer center={mapCenter} zoom={5} preferCanvas={true} className="w-full h-full z-0" style={{ background: '#f8f9fa' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <FlightMarkers
              flights={flights}
              selectedFlight={selectedFlight}
              setSelectedFlight={setSelectedFlight}
              createPlaneIcon={createPlaneIcon}
              mapCenterRef={mapCenterRef}
            />
          </MapContainer>
          {/* Legend */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            {usingDemo && (
              <div className="bg-amber-50 border border-amber-300 rounded-lg px-2 py-1.5 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span className="text-[10px] font-bold text-amber-700">Demo Mode</span>
              </div>
            )}
            <div className="bg-card/90 backdrop-blur shadow-card rounded-lg p-2 border flex flex-col gap-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase px-1">Airlines</p>
              {[
                { name: "Air India", color: "hsl(30, 100%, 55%)" },
                { name: "IndiGo", color: "hsl(220, 80%, 50%)" },
                { name: "SpiceJet", color: "hsl(0, 80%, 55%)" },
                { name: "Emirates", color: "hsl(148, 70%, 40%)" },
                { name: "Qatar Airways", color: "hsl(345, 65%, 35%)" },
                { name: "British Airways", color: "hsl(225, 80%, 40%)" },
                { name: "Singapore Airlines", color: "hsl(0, 70%, 50%)" },
                { name: "Other / Cargo", color: "hsl(230, 40%, 55%)" },
              ].map(item => (
                <div key={item.name} className="flex items-center gap-2 px-1">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="text-[10px] whitespace-nowrap">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="bg-card rounded-xl border shadow-sm p-4">
            <h3 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
              <Plane className="h-4 w-4 text-secondary" />
              {flights.length} Flights
            </h3>
            <p className="text-xs text-muted-foreground">Worldwide flights</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-3 flex gap-3 text-[10px] text-blue-800 dark:text-blue-300">
            <Info className="h-3 w-3 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Coverage Note:</strong> Flight data is provided by the free, crowdsourced ADSB.lol API. Missing flights in some regions are due to a lack of volunteer-hosted radio receivers in those physical areas.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {selectedFlight && (
              <div className="bg-card rounded-xl border-2 border-secondary shadow-elevated overflow-hidden animate-fade-in-up">
                <div className="bg-secondary p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-80">Callsign</p>
                      <h2 className="text-2xl font-display font-bold">{selectedFlight.callsign}</h2>
                    </div>
                    <button onClick={() => setSelectedFlight(null)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                      <Info className="h-4 w-4 rotate-180" />
                    </button>
                  </div>
                  <p className="text-sm font-medium opacity-90 mt-1">{selectedFlight.airline}</p>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Altitude</p>
                      <p className="text-sm font-mono font-bold">{selectedFlight.altitude ? `${Math.round(selectedFlight.altitude)} m` : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Speed</p>
                      <p className="text-sm font-mono font-bold">{selectedFlight.velocity} km/h</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Heading</p>
                      <p className="text-sm font-mono font-bold">{selectedFlight.heading}°</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Country</p>
                      <p className="text-sm font-semibold truncate">{selectedFlight.origin_country}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">ICAO24 ID</p>
                    <p className="text-xs font-mono bg-muted p-1.5 rounded">{selectedFlight.icao24}</p>
                  </div>
                  <a
                    href={`https://www.flightradar24.com/data/aircraft/${selectedFlight.icao24}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-muted hover:bg-secondary/10 hover:text-secondary transition-all rounded-lg text-xs font-bold"
                  >
                    View on FlightRadar24 <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {flights.length === 0 && !loading && (
              <div className="text-center py-12 px-4 bg-muted/30 rounded-xl border border-dashed">
                <Plane className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-20" />
                <p className="text-sm text-muted-foreground">No flights detected in the selected area.</p>
              </div>
            )}

            {flights.sort((a, b) => a.callsign.localeCompare(b.callsign)).map(f => (
              <div
                key={f.icao24}
                onClick={() => setSelectedFlight(f)}
                className={`group bg-card rounded-xl p-3 border shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-secondary/50 ${selectedFlight?.icao24 === f.icao24 ? 'ring-2 ring-secondary border-transparent' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 rounded-full" style={{ background: getAirlineColor(f.airline) }} />
                    <div>
                      <h4 className="text-sm font-bold group-hover:text-secondary transition-colors">{f.callsign}</h4>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">{f.airline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-mono font-bold">{f.velocity} km/h</p>
                    <p className="text-[10px] text-muted-foreground">{Math.round(f.altitude)}m</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`rounded-xl border p-3 flex items-center gap-3 text-[10px] italic ${usingDemo ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-card text-muted-foreground'}`}>
            <Info className="h-3 w-3 shrink-0" />
            <p>{usingDemo ? 'Live API unavailable — showing animated demo data. Planes move in real-time.' : 'Live ADS-B data via ADSB.lol API. Refreshes every 30s. Fetches 1500nm radius from map center.'}</p>
          </div>
        </div>
      </div>

      <style>{`
        .flight-popup .leaflet-popup-content-wrapper { border-radius: 12px; padding: 0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
        .flight-popup .leaflet-popup-content { margin: 12px; min-width: 160px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--muted)); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground)); }
      `}</style>
    </div>
  );
};

export default Flights;
