import { Form } from "react-router-dom";
import StatefulInput from "../StatefulInput";
import styles from "./DimensionsButtons.module.scss";

interface DimensionsButtonsProps {
  columns: number;
  rows: number;
  isMosaicGenerating: boolean;
}

export default function DimensionsButtons({
  columns,
  rows,
  isMosaicGenerating,
}: DimensionsButtonsProps) {
  return (
    <Form className={styles.dimensionsButtons}>
      <StatefulInput
        label="columns"
        value={columns}
        minValue={2}
        maxValue={30}
        disabled={isMosaicGenerating}
      />
      <StatefulInput
        label="rows"
        value={rows}
        minValue={2}
        maxValue={30}
        disabled={isMosaicGenerating}
      />
    </Form>
  );
}
