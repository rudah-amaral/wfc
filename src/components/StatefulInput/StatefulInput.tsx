import { useEffect, useRef } from "react";
import styles from "./StatefulInput.module.scss";

interface StatefulInputProps {
  value: number;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  minValue: number;
  maxValue: number;
}

export default function StatefulInput(props: StatefulInputProps) {
  const { maxValue, minValue } = props;
  const intervalRef = useRef<null | number>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
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
    intervalRef.current = setInterval(() => {
      props.setValue((value) => {
        const nextValue = value + incrementer;
        if (nextValue > maxValue || nextValue < minValue) return value;
        return nextValue;
      });
    }, 100);
  }

  function stopIncrementing() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

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
          onClick={() => increment(1)}
          onMouseDown={() => {
            startIncrementing(1);
          }}
          onTouchStart={() => {
            startIncrementing(1);
          }}
          onMouseUp={stopIncrementing}
          onTouchEnd={stopIncrementing}
          onContextMenu={(e) => e.preventDefault()}
          className={`${styles.button} ${styles.plusButton}`}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => increment(-1)}
          onMouseDown={() => {
            startIncrementing(-1);
          }}
          onTouchStart={() => {
            startIncrementing(-1);
          }}
          onMouseUp={stopIncrementing}
          onTouchEnd={stopIncrementing}
          onContextMenu={(e) => e.preventDefault()}
          className={`${styles.button} ${styles.minusButton}`}
        >
          -
        </button>
      </div>
    </div>
  );
}
