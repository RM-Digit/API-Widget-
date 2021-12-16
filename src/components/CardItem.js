import React from "react";

export default function CardItem({ item }) {
  return (
    <div style={{ padding: "10px", textAlign: "left" }}>
      <div>
        <span style={{ fontWeight: "600" }}>
          {item.VisitorTeam.TeamName + " vs " + item.HomeTeam.TeamName}
        </span>
        <span style={{ float: "right" }}>{item.GameStatus}</span>
      </div>
      <div> {"Today / " + item.GameDateTime.split("T")[1].split("Z")[0]} </div>
    </div>
  );
}
