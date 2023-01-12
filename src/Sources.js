import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
import "./PackedCircleChart.css";

function Sources() {
  useEffect(() => {
    ///SOURCES

    d3.select("#demo1")
      .append("text")
      .attr("x", 10 * 2)
      .attr("y", 250 * 2)
      .attr("font-size", 3.5 * 2)
      .attr("fill", "#666666")
      .text(
        "Source: DHS 2005-19, most recent survey per country. Note: % is of ever-partnered women aged 15-49 that have experienced physical or sexual violence. Average taken"
      );
    d3.select("#demo1")
      .append("text")
      .attr("x", 10 * 2)
      .attr("y", 255 * 2)
      .attr("font-size", 3.5 * 2)
      .attr("fill", "#666666")
      .text("across 51 countries with data available.");
  });
}

export default Sources;
