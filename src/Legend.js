import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
import "./PackedCircleChart.css";

function Legend() {
  useEffect(() => {
    ///LEGEND TITLE
    d3.select("#demo1")
      .append("text")
      .attr("x", 8 * 2)
      .attr("y", 35 * 2)
      .attr("font-size", 4.5 * 2)
      .text("% of women experiencing violence that turned to...");
    ///LEGEND
    var legendLabels = [
      "Family",
      "Friends / community",
      "Services",
      "Intimate partner",
      "Other",
    ];
    var labelColors = [
      "rgb(236, 85, 58)",
      "rgb(22, 154, 243)",
      "rgb(3, 93, 139)",
      "black",
      "rgb(76, 187, 136)",
    ];

    d3.select("#demo1")
      .selectAll("legendDots")
      .data(labelColors)
      .enter()
      .append("circle")
      .attr("class", "legendDots")
      .attr("cx", 10 * 2)
      .attr("cy", function (d, i) {
        return 2 * (45 + i * 9);
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 2 * 2)
      .style("fill", function (d) {
        return d;
      });

    d3.select("#demo1")
      .selectAll("legendText")
      .data(legendLabels)
      .enter()
      .append("text")
      .attr("class", "legendText")
      .attr("x", 15 * 2)
      .attr("y", function (d, i) {
        return 2 * (46.5 + i * 9);
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("text-anchor", "left")
      .attr("font-size", 4.5 * 2)
      .text(function (d) {
        return d;
      });
  });
}
export default Legend;
