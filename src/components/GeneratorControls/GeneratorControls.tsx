import GenerateButton from "../../components/GenerateButton";
import styles from "./GeneratorControls.module.scss";
import DimensionsButtons from "../DimensionsButtons/DimensionsButtons";

interface GeneratorControlsProps {
  columns: number;
  rows: number;
  disabled: boolean;
  setMosaicStatus: React.Dispatch<
    React.SetStateAction<"idle" | "generating" | "done">
  >;
  resetHistory(): void;
}

export default function GeneratorControls({
  columns,
  rows,
  disabled,
  setMosaicStatus,
  resetHistory,
}: GeneratorControlsProps) {
  return (
    <div className={styles.controlsWrapper}>
      <DimensionsButtons columns={columns} rows={rows} disabled={disabled} />
      <GenerateButton
        disabled={disabled}
        setMosaicStatus={setMosaicStatus}
        resetHistory={resetHistory}
      />
    </div>
  );
}
