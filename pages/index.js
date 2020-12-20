import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ServiceWorker from "../comp/service";

export default function Home() {
  const [state, setState] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setState((s) => !s)}>toggle</button>
      {state && <ServiceWorker />}
    </div>
  );
}
