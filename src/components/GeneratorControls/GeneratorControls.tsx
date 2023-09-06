import DimensionsButtons from "../DimensionsButtons";
import GenerateButton from "../GenerateButton";
import styles from "./GeneratorControls.module.scss";

interface GeneratorControlsProps {
  disabled: boolean;
  setMosaicStatus: React.Dispatch<
    React.SetStateAction<"idle" | "generating" | "done" | "no solution">
  >;
  resetHistory(): void;
}

export default function GeneratorControls({
  disabled,
  setMosaicStatus,
  resetHistory,
}: GeneratorControlsProps) {
  return (
    <div className={styles.controlsWrapper}>
      <DimensionsButtons disabled={disabled} />
      <GenerateButton
        disabled={disabled}
        setMosaicStatus={setMosaicStatus}
        resetHistory={resetHistory}
      />
    </div>
  );
}
