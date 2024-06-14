"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import { IAutoValoresHM } from "@/types";
import { useFilterFromUrl } from "@/hooks";
import { useMeteorologicalContext } from "@/providers/meteorologicalProvider";

const tableHeaders = [
  "#",
  "Temperatura",
  "Humedad relativa",
  "Radiación",
  "Dirección del viento",
  "Velocidad del viento",
  "Precipitación acumulada",
];
function filterByStation(data: IAutoValoresHM[], id_station: string) {
  if (id_station === "") return data;
  return data.filter((item) => item.EstacionId.toString() === id_station);
}

export const MeteorologicalTable = () => {
  const { data } = useMeteorologicalContext();
  const { getParams } = useFilterFromUrl();

  const id_station = getParams("estacion", "");
  const dataFiltered = filterByStation(data?.AutoValoresHM || [], id_station);

  return (
    <>
      <ScrollArea className="h-full w-full rounded-md border p-4">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="sticky top-0">
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead key={header} className="font-medium">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white divide-y divide-gray-200">
            {dataFiltered.map((invoice, index) => (
              <TableRow key={invoice.EstacionId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {invoice.AutoTemp}
                </TableCell>
                <TableCell>{invoice.AutoHR}</TableCell>
                <TableCell>{invoice.AutoRadiacion}</TableCell>
                <TableCell className="text-right">
                  {invoice.AutoWindDir}
                </TableCell>
                <TableCell className="text-right">
                  {invoice.AutoWindVel}
                </TableCell>
                <TableCell className="text-right">
                  {invoice.AutoPP}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            {/* <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow> */}
          </TableFooter>
        </Table>
      </ScrollArea>
    </>
  );
};
