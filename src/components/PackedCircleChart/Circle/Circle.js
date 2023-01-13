import React from "react";
import cn from "classnames";

import styles from "./Circle.module.css";

const Circle = ({ x, y, r, faded, depth, color, index, setHover }) => {
  const onHover = () => {
    if (depth > 1) {
      setHover(index);
    }
  };

  const clearHover = () => {
    setHover(null);
  };

  return (
    <circle
      className={cn(styles.Circle)}
      fill={color}
      cx={x}
      cy={y}
      r={r}
      key={index}
      onMouseOver={onHover}
      onMouseLeave={clearHover}
      style={{
        opacity: faded ? 0.3 : 1,
      }}
    />
  );
};

export default Circle;
