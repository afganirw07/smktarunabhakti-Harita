import Image from 'next/image';

export default function Card(image, background, heading, desc) {
    background = 'bg-green-700'
    heading = "Test"
    desc = "lorem ipsum sir aler domet cukup"

  return (
    <>
      <div className="flex flex-col gap-4">
        <div
          className="relative h-[340px] w-[300px] rounded-3xl bg-gradient-to-b from-green-400 via-green-600 
     to-green-800 shadow-[0_20px_60px_rgba(34,197,94,0.35)]"
        >
          <div
            className={`absolute bottom-0 z-10 h-[80%] w-full rounded-full ${background}/10`}
          ></div>
          <div>
            <Image src={image} alt={`${heading}`} />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h1>{heading}</h1>
          <p>{desc}</p>
        </div>
      </div>
    </>
  );
}
