// src/components/agreement/Agreement.jsx
import React from "react";

const Agreement = ({ data, sectionNumber }) => (
  <div className="services">
    <h4>
      <span className="section-number">{sectionNumber}.</span>
      <strong>{data.children[0].children[0].text}</strong>
    </h4>
    <p>The Provider shall:</p>
    <ul>
      {data.children[1].children.map((item, index) => (
        <li key={index}>{item.children[0].children[0].text}</li>
      ))}
    </ul>
  </div>
);

export default Agreement;
