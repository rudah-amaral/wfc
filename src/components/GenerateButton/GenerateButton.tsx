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
    setMosaicStatus("generating");
    resetHistory();
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={disabled}
    >
      Collapse the wave function&#123;&#125;
    </button>
  );
}
