import styles from "./InputsWrapper.module.scss";
import { PropsWithChildren } from "react";

export default function InputsWrapper(props: PropsWithChildren) {
  return <div className={styles.inputs}>{props.children}</div>;
}
