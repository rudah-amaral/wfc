import DimensionsButtons from "@/components/DimensionsButtons";
import GenerateButton from "@/components/GenerateButton";
import { GridStep } from "@/wfc-core";
import styles from "./GeneratorControls.module.scss";

interface GeneratorControlsProps {
  mosaicStatus: "idle" | "generating" | "done" | "no solution";
  setMosaicStatus: React.Dispatch<
    React.SetStateAction<"idle" | "generating" | "done" | "no solution">
  >;
  setHistory: React.Dispatch<React.SetStateAction<GridStep[]>>;
}

export default function GeneratorControls({
  mosaicStatus,
  setMosaicStatus,
  setHistory,
}: GeneratorControlsProps) {
  return (
    <div className={styles.controlsWrapper}>
      <DimensionsButtons disabled={mosaicStatus === "generating"} />
      <GenerateButton
        mosaicStatus={mosaicStatus}
        setMosaicStatus={setMosaicStatus}
        setHistory={setHistory}
      />
    </div>
  );
}
