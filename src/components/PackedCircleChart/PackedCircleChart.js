import React, { useState } from "react";
import * as d3 from "d3";
import "./PackedCircleChart.css";

import data from "../../data.json";
import Circle from "./Circle/Circle";

function PackedCircleChart() {
  const [hover, setHover] = useState(null);

  const datagroup = d3.group(data, (d) => d.grouping);
  var root = d3
    .hierarchy(datagroup)
    .sum((d) => (d.hasOwnProperty("mean") ? d.mean : 0))
    .sort((a, b) => b.value - a.value);

  ///DATA PARTITION FOR CIRCLE PACKING
  var partition = d3.pack().size([500, 500]).padding(2);
  partition(root);

  ///PREPARE COLORS FOR DATA
  const colorScale = d3
    .scaleOrdinal()
    .domain(d3.range(7))
    .range([
      "#FAFAFA",
      "rgb(236, 85, 58)",
      "rgb(22, 154, 243)",
      "rgb(3, 93, 139)",
      "rgb(76, 187, 136)",
      "black",
      "black",
    ]);

  const descendants = root.descendants();

  // useEffect(() => {
  //   ///CREATE BASIC GROUP FOR EACH CIRCLE AND TEXT TO EXTIST
  //   var elem = d3.select("#demo1").selectAll("g").data(root.descendants());
  //   var elemEnter = elem
  //     .enter()
  //     .append("g")
  //     .attr("transform", "translate(" + 20 * 2 + ", " + 20 * 2 + ")");

  //   ///ADD CIRCLES TO THE PAGE
  //   elemEnter
  //     .append("circle")
  //     .classed("node", true)
  //     .attr("cx", (d) => d.x)
  //     .attr("cy", (d) => d.y)
  //     .attr("r", (d) => d.r)
  //     .style("fill", function (d, i) {
  //       if (i == 0) {
  //         return "none";
  //       } else {
  //         return colorScale(d.data.grouping);
  //       }
  //     })
  //     .style("stroke", function (d, i) {
  //       if (i == 0) {
  //         return "none";
  //       } else {
  //         return "#CCCCCC";
  //       }
  //     })
  //     .style("stroke-width", 0.5);

  //   /// ADD CATEGORIES TO THE PAGE WHILE USING THE INDEX TO NOT ADD TEXT TO THE SMALLER CIRCLES

  //   elemEnter
  //     .append("text")
  //     .classed("help", true)
  //     .attr("x", (d) => d.x)
  //     .attr("y", (d) => d.y)
  //     .attr("dy", function (d, i) {
  //       if (i < 6) {
  //         return 0;
  //       }
  //       if ([12, 13, 14, 10, 16, 17].includes(i)) {
  //         return "-3.8em";
  //       } else {
  //         return 0;
  //       }
  //     })
  //     .attr("text-anchor", "middle")
  //     .attr("font-family", "Open Sans")
  //     .attr("font-size", 10)
  //     .text(function (d, i) {
  //       if (i < 6 || [12, 13, 14, 10, 16, 17].includes(i)) {
  //         return;
  //       } else {
  //         return d.data.help;
  //       }
  //     })
  //     .style("fill", function (d) {
  //       if (d.data.help == "Police") {
  //         return "white";
  //       } else {
  //         return "black";
  //       }
  //     })
  //     .style("opacity", function (d, i) {
  //       if (i < 6) {
  //         return 0;
  //       }
  //       if ([12, 13, 14, 10, 16, 17].includes(i)) {
  //         return 0;
  //       } else {
  //         return 1;
  //       }
  //     });

  //   /// ADD PERCENTAGES TO THE CIRCLES WHILE USING THE INDEX TO NOT ADD TEXT TO THE SMALLER CIRCLES

  //   elemEnter
  //     .append("text")
  //     .classed("pct", true)
  //     .attr("x", (d) => d.x)
  //     .attr("y", (d) => d.y)
  //     .attr("dy", function (d, i) {
  //       if (i < 6) {
  //         return 0;
  //       }
  //       if ([12, 13, 14, 10, 16, 17].includes(i)) {
  //         return;
  //       } else {
  //         return "1.4em";
  //       }
  //     })
  //     .attr("text-anchor", "middle")
  //     .attr("font-family", "Open Sans")
  //     .attr("font-size", 10)
  //     .text(function (d, i) {
  //       if (i < 6 || [12, 13, 14, 10, 16, 17].includes(i)) {
  //         return;
  //       } else {
  //         return d.data.mean + " %";
  //       }
  //     })
  //     .style("fill", function (d) {
  //       if (d.data.help == "Police") {
  //         return "white";
  //       } else {
  //         return "black";
  //       }
  //     })
  //     .style("opacity", function (d, i) {
  //       if (i < 6) {
  //         return 0;
  //       } else {
  //         return 1;
  //       }
  //     });

  //   ///ADD MOUSEOVER AND MOUSEOUT EFFECT TO HIGHLIGHT SELECTED CIRCLE (IGNORING THE LARGER GROUPED CIRCLES)

  //   elemEnter
  //     .on("mouseover", function (d) {
  //       var hiddenNames = [
  //         "Doctor/medical personnel",
  //         "Social work organization",
  //         "Lawyer",
  //         "Religious leader",
  //         "Boyfriend",
  //         "Husband/Partner",
  //       ];

  //       if (
  //         d3.select(this).select("circle").style("fill") == "rgb(250, 250, 250)"
  //       ) {
  //         return;
  //       }

  //       /// FIX THE WEIRD HOVRE PROBLEMS BY ADDING AND DELETING THE TEXT INSTEAD OF CHANGING OPACITY

  //       if (hiddenNames.includes(d3.select(this).data()[0].data["help"])) {
  //         var selectedClass = d3
  //           .select(this)
  //           .attr("class", "selected")
  //           .attr("class");
  //         var selectedColor = d3
  //           .select(this)
  //           .attr("class", "selected")
  //           .select("circle.node")
  //           .style("fill");
  //         var selectedText = d3.select(this).data()[0].data["grouping"];

  //         d3.selectAll("." + selectedClass)
  //           .selectAll(".help")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll("." + selectedClass)
  //           .selectAll(".pct")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll("." + selectedClass)
  //           .select("circle.node")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1)
  //           .style("stroke", "black")
  //           .style("stroke-width", 1);

  //         d3.selectAll("*:not(." + selectedClass + ")")
  //           .select(".help")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0);
  //         d3.selectAll("*:not(." + selectedClass + ")")
  //           .select(".pct")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0);
  //         d3.selectAll("*:not(." + selectedClass + ")")
  //           .select("circle.node")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0.5);

  //         d3.select(this)
  //           .append("text")
  //           .attr("x", function (d) {
  //             return d.x;
  //           })
  //           .attr("y", function (d) {
  //             return d.y;
  //           })
  //           .attr("text-anchor", "middle")
  //           .attr("font-family", "Open Sans")
  //           .attr("dy", "-3.6em")
  //           .attr("font-size", 10)
  //           .text(function (d) {
  //             return d.data.help;
  //           });
  //         d3.select(this)
  //           .append("text")
  //           .attr("x", function (d) {
  //             return d.x;
  //           })
  //           .attr("y", function (d) {
  //             return d.y;
  //           })
  //           .attr("text-anchor", "middle")
  //           .attr("font-family", "Open Sans")
  //           .attr("dy", "-2.2em")
  //           .attr("font-size", 10)
  //           .text(function (d) {
  //             return d.data.mean + " %";
  //           });

  //         d3.selectAll(".legendDots")
  //           .filter(function (d) {
  //             return d == selectedColor;
  //           })
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll(".legendDots")
  //           .filter(function (d) {
  //             return d != selectedColor;
  //           })
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0.2);

  //         d3.selectAll(".legendText")
  //           .filter(function (d) {
  //             return d == selectedText;
  //           })
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll(".legendText")
  //           .filter(function (d) {
  //             return d != selectedText;
  //           })
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0.2);
  //       } else {
  //         console.log(d3.select(this).data()[0].data["help"]);
  //         var selectedClass = d3
  //           .select(this)
  //           .attr("class", "selected")
  //           .attr("class");
  //         var selectedColor = d3
  //           .select(this)
  //           .attr("class", "selected")
  //           .select("circle.node")
  //           .style("fill");
  //         var selectedText = d3.select(this).data()[0].data["grouping"];

  //         d3.selectAll("." + selectedClass)
  //           .selectAll(".help")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll("." + selectedClass)
  //           .selectAll(".pct")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll("." + selectedClass)
  //           .select("circle.node")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1)
  //           .style("stroke", "black")
  //           .style("stroke-width", 1);

  //         d3.selectAll("*:not(." + selectedClass + ")")
  //           .select(".help")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0);
  //         d3.selectAll("*:not(." + selectedClass + ")")
  //           .select(".pct")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0);
  //         d3.selectAll("*:not(." + selectedClass + ")")
  //           .select("circle.node")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0.5);

  //         d3.selectAll(".legendDots")
  //           .filter(function (d) {
  //             return d == selectedColor;
  //           })
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll(".legendDots")
  //           .filter(function (d) {
  //             return d != selectedColor;
  //           })
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0.2);

  //         d3.selectAll(".legendText")
  //           .filter(function (d) {
  //             return d == selectedText;
  //           })
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll(".legendText")
  //           .filter(function (d) {
  //             return d != selectedText;
  //           })
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 0.2);
  //       }
  //     })

  //     .on("mouseout", function () {
  //       var hiddenNames = [
  //         "Doctor/medical personnel",
  //         "Social work organization",
  //         "Lawyer",
  //         "Religious leader",
  //         "Boyfriend",
  //         "Husband/Partner",
  //       ];

  //       if (hiddenNames.includes(d3.select(this).data()[0].data["help"])) {
  //         d3.selectAll(".legendDots")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll(".legendText")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.select(this).classed("selected", false);
  //         d3.select(this).selectAll("text").remove();

  //         d3.selectAll("circle.node")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1)
  //           .style("stroke", function (d, i) {
  //             if (i == 0) {
  //               return "none";
  //             } else {
  //               return "#CCCCCC";
  //             }
  //           })
  //           .style("stroke-width", 0.5);
  //       } else {
  //         d3.selectAll(".legendDots")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.selectAll(".legendText")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1);
  //         d3.select(this).classed("selected", false);
  //         d3.selectAll(".help")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", function (d) {
  //             if (d.data.mean < 5) {
  //               return 0;
  //             } else {
  //               return 1;
  //             }
  //           });
  //         d3.selectAll(".pct")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", function (d) {
  //             if (d.data.mean < 5) {
  //               return 0;
  //             } else {
  //               return 1;
  //             }
  //           });
  //         d3.selectAll("circle.node")
  //           .transition()
  //           .duration(50)
  //           .style("opacity", 1)
  //           .style("stroke", function (d, i) {
  //             if (i == 0) {
  //               return "none";
  //             } else {
  //               return "#CCCCCC";
  //             }
  //           })
  //           .style("stroke-width", 0.5);
  //       }
  //     });
  // });

  return (
    <div className="wrap">
      <svg id="demo1" viewBox="0 0 1000 1000">
        {descendants.map(
          ({ r, x, y, depth, data }, index) =>
            index > 0 && (
              <Circle
                key={index}
                x={x}
                y={y}
                r={r}
                depth={depth}
                index={index}
                setHover={setHover}
                faded={hover !== null && hover !== index}
                color={colorScale(data.grouping)}
              />
            )
        )}
      </svg>
      <div className="labels" />
    </div>
  );
}

export default PackedCircleChart;
