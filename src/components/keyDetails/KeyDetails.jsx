import React from "react";
import TextRenderer from "../TextRenderer";

const KeyDetails = ({ data, sectionNumber }) => (
  <div className="key-details">
    {data.children.map((detail, index) => {
      if (detail.type === "h4") {
        return (
          <h4 key={index}>
            <span className="section-number">{sectionNumber}.</span>
            <strong>
              <u>{detail.children[0].text}</u>
            </strong>
          </h4>
        );
      }
      if (detail.type === "ul") {
        return (
          <ul key={index}>
            {detail.children.map((item, i) => (
              <li key={i}>
                <TextRenderer children={item.children[0].children} />
              </li>
            ))}
          </ul>
        );
      }
      return null;
    })}
  </div>
);

export default KeyDetails;
