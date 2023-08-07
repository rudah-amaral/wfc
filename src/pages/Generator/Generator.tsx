import { useState } from "react";
import InputsWrapper from "../../components/InputsWrapper";
import StatefulInput from "../../components/StatefulInput";
import GenerateButton from "../../components/GenerateButton";
import Mosaic, { GridStep } from "../../components/Mosaic";
import tileset from "../../circuit-tileset/tileset";
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";

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
      <Form>
        <InputsWrapper>
          <StatefulInput
            label="columns"
            value={columns}
            minValue={2}
            maxValue={35}
            disabled={isMosaicGenerating}
          />
          <StatefulInput
            label="rows"
            value={rows}
            minValue={2}
            maxValue={25}
            disabled={isMosaicGenerating}
          />
        </InputsWrapper>
      </Form>
      <InputsWrapper>
        <GenerateButton
          isMosaicGenerating={isMosaicGenerating}
          setIsMosaicGenerating={setIsMosaicGenerating}
          resetHistory={resetHistory}
        />
      </InputsWrapper>
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

  return { columns, rows };
}
