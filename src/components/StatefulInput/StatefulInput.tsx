import { useCallback, useEffect, useRef } from "react";
import { useSubmit } from "react-router-dom";
import styles from "./StatefulInput.module.scss";

interface StatefulInputProps {
  value: number;
  label: string;
  minValue: number;
  maxValue: number;
  disabled: boolean;
}

export default function StatefulInput({
  label,
  value,
  minValue,
  maxValue,
  disabled,
}: StatefulInputProps) {
  const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null);
  const incrementedThroughHoldRef = useRef(0);

  const submit = useSubmit();

  function startIncrementing(
    incrementBy: number,
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.TouchEvent<HTMLButtonElement>
  ) {
    const form = event.currentTarget.form;
    if (form === null) return;

    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => increment(incrementBy, form));
  }

  function increment(incrementBy: number, form: HTMLFormElement) {
    const input: HTMLInputElement = form[label];
    const value = Number(input.value);
    if (value + incrementBy > maxValue || value + incrementBy < minValue)
      return;

    incrementedThroughHoldRef.current += 1;
    input.value = (Number(input.value) + incrementBy).toString();

    if (!intervalRef.current) return;

    const decreaseFactor =
      50 * Math.floor(incrementedThroughHoldRef.current / 4);
    const intervalDelay = Math.max(150 - decreaseFactor, 0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => increment(incrementBy, form),
      intervalDelay
    );
    submit(form, { replace: true });
  }

  const stopIncrementing = useCallback(() => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    incrementedThroughHoldRef.current = 0;
  }, []);

  useEffect(() => {
    return () => stopIncrementing();
  }, [stopIncrementing]);

  window.addEventListener("mouseup", stopIncrementing);
  window.addEventListener("touchend", stopIncrementing);
  window.addEventListener("touchcancel", stopIncrementing);

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.valueWrapper}>
        <label>{label}:</label>
        <input
          name={label}
          value={value}
          readOnly
          style={{
            all: "unset",
            width: "100%",
          }}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          onMouseDown={(e) => startIncrementing(1, e)}
          onTouchStart={(e) => startIncrementing(1, e)}
          onContextMenu={(e) => e.preventDefault()}
          className={`${styles.button} ${styles.plusButton}`}
          disabled={disabled}
        >
          +
        </button>
        <button
          onMouseDown={(e) => startIncrementing(-1, e)}
          onTouchStart={(e) => startIncrementing(-1, e)}
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
