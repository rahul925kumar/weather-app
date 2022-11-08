import React from "react";
import CurrentLocation from "./CurrentLocation";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        Developed by {"    "}
        <p href="javascript:void(0)">
          Rahul Kumar
        </p>
      </div>
    </>
  );
}

export default App;
