import React from "react";
import Grid from "@mui/material/Grid";
import Item from "./CardItem";
import Typography from "@mui/material/Typography";
export default function eventCard({ event }) {
  console.log(event);
  return (
    <Grid container spacing="6">
      <Grid
        item
        xs={12}
        style={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          textAlign: "left",
        }}
        p={1}
      >
        <Typography gutterBottom variant="subtitle1" component="div">
          Standard license
        </Typography>
      </Grid>

      {event.map((e, i) => (
        <Grid item xs={12} key={i}>
          <Item item={e} />
        </Grid>
      ))}
    </Grid>
  );
}
