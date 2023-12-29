"use client";
import Map from "react-map-gl/maplibre";
import MapContainer from "@/components/MapContainer";
import AuthFlow from "@/components/AuthFlow";

export default function Home() {
  return (
    <div className="h-full w-full grid grid-cols-12 grid-rows-2">
      <div className="col-span-5 w-full h-full m-auto p-10 flex flex-col justify-center align-center outline-black  ">
        <h1 className=" lg:text-8xl md:text-6xl sm:text-2xl text-center">
          RideSight
        </h1>
        <p className="text-2xl text-gray-600 text-center pt-10">
          It's Time To See What You've Done
        </p>
      </div>
      <AuthFlow />
      <div className="w-full h-full col-span-5 flex flex-col justify-center align-center outline-black ">
        <p className="text-center">Placeholder</p>
      </div>
      <div className="w-full h-full col-span-7 flex flex-col justify-center align-center outline-black ">
        <p className="text-center">Placeholder</p>
      </div>
    </div>
  );
}
