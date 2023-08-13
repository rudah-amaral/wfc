import { useEffect, useRef } from "react";
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

  const submit = useSubmit();

  useEffect(() => {
    return () => stopIncrementing();
  }, []);

  function increment(incrementer: number, form: HTMLFormElement) {
    const input: HTMLInputElement = form[label];
    const value = Number(input.value);
    if (value + incrementer <= maxValue && value + incrementer >= minValue) {
      input.value = (Number(input.value) + incrementer).toString();
    }
    submit(form, { replace: true });
  }

  function startIncrementing(
    incrementer: number,
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.TouchEvent<HTMLButtonElement>
  ) {
    if (intervalRef.current) return;

    const form = event.currentTarget.form;
    if (form === null) return;
    increment(incrementer, form);
    intervalRef.current = setInterval(() => increment(incrementer, form), 100);
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
