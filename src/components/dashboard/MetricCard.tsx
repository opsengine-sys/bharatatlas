import { ReactNode, useEffect, useState, useRef } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  variant?: "default" | "saffron" | "emerald" | "primary";
  animateValue?: boolean;
  delay?: number;
}

function useCountUp(target: string, shouldAnimate: boolean, duration = 1400) {
  const [display, setDisplay] = useState(shouldAnimate ? "" : target);
  const started = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || started.current) return;
    started.current = true;

    const match = target.match(/^([^0-9]*)([0-9.]+)(.*)$/);
    if (!match) { setDisplay(target); return; }

    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3];
    const targetNum = parseFloat(numStr);
    const decimalPlaces = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;
      setDisplay(`${prefix}${current.toFixed(decimalPlaces)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(target);
    };

    setTimeout(() => requestAnimationFrame(step), 600);
  }, [target, shouldAnimate, duration]);

  return display || target;
}

const MetricCard = ({ title, value, subtitle, icon, variant = "default", animateValue, delay = 0 }: MetricCardProps) => {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const displayValue = useCountUp(value, !!animateValue);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  const isLight = variant !== "default";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-xl p-5 overflow-hidden transition-all duration-500 ease-out cursor-default
        ${isLight ? "text-primary-foreground" : "bg-card"}
        ${show ? "animate-fade-in-up" : "opacity-0 translate-y-4"}
      `}
      style={{
        animationDelay: `${delay}ms`,
        transform: isHovered ? "translateY(-6px) scale(1.02)" : undefined,
      }}
    >
      {/* Gradient background for colored variants */}
      {variant === "saffron" && (
        <div className="absolute inset-0 gradient-saffron" />
      )}
      {variant === "primary" && (
        <div className="absolute inset-0 gradient-hero" />
      )}
      {variant === "emerald" && (
        <div className="absolute inset-0 gradient-emerald" />
      )}

      {/* Animated gradient shadow underneath */}
      <div
        className={`absolute -inset-1 rounded-xl blur-xl transition-opacity duration-500 -z-10 ${
          isHovered ? "opacity-100" : "opacity-60"
        }`}
        style={{
          background:
            variant === "saffron"
              ? "linear-gradient(135deg, hsl(30 100% 60% / 0.5), hsl(20 100% 50% / 0.3))"
              : variant === "primary"
              ? "linear-gradient(135deg, hsl(230 76% 30% / 0.5), hsl(250 60% 40% / 0.3))"
              : variant === "emerald"
              ? "linear-gradient(135deg, hsl(145 50% 34% / 0.5), hsl(160 60% 30% / 0.3))"
              : "linear-gradient(135deg, hsl(220 20% 80% / 0.3), hsl(220 20% 90% / 0.2))",
        }}
      />

      {/* Shimmer effect on hover */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: isLight
            ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)"
            : "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider ${isLight ? "opacity-80" : "text-muted-foreground"}`}>
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold font-display tabular-nums">
            {animateValue ? displayValue : value}
          </p>
          {subtitle && (
            <p className={`mt-1 text-xs ${isLight ? "opacity-70" : "text-muted-foreground"}`}>{subtitle}</p>
          )}
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${
            isLight ? "bg-white/20" : "bg-muted"
          } ${isHovered ? "scale-110 rotate-3" : ""}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
