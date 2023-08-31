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
  function handleClick() {
    if (disabled) return;
    setMosaicStatus("generating");
    resetHistory();
  }

  return (
    <button
      type="button"
      className={styles.button + `${disabled ? ` ${styles.disabled}` : ""}`}
      onClick={handleClick}
    >
      Collapse the wave function&#123;&#125;
    </button>
  );
}
