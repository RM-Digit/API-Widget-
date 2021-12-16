import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EventCard from "./eventCard";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function LeagueCard({ league }) {
  return (
    <Grid item xs={12}>
      {league.map(
        (event, index) =>
          event.length && (
            <Item key={index}>
              <EventCard event={event} />
            </Item>
          )
      )}
    </Grid>
  );
}
