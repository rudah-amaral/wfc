import { useState } from "react";
import InputsWrapper from "../InputsWrapper";
import StatefulInput from "../StatefulInput";
import GenerateButton from "../GenerateButton";
import Mosaic, { GridStep } from "../Mosaic";
import tileset from "../../circuit-tileset/tileset";

function App() {
  const [columns, setColumns] = useState(10);
  const [rows, setRows] = useState(5);
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
      <InputsWrapper>
        <StatefulInput
          label="columns"
          value={columns}
          setValue={setColumns}
          minValue={2}
          maxValue={35}
          disabled={isMosaicGenerating}
        />
        <StatefulInput
          label="rows"
          value={rows}
          setValue={setRows}
          minValue={2}
          maxValue={25}
          disabled={isMosaicGenerating}
        />
      </InputsWrapper>
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

export default App;
