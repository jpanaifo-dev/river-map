"use client";

import { IAutoValoresHM } from "@/types";
import { MainLineChart } from "./MainLineChart";

interface IProps {
  data?: IAutoValoresHM[];
}

const transformData = (data: IAutoValoresHM[]) => {
  return data.map((entry) => ({
    date: entry.AutoFechaHora.split(" ")[0], // Obtener solo la fecha
    temperature: entry.AutoTemp,
    humidity: entry.AutoHR,
    radiation: entry.AutoRadiacion,
    windDirection: entry.AutoWindDir,
    windSpeed: entry.AutoWindVel,
    precipitation: entry.AutoPP,
  }));
};

const dataFormatter = (number: number) =>
  `:  ${Intl.NumberFormat("es").format(number).toString()}`;

export const WeatherChart = (props: IProps) => {
  const { data } = props;

  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Weather data
      </h3>

      <MainLineChart
        categories={[
          "temperature",
          "humidity",
          "radiation",
          "windDirection",
          "windSpeed",
          "precipitation",
        ]}
        colors={[
          "red-700",
          "red-400",
          "yellow",
          "green-800",
          "green-400",
          "blue-400",
        ]}
        data={transformData(data!)}
        subtitle="Weather data"
        valueFormatter={dataFormatter}
      />
    </>
  );
};
