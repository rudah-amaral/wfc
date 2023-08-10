import { useState } from "react";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import GeneratorControls from "../../components/GeneratorControls";
import Mosaic, { GridStep } from "../../components/Mosaic";
import tileset from "../../circuit-tileset/tileset";

export default function Generator() {
  const { rows, columns } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const [isMosaicGenerating, setIsMosaicGenerating] = useState(false);

  const gridOptions = Array(columns * rows)
    .fill(null)
    .map(() => [...tileset]);
  const initialHistory: GridStep[] = [
    {
      grid: gridOptions,
      collapsedCell: null,
    },
  ];
  let [history, setHistory] = useState(initialHistory);

  function resetHistory() {
    setHistory(initialHistory);
  }

  return (
    <>
      <GeneratorControls
        columns={columns}
        rows={rows}
        isMosaicGenerating={isMosaicGenerating}
        setIsMosaicGenerating={setIsMosaicGenerating}
        resetHistory={resetHistory}
      />
      <Mosaic
        columns={columns}
        rows={rows}
        isMosaicGenerating={isMosaicGenerating}
        setIsMosaicGenerating={setIsMosaicGenerating}
        history={history}
        setHistory={setHistory}
        resetHistory={resetHistory}
      />
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  let rowsParam = url.searchParams.get("rows");
  let columnsParam = url.searchParams.get("columns");

  if (rowsParam === null || columnsParam === null) {
    throw redirect("?columns=10&rows=5");
  }

  const columns = Number(columnsParam);
  const rows = Number(rowsParam);

  const urlParamsNotInt = !Number.isInteger(columns) || !Number.isInteger(rows);
  const urlParamsOutOfBounds =
    columns > 30 || columns < 2 || rows > 30 || rows < 2;
  if (urlParamsNotInt || urlParamsOutOfBounds) {
    throw new Error("rows and columns should be integers between 2 and 30");
  }

  return { columns, rows };
}
