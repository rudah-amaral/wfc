import { useCallback, useMemo, useState } from "react";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import GeneratorControls from "../../components/GeneratorControls";
import Mosaic from "../../components/Mosaic";
import { generateInitialHistory } from "../../wfc-core";

export default function Generator() {
  const { rows, columns } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  type MosaicStatus = "idle" | "generating" | "done";
  const [mosaicStatus, setMosaicStatus] = useState<MosaicStatus>("idle");

  const initialHistory = useMemo(
    () => generateInitialHistory(columns, rows),
    [columns, rows]
  );
  const [history, setHistory] = useState(initialHistory);

  const resetHistory = useCallback(
    () => setHistory(initialHistory),
    [initialHistory]
  );

  return (
    <>
      <GeneratorControls
        disabled={mosaicStatus === "generating"}
        setMosaicStatus={setMosaicStatus}
        resetHistory={resetHistory}
      />
      <Mosaic
        columns={columns}
        rows={rows}
        mosaicStatus={mosaicStatus}
        setMosaicStatus={setMosaicStatus}
        history={history}
        setHistory={setHistory}
        resetHistory={resetHistory}
      />
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const rowsParam = url.searchParams.get("rows");
  const columnsParam = url.searchParams.get("columns");

  if (rowsParam === null || columnsParam === null) {
    throw redirect("?columns=10&rows=5");
  }

  const columns = Number(columnsParam);
  const rows = Number(rowsParam);

  const urlParamsNotInt = !Number.isInteger(columns) || !Number.isInteger(rows);
  const urlParamsOutOfBounds =
    columns > 30 || columns < 1 || rows > 30 || rows < 1;
  if (urlParamsNotInt || urlParamsOutOfBounds) {
    throw new Error("rows and columns should be integers between 2 and 30");
  }

  return { columns, rows };
}
