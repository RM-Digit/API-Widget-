import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Leagues from "../components/LeagueGroups";
import LeagueCardList from "../components/LeagueCardList";
import { useState, useEffect } from "react";
import { api } from "../utils/api_handler";
import { isToday } from "../utils/common";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  const [leagueGroups, setLeagueGroups] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [eventLeagues, setEventLeagues] = useState([]);

  useEffect(() => {
    api
      .getLeagues()
      .then((res) => {
        var allLeagueGroups = [],
          allLeagues = [],
          allEventLeagues = [];

        res.data.forEach((leagueGroup) => {
          allLeagueGroups.push(leagueGroup.Name);
          allLeagues.push({ [leagueGroup.LeagueGroupId]: leagueGroup.Leagues });
          const filtered_leagues = leagueGroup.Leagues.map((league) =>
            league.Games.filter((game) => isToday(game.GameDateTime))
          ).filter((game) => game.length > 0);

          filtered_leagues.length > 0 && allEventLeagues.push(filtered_leagues);
        });

        setLeagueGroups(allLeagueGroups);
        setEventLeagues(allEventLeagues);
        setLeagues(allLeagues);
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            <Leagues leagueGroups={leagueGroups} />
          </Item>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <LeagueCardList eventLeagues={eventLeagues} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
