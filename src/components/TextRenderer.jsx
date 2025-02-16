// src/components/TextRenderer.jsx
import React from "react";
import "./styles.css";

export const TextRenderer = ({ children }) => {
  return children.map((child, index) => {
    if (child.text) {
      return child.bold ? (
        <strong key={index}>{child.text}</strong>
      ) : (
        child.text
      );
    }
    if (child.type === "mention") {
      return (
        <span
          key={index}
          className="mention"
          style={{ backgroundColor: child.color }}
        >
          {child.value || child.children?.[0]?.text}
        </span>
      );
    }
    return null;
  });
};

export default TextRenderer;
