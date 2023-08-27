import { Form } from "react-router-dom";
import StatefulInput from "../StatefulInput";
import styles from "./DimensionsButtons.module.scss";

interface DimensionsButtonsProps {
  columns: number;
  rows: number;
  disabled: boolean;
}

export default function DimensionsButtons({
  columns,
  rows,
  disabled,
}: DimensionsButtonsProps) {
  return (
    <Form className={styles.dimensionsButtons}>
      <StatefulInput
        label="columns"
        value={columns}
        minValue={1}
        maxValue={30}
        disabled={disabled}
      />
      <StatefulInput
        label="rows"
        value={rows}
        minValue={1}
        maxValue={30}
        disabled={disabled}
      />
    </Form>
  );
}
