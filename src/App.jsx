// src/App.jsx
import React from "react";
import ServiceAgreement from "./components/ServiceAgreement";
import jsonData from "./data.json";
import "./styles.css";

const App = () => {
  // Get the first item from the array since your JSON is wrapped in []
  const data = jsonData[0];

  // Add error checking
  if (!data) {
    console.error("No data available");
    return <div>Error: No data available</div>;
  }

  console.log("Data being passed to ServiceAgreement:", data);

  return (
    <div className="app">
      <ServiceAgreement data={data} />
    </div>
  );
};

export default App;
