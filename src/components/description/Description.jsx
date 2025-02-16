import React from "react";
import { TextRenderer } from "../TextRenderer";

const Description = ({ data }) => (
  <p className="agreement-intro">
    <TextRenderer children={data.children} />
  </p>
);

export default Description;
