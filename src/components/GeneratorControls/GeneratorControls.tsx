import GenerateButton from "../../components/GenerateButton";
import styles from "./GeneratorControls.module.scss";
import DimensionsButtons from "../DimensionsButtons/DimensionsButtons";

interface GeneratorControlsProps {
  columns: number;
  rows: number;
  isMosaicGenerating: boolean;
  setIsMosaicGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  resetHistory(): void;
}

export default function GeneratorControls({
  columns,
  rows,
  isMosaicGenerating,
  setIsMosaicGenerating,
  resetHistory,
}: GeneratorControlsProps) {
  return (
    <div className={styles.controlsWrapper}>
      <DimensionsButtons
        columns={columns}
        rows={rows}
        isMosaicGenerating={isMosaicGenerating}
      />
      <GenerateButton
        isMosaicGenerating={isMosaicGenerating}
        setIsMosaicGenerating={setIsMosaicGenerating}
        resetHistory={resetHistory}
      />
    </div>
  );
}
