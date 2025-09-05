import { cn } from '@/public/lib/utils';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: string; // 👈 bisa custom durasi
  gap?: string;      // 👈 bisa custom gap
  [key: string]: any;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "40s", // default
  gap = "1rem",     // default
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ "--duration": duration,
    "--gap": gap,} as React.CSSProperties}
      className={cn(
        "group flex overflow-hidden p-2 gap-[var(--gap)]", // gap tetap jalan
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around gap-[var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
