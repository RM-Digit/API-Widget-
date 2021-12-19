import React from "react";
import { isToday } from "../utils/common";
export default function CardItem({ item }) {
  return (
    <div style={{ padding: "10px", textAlign: "left" }}>
      <div>
        <span style={{ fontWeight: "600" }}>
          {item.Heading
            ? item.Heading
            : item.HomeTeam.TeamName + " vs " + item.VisitorTeam.TeamName}
        </span>
        <span style={{ float: "right" }}>{item.GameStatus}</span>
      </div>
      <div>
        {" "}
        {isToday(item.GameDateTime)
          ? "Today / " + item.GameDateTime.split("T")[1].split("Z")[0]
          : item.GameDateTime.split("T")[0]}{" "}
      </div>
    </div>
  );
}
