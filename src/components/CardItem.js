import { React, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ls from "local-storage";
function createData(betNum, team, spread, total, ml) {
  return { betNum, team, spread, total, ml };
}

export default function AcccessibleTable({ item, index }) {
  const [cornerShow, setCornerShow] = useState(true);
  var d = new Date(item.GameDateTime);
  var today = new Date();

  var date = new Date(d.toString());
  var day = date.getDate();
  var month = date.getMonth();
  var y =
    month === today.getUTCMonth() && day === today.getUTCDate()
      ? "Today /"
      : item.GameDateTime.split("T")[0];
  month === today.getUTCMonth() &&
    day === today.getUTCDate() + 1 &&
    (y = "Tomorrow /");
  var h = date.getHours();
  var m = date.getMinutes();

  h = parseInt(h);
  var hmt = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
  const event_time = y + " " + hmt;
  const rows = [
    createData(
      // item.GameDateTime.split("T")[0],
      item.VisitorNumber,
      item.VisitorTeam.TeamName,
      [item.GameLine.VSpreadPoints, item.GameLine.VSpreadOdds],
      [item.GameLine.Over, item.GameLine.OverOdds],
      item.GameLine.VOdds
    ),
    createData(
      // hmt,
      item.HomeNumber,
      item.HomeTeam.TeamName,
      [item.GameLine.HSpreadPoints, item.GameLine.HSpreadOdds],
      [item.GameLine.Under, item.GameLine.UnderOdds],
      item.GameLine.HOdds
    ),
  ];

  useEffect(() => {
    setCornerShow(ls("corner_show") ? false : true);
    setTimeout(() => {
      const d = ls("corner_show");
      if (d) {
        setCornerShow(false);
      } else {
        ls("corner_show", "hide");
      }
    }, 60 * 1000);
  }, []);

  return (
    <TableContainer className="event-table">
      <Table>
        {/* <caption>A basic table example with a caption</caption> */}
        {!index && (
          <TableHead>
            <TableRow>
              <TableCell>TEAM</TableCell>
              <TableCell>BET #</TableCell>
              <TableCell className="game-line">M/L</TableCell>
              <TableCell className="game-line">Total</TableCell>
              <TableCell className="game-line">Spread</TableCell>
            </TableRow>
          </TableHead>
        )}

        <TableBody hover>
          {rows.map((row, i) => (
            <TableRow key={i} className="no-boder" hover>
              <TableCell className="team" style={{ fontWeight: 600 }}>
                {row.team} {!i && <span style={{ fontSize: "10px" }}> @</span>}
              </TableCell>
              <TableCell>{row.betNum}</TableCell>

              <TableCell className="game-line corner">
                {day === today.getUTCDate() && i === 0 && cornerShow && (
                  <div className="triangle-top"></div>
                )}
                {day === today.getUTCDate() && i === 1 && cornerShow && (
                  <div className="triangle-bottom"></div>
                )}
                {row.ml > 0 ? "+" + row.ml : row.ml}
              </TableCell>
              <TableCell className="game-line">
                {i === 0 && row.total.length > 0 && (
                  <div style={{ fontWeight: 600 }}>{"O " + row.total[0]}</div>
                )}
                {i === 0 && row.total.length > 0 && <div>{row.total[1]}</div>}

                {i === 1 && row.total.length > 0 && (
                  <div style={{ fontWeight: 600 }}>{"U " + row.total[0]}</div>
                )}
                {i === 1 && row.total.length > 0 && <div>{row.total[1]}</div>}
              </TableCell>
              <TableCell className="game-line">
                {i === 0 && row.spread.length > 0 && (
                  <div style={{ fontWeight: 600 }}>
                    {row.spread[0] > 0 ? "+" + row.spread[0] : row.spread[0]}
                  </div>
                )}
                {i === 0 && row.spread.length > 0 && (
                  <div>
                    {row.spread[1] > 0 ? "+" + row.spread[1] : row.spread[1]}
                  </div>
                )}

                {i === 1 && row.spread.length > 0 && (
                  <div style={{ fontWeight: 600 }}>
                    {row.spread[0] > 0 ? "+" + row.spread[0] : row.spread[0]}
                  </div>
                )}
                {i === 1 && row.spread.length > 0 && (
                  <div>
                    {row.spread[1] > 0 ? "+" + row.spread[1] : row.spread[1]}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="boder">
            <TableCell className="event-timer">{event_time}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
