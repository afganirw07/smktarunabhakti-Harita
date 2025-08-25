import { User } from "lucide-react";

const Benefit = ({
  Icon = User,
  Name = "Lorem ipsum",
  Desc = "Lorem Ipsum Domet domet sir alet domet apa aja wpi anadn",
  minWidth = "min-w-[320px]", // default min width
  iconSize = "w-10 h-10", // default icon size
}) => {
  return (
    <div
      className={`max-w-[400px] ${minWidth} bg-white h-auto p-4 rounded-2xl shadow-md flex gap-4`}
    >
      <div className="text-center gap-3">
        {/* ICON */}
        <div className="bg-green-800 md:w-[80px] md:h-[80px] w-[60px] h-[60px] flex items-center justify-center rounded-xl">
          <Icon
            strokeWidth={2}
            stroke="white"
            className={`${iconSize} text-gray-700`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold font-inter text-lg ">{Name}</h1>
        <p className="font-medium text-black/60 text-base">{Desc}</p>
      </div>
    </div>
  );
};

export default Benefit;
