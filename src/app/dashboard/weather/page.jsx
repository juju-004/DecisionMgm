"use client";

import React from "react";
import PageContainer from "@/components/layout/page-container";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

function Page() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: city },
      headers: {
        "x-rapidapi-key": "cb4be639dcmsh1dfcff3554357ddp1daf59jsneeb2f06ca8af",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    };

    setLoading(true);
    try {
      const { data } = await axios.request(options);

      if (data.current) {
        const options2 = {
          method: "POST",
          url: "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions",
          headers: {
            "x-rapidapi-key":
              "cb4be639dcmsh1dfcff3554357ddp1daf59jsneeb2f06ca8af",
            "x-rapidapi-host":
              "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          data: {
            messages: [
              {
                role: "system",
                content:
                  "You are a weather adviser on how to stay safe given the weather condition. Keep your responses brief and avoid listing",
              },
              {
                role: "user",
                content: data.current.condition.text,
              },
            ],
            model: "gpt-4o",
            max_tokens: 100,
            temperature: 0.9,
          },
        };

        const req = await axios.request(options2);
        setLoading(false);
        setWeather({
          dir: data.current.wind_dir,
          hum: data.current.humidity,
          loc: data.location.tz_id,
          src: `https:${data.current.condition.icon}`,
          text: data.current.condition.text,
          des: req.data.choices[0].message.content,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <PageContainer scrollable>
      <div className="flex justify-center relative w-full">
        <form
          className="absolute dark:bg-transparent dark:backdrop-blur-xl bg-white top-3 left-1/2 -translate-x-1/2 shadow-lg  flex gap-2 items-center py-1 px-1.5 max-w-xl w-full rounded-3xl"
          onSubmit={getWeather}
        >
          <Input
            placeholder="Search a City..."
            autoFocus
            className="rounded-2xl font-bold"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <Button
            disabled={loading}
            className="py-5 disabled:opacity-60 hover:border-0 active:scale-75 hover:opacity-80 opacity-100 scale-100 duration-150 px-4 fx gap-1 rounded-[20px]"
          >
            Submit
          </Button>
        </form>
      </div>
      <Separator />
      <div className="max-w-[700px] mx-auto">
        <div className="mt-24 mx-4 ">
          {loading ? (
            <div className="w-full fx h-24">
              <div class="loader"></div>
            </div>
          ) : weather ? (
            <div className="flex flex-col items-start">
              <span className="ml-3 opacity-50 font-bold">
                {weather.loc.split("/")[0]}/{city}
              </span>
              <div className="flex items-center gap-3">
                <Image
                  width={64}
                  height={64}
                  alt={weather.text}
                  src={weather.src}
                />
                <h2 className="text-xl font-bold">{weather.text}</h2>
              </div>
              <span className="opacity-50 mt-5 ml-3">Wind</span>
              <p className="ml-3 font-bold mt-2">
                Direction{" "}
                <span className="py-0.5 px-2 rounded-lg bg-black/10">
                  {weather.dir}
                </span>
              </p>
              <p className="ml-3 mt-2 font-bold">
                Humidty{" "}
                <span className="py-0.5 px-2 rounded-lg bg-black/10">
                  {weather.hum}%
                </span>
              </p>
              <span className="opacity-50 mt-5 ml-3">Ai Forecast</span>
              <p className="ml-3 mt-2">{weather.des}</p>
            </div>
          ) : (
            <div className="w-full fx h-24 opacity-50">No weather to show</div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default Page;
