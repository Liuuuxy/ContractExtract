// src/components/Definitions.jsx
import React from "react";
import TextRenderer from "../TextRenderer";
import "./styles.css";

const Definitions = ({ data, sectionNumber }) => {
  const headerSection = data.children.find(
    (section) => section.type === "h4" && section.title === "Definitions"
  );

  return (
    <div className="definitions">
      {headerSection && (
        <h4 className="definitions-header">
          <span className="section-number">{sectionNumber}. </span>
          <span className="header-content">
            {headerSection.children.map((child, childIndex) => {
              if (child.bold && child.underline) {
                return (
                  <strong key={childIndex}>
                    <u>{child.text}</u>
                  </strong>
                );
              }
              return <span key={childIndex}>{child.text}</span>;
            })}
          </span>
        </h4>
      )}

      {/* Definition items using ordered list */}
      <ol className="definition-list">
        {data.children.slice(1).map((section, index) => {
          if (section.type === "clause") {
            return (
              <li key={index} className="definition-item">
                <div className="definition-content">
                  {section.children.map((child, childIndex) => (
                    <div key={childIndex}>
                      {child.children.map((textItem, textIndex) => (
                        <TextRenderer key={textIndex} children={[textItem]} />
                      ))}
                    </div>
                  ))}
                </div>
              </li>
            );
          }
          return null;
        })}
      </ol>
    </div>
  );
};

export default Definitions;
