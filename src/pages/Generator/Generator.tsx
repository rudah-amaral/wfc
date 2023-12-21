import { useLayoutEffect, useState } from "react";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import GeneratorControls from "@/components/GeneratorControls";
import Mosaic from "@/components/Mosaic";
import { getInitialHistory } from "@/wfc-core";
import { getTileset } from "@/tilesets";
import type { Tile } from "@/tilesets";
import styles from "./Generator.module.scss";

export type ReturnOfGeneratorLoader = Awaited<ReturnType<typeof loader>>;

export function Generator() {
  const { rows, columns, initialHistory } =
    useLoaderData() as ReturnOfGeneratorLoader;
  document.documentElement.style.setProperty("--rows", rows.toString());
  document.documentElement.style.setProperty("--columns", columns.toString());
  type MosaicStatus = "idle" | "generating" | "done" | "no solution";
  const [mosaicStatus, setMosaicStatus] = useState<MosaicStatus>("idle");

  const [history, setHistory] = useState(initialHistory);

  useLayoutEffect(() => {
    setMosaicStatus("idle");
    setHistory(initialHistory);
  }, [initialHistory]);

  return (
    <div className={styles.container}>
      <GeneratorControls
        mosaicStatus={mosaicStatus}
        setMosaicStatus={setMosaicStatus}
        setHistory={setHistory}
      />
      <Mosaic
        mosaicStatus={mosaicStatus}
        setMosaicStatus={setMosaicStatus}
        history={history}
        setHistory={setHistory}
      />
    </div>
  );
}

const tileset: Record<string, Tile[]> = {};
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const rowsParam = url.searchParams.get("rows");
  const columnsParam = url.searchParams.get("columns");
  const tilesetName = url.searchParams.get("tileset");

  if (rowsParam === null || columnsParam === null || tilesetName === null) {
    throw redirect("?tileset=circuit&columns=10&rows=5");
  }

  const columns = Number(columnsParam);
  const rows = Number(rowsParam);

  const urlParamsNotInt = !Number.isInteger(columns) || !Number.isInteger(rows);
  const urlParamsOutOfBounds =
    columns > 30 || columns < 1 || rows > 30 || rows < 1;
  if (urlParamsNotInt || urlParamsOutOfBounds) {
    throw new Error("rows and columns should be integers between 1 and 30");
  }

  if (!tileset[tilesetName]) {
    tileset[tilesetName] = await getTileset(tilesetName);
  }
  const initialHistory = getInitialHistory(columns, rows, tileset[tilesetName]);

  return { columns, rows, initialHistory };
}
