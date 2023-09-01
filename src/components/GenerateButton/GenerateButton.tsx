import styles from "./GenerateButton.module.scss";

interface GenerateButtonProps {
  disabled: boolean;
  setMosaicStatus: React.Dispatch<
    React.SetStateAction<"idle" | "generating" | "done">
  >;
  resetHistory(): void;
}
export default function GenerateButton({
  disabled,
  setMosaicStatus,
  resetHistory,
}: GenerateButtonProps) {
  function generateMosaic() {
    if (disabled) return;
    setMosaicStatus("generating");
    resetHistory();
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
