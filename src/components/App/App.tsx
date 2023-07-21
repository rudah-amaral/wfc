import { useState } from "react";
import InputsWrapper from "../InputsWrapper";
import Mosaic from "../Mosaic";
import StatefulInput from "../StatefulInput";

function App() {
  const [columns, setColumns] = useState(10);
  const [rows, setRows] = useState(5);

  return (
    <>
      <InputsWrapper>
        <StatefulInput
          label="columns"
          value={columns}
          setValue={setColumns}
          minValue={2}
          maxValue={35}
        />
        <StatefulInput
          label="rows"
          value={rows}
          setValue={setRows}
          minValue={2}
          maxValue={25}
        />
      </InputsWrapper>
      <Mosaic cols={columns} rows={rows} />
    </>
  );
}

export default App;
