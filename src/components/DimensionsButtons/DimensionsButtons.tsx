import StatefulInput from "../StatefulInput";
import styles from "./DimensionsButtons.module.scss";

interface DimensionsButtonsProps {
  disabled: boolean;
}

export default function DimensionsButtons({
  disabled,
}: DimensionsButtonsProps) {
  return (
    <div className={styles.dimensionsButtons}>
      <StatefulInput
        searchParamKey="columns"
        minValue={1}
        maxValue={30}
        disabled={disabled}
      />
      <StatefulInput
        searchParamKey="rows"
        minValue={1}
        maxValue={30}
        disabled={disabled}
      />
    </div>
  );
}
