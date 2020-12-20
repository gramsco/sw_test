import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function ServiceWorker() {
  const [loading, setLoading] = useState("");

  const [worker, setWorker] = useState(null);
  const [worker2, setWorker2] = useState(null);

  const [result, setResult] = useState(null);

  useEffect(() => {
    let worker = new Worker("/niceSW.js");
    let worker2 = new Worker("/secondSW.js");
    setWorker(worker);
    setWorker2(worker2);
    return () => worker.terminate();
  }, []);

  useEffect(() => {
    if (!worker) return;
    worker.onmessage = function (e) {
      setResult(e.data);
    };
  }, [worker]);

  function launchOther() {
    let r = 1;
    for (let i = 100; i < 100000; i++) {
      r += i;
    }
    console.log(r);
    console.log("MAIN THREAD");
  }

  function handleCalculate() {
    if (!worker) return;
    worker.postMessage("coucou");
    launchOther();
    worker2.postMessage("yolo");
  }

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <button onClick={handleCalculate}>click me</button>
      <div>{loading}</div>
      <div>{result}</div>
    </div>
  );
}
