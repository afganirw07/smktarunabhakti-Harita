import Marquee from "../../magicui/marquee";
import Image from "next/image";

const logos = [
  { src: "/img/Landingpage/DietPlastik.png", alt: "Diet Plastik" },
  { src: "/img/Landingpage/Dlh.png", alt: "DLH" },
  { src: "/img/Landingpage/Jabar.png", alt: "Jabar" },
  { src: "/img/Landingpage/Smash.png", alt: "Smash" },
  { src: "/img/Landingpage/Waste.png", alt: "Waste" },
];

const MarqueeDemo = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-[#FDFAF4]  ">
      <Marquee pauseOnHover className="[--duration:20s] cursor-pointer">
        {logos.map((logo, idx) => (
          <Image
            key={idx}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={120}
            className="object-contain mr-20 hover:scale-125 transition-all duration-300 ease-out"
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#FDFAF4] dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#FDFAF4] dark:from-background"></div>
    </div>
  );
};

export default MarqueeDemo;
