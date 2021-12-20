import React from "react";
import Box from "@mui/material/Box";
import { isToday } from "../utils/common";
export default function CardItem({ item, index }) {
  return (
    <>
      {!index && (
        <div style={{ padding: "10px", textAlign: "left" }}>
          <div>
            <span style={{ fontWeight: "600", visibility: "hidden" }}>
              {item.Heading
                ? item.Heading
                : item.HomeTeam.TeamName + " vs " + item.VisitorTeam.TeamName}
            </span>
            {item.GameLine && (
              <span style={{ float: "right" }} className="odds-table-header">
                {item.GameLine.VOdds && <span> VOdds </span>}
                {item.GameLine.HOdds && <span> HOdds </span>}
                {item.GameLine.UnderOdds && <span> UOdds </span>}
                {<span> Status </span>}
              </span>
            )}
          </div>
        </div>
      )}

      <div style={{ padding: "10px", textAlign: "left" }}>
        <div>
          <span style={{ fontWeight: "600" }}>
            {item.Heading
              ? item.Heading
              : item.HomeTeam.TeamName + " vs " + item.VisitorTeam.TeamName}
          </span>
          {item.GameLine && (
            <span style={{ float: "right" }} className="odds-table">
              {item.GameLine.VOdds && <span> {item.GameLine.VOdds} </span>}
              {item.GameLine.HOdds && <span> {item.GameLine.HOdds} </span>}
              {item.GameLine.UnderOdds && (
                <span> {item.GameLine.UnderOdds} </span>
              )}
              <span style={{ float: "right" }}>{item.GameStatus}</span>
            </span>
          )}
          <Box component="span" sx={{ display: "block" }}>
            {item.Heading &&
              item.HomeTeam &&
              `(${item.HomeTeam.TeamName} vs ${item.VisitorTeam.TeamName})`}
          </Box>
        </div>
        <div>
          {isToday(item.GameDateTime)
            ? "Today / " + item.GameDateTime.split("T")[1].split("Z")[0]
            : item.GameDateTime.split("T")[0]}{" "}
        </div>
      </div>
    </>
  );
}
