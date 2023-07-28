import { useEffect, useRef } from "react";
import styles from "./StatefulInput.module.scss";

interface StatefulInputProps {
  value: number;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  minValue: number;
  maxValue: number;
  disabled: boolean;
}

export default function StatefulInput(props: StatefulInputProps) {
  const { maxValue, minValue, disabled } = props;
  const intervalRef = useRef<null | number>(null);

  useEffect(() => {
    return () => stopIncrementing();
  }, []);

  function increment(incrementer: number) {
    props.setValue((value) => {
      const nextValue = value + incrementer;
      if (nextValue > maxValue || nextValue < minValue) return value;
      return nextValue;
    });
  }

  function startIncrementing(incrementer: number) {
    if (intervalRef.current) return;

    increment(incrementer);
    intervalRef.current = setInterval(() => increment(incrementer), 100);
  }

  function stopIncrementing() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  window.addEventListener("mouseup", stopIncrementing);
  window.addEventListener("touchend", stopIncrementing);
  window.addEventListener("touchcancel", stopIncrementing);

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.valueWrapper}>
        <span>
          {props.value} {props.label}
        </span>
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          type="button"
          onMouseDown={() => startIncrementing(1)}
          onTouchStart={() => startIncrementing(1)}
          onContextMenu={(e) => e.preventDefault()}
          className={`${styles.button} ${styles.plusButton}`}
          disabled={disabled}
        >
          +
        </button>
        <button
          type="button"
          onMouseDown={() => startIncrementing(-1)}
          onTouchStart={() => startIncrementing(-1)}
          onContextMenu={(e) => e.preventDefault()}
          className={`${styles.button} ${styles.minusButton}`}
          disabled={disabled}
        >
          -
        </button>
      </div>
    </div>
  );
}
