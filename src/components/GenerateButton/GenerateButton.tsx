import type { GridStep } from "@/wfc-core";
import styles from "./GenerateButton.module.scss";

interface GenerateButtonProps {
  mosaicStatus: "idle" | "generating" | "done" | "no solution";
  setMosaicStatus: React.Dispatch<
    React.SetStateAction<"idle" | "generating" | "done" | "no solution">
  >;
  setHistory: React.Dispatch<React.SetStateAction<GridStep[]>>;
}
export default function GenerateButton({
  mosaicStatus,
  setMosaicStatus,
  setHistory,
}: GenerateButtonProps) {
  const disabled = mosaicStatus === "generating";

  function generateMosaic() {
    if (disabled) return;

    setMosaicStatus("generating");
    if (mosaicStatus === "done") setHistory((prev) => [prev[0]]);
  }

  return (
    <button
      type="button"
      className={styles.button + `${disabled ? ` ${styles.disabled}` : ""}`}
      onMouseDown={(e) => e.button === 0 && generateMosaic()}
      onKeyDown={(e) => e.key === "Enter" && generateMosaic()}
    >
      Collapse the wave function&#123;&#125;
    </button>
  );
}
