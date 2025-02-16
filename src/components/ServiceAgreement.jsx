// src/components/ServiceAgreement.jsx
import React from "react";
import Title from "./title/Title";
import Description from "./description/Description";
import Parties from "./party/Parties";
import KeyDetails from "./keyDetails/KeyDetails";
import Definitions from "./definitions/Definitions";
import Agreement from "./agreement/Agreement";

const ServiceAgreement = ({ data }) => {
  let sectionNumber = 0;

  const getNextSectionNumber = () => {
    sectionNumber += 1;
    return sectionNumber;
  };

  return (
    <div className="service-agreement">
      {data.children.map((section, index) => {
        if (section.type === "h1") {
          return <Title key={index} data={section} />;
        }
        if (section.type === "p" && section.title === "Description") {
          return <Description key={index} data={section} />;
        }
        if (section.type === "block" && section.title === "Parties") {
          return <Parties key={index} data={section} />;
        }
        if (section.type === "clause" && section.title === "Key Details") {
          return (
            <KeyDetails
              key={index}
              data={section}
              sectionNumber={getNextSectionNumber()}
            />
          );
        }
        if (section.type === "clause" && section.title === "Definitions") {
          return (
            <Definitions
              key={index}
              data={section}
              sectionNumber={getNextSectionNumber()}
            />
          );
        }
        if (section.type === "p" && section.children[0].type === "clause") {
          return (
            <Agreement
              key={index}
              data={section.children[0]}
              sectionNumber={getNextSectionNumber()}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default ServiceAgreement;
