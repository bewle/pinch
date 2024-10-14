import Image from "next/image";
import React from "react";

interface IPhoneMockupProps {
  imageUrl: string;
}

const IPhoneMockup: React.FC<IPhoneMockupProps> = ({ imageUrl }) => {
  return (
    <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[50px] bg-black shadow-xl">
      {/* Notch */}
      <div className="absolute left-1/2 top-0 z-20 h-[30px] w-[150px] -translate-x-1/2 transform rounded-b-[20px] bg-black"></div>

      {/* Screen */}
      <div className="absolute inset-[10px] overflow-hidden rounded-[40px]">
        <Image
          src={imageUrl}
          width={300}
          height={600}
          alt="Lockscreen Wallpaper"
          className="h-full w-full object-cover"
        />

        {/* Time */}
        <div className="absolute left-0 right-0 top-14 text-center text-6xl font-semibold text-white">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>

        {/* Date */}
        <div className="absolute left-0 right-0 top-32 text-center text-lg text-white">
          {new Date().toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* Bottom Icons */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-6">
          <div className="h-12 w-12 rounded-full bg-gray-600 bg-opacity-50"></div>
          <div className="h-12 w-12 rounded-full bg-gray-600 bg-opacity-50"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="absolute -left-1 top-[120px] h-12 w-1 rounded-l bg-gray-400"></div>
      <div className="absolute -left-1 top-[180px] h-16 w-1 rounded-l bg-gray-400"></div>
      <div className="absolute -right-1 top-[120px] h-16 w-1 rounded-r bg-gray-400"></div>
    </div>
  );
};

export default IPhoneMockup;
