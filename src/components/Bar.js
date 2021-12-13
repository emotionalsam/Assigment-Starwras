import React from "react";

function Bar({ name, population }) {
  return (
    <div
      style={{
        height: `${
          (population / 4500000000) * 100 > 5
            ? (population / 4500000000) * 100
            : (population / 450000000) * 100 + 16
        }%`,
        width: "12%",
        background: "dodgerblue",
        position: "relative",
        border: "2px solid blue",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%,-150%)",
        }}
      >
        {population.toLocaleString()}
      </span>
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "100%",
          transform: "translate(-50%)",
          marginTop: 5,
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default Bar;
