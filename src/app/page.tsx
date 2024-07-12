"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Loading from "./loading";
import { useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";

// https://api.openweathermap.org/data/2.5/forecast?q=havana&appid=1daea76ad85a0e91a469be3e0602c5a1&cnt=10

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ListElement {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust: number };
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: ListElement[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=havana&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=10`
      );
      return data;
    },
  });
  const date = data?.list[0];
  console.log("data", data);
  if (isPending) return <Loading />;
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section>
          <div>
            <h2 className="flex gap1 text-2xl items-end">
              <p>{format(parseISO(date?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(date?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <div></div>
          </div>
        </section>
        {/* 7 days forecast data */}
        <section></section>
      </main>
    </div>
  );
}
