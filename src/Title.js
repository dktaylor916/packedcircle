import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
import "./PackedCircleChart.css";

function Title() {
  useEffect(() => {
    d3.select("#demo1")
      .append("text")
      .attr("x", 8 * 2)
      .attr("y", 20 * 2)
      .attr("font-size", 8 * 2)
      .text(
        "Women are much more likely to ask family for help than official services"
      );
  });
}
export default Title;
