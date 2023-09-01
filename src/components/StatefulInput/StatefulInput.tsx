import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./StatefulInput.module.scss";

interface StatefulInputProps {
  searchParamKey: string;
  minValue: number;
  maxValue: number;
  disabled: boolean;
}

export default function StatefulInput({
  searchParamKey,
  minValue,
  maxValue,
  disabled,
}: StatefulInputProps) {
  const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null);
  const incrementedThroughHoldRef = useRef(0);

  const [searchParams, setSearchParams] = useSearchParams();
  let searchParamValue = Number(searchParams.get(searchParamKey));

  function startIncrementing(incrementBy: number) {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => increment(incrementBy));
  }

  function increment(incrementBy: number) {
    if (
      searchParamValue + incrementBy > maxValue ||
      searchParamValue + incrementBy < minValue
    )
      return;

    incrementedThroughHoldRef.current += 1;

    if (!intervalRef.current) return;

    const decreaseFactor =
      50 * Math.floor(incrementedThroughHoldRef.current / 4);
    const intervalDelay = Math.max(150 - decreaseFactor, 0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => increment(incrementBy),
      intervalDelay
    );
    setSearchParams((next) => {
      searchParamValue += incrementBy;
      next.set(searchParamKey, searchParamValue.toString());
      return next;
    });
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

  useEffect(() => {
    window.addEventListener("mouseup", stopIncrementing);
    window.addEventListener("touchend", stopIncrementing);
    window.addEventListener("touchcancel", stopIncrementing);
    window.addEventListener("keyup", stopIncrementing);

    return () => {
      window.removeEventListener("mouseup", stopIncrementing);
      window.removeEventListener("touchend", stopIncrementing);
      window.removeEventListener("touchcancel", stopIncrementing);
      window.removeEventListener("keyup", stopIncrementing);
    };
  }, [stopIncrementing]);

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.valueWrapper}>
        <span>
          {searchParamKey}: {searchParamValue}
        </span>
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          type="button"
          onKeyDown={(e) => e.key === "Enter" && startIncrementing(1)}
          onMouseDown={(e) => e.button === 0 && startIncrementing(1)}
          onTouchStart={() => startIncrementing(1)}
          className={`${styles.button} ${styles.plusButton}`}
          disabled={disabled}
        >
          +
        </button>
        <button
          type="button"
          onKeyDown={(e) => e.key === "Enter" && startIncrementing(-1)}
          onMouseDown={(e) => e.button === 0 && startIncrementing(-1)}
          onTouchStart={() => startIncrementing(-1)}
          className={`${styles.button} ${styles.minusButton}`}
          disabled={disabled}
        >
          -
        </button>
      </div>
    </div>
  );
}
