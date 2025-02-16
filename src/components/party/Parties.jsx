// src/components/Parties.jsx
import React from "react";
import TextRenderer from "../TextRenderer";

const Parties = ({ data }) => (
  <div className="parties-section">
    {data.children.map((party, index) => {
      const text = party.children.map((child, childIndex) => {
        if (child.text && child.text.includes("\n")) {
          // Split text by newline and create array of elements
          return child.text.split("\n").map((line, lineIndex) => (
            <React.Fragment key={`${childIndex}-${lineIndex}`}>
              {lineIndex > 0 && <br />}
              {line}
            </React.Fragment>
          ));
        }
        return <TextRenderer key={childIndex} children={[child]} />;
      });

      return <div key={index}>{text}</div>;
    })}
  </div>
);

export default Parties;
