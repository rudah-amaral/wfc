import styles from "./GenerateButton.module.scss";

interface GenerateButtonProps {
  isMosaicGenerating: boolean;
  setIsMosaicGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  resetHistory(): void;
}
export default function GenerateButton({
  isMosaicGenerating,
  setIsMosaicGenerating,
  resetHistory,
}: GenerateButtonProps) {
  function handleClick() {
    setIsMosaicGenerating(true);
    resetHistory();
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={isMosaicGenerating}
    >
      Collapse the wave function&#123;&#125;
    </button>
  );
}
