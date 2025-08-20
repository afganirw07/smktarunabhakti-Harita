import Image from 'next/image';

export default function Card({
  image,
  background,
  meshes = [],
  heading,
  desc,
}) {
  return (
    <div className="flex w-[300px] flex-col gap-3">
      <div
        className={`relative h-[340px] w-[300px] overflow-hidden rounded-3xl ${background} shadow-[0_20px_60px_rgba(34,197,94,0.25)]`}
      >
        {meshes.map((mesh, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-60 blur-[100px] ${mesh}`}
          />
        ))}

        <div className="absolute  bottom-0 left-1/2 z-10 h-[200px] w-[300px] -translate-x-1/2">
          {image && (
            <Image src={image} alt={heading} fill className="object-contain" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 px-1">
        <h1 className="font-inter text-[1.4rem] font-bold">{heading}</h1>
        <p>{desc}</p>
      </div>
    </div>
  );
}
