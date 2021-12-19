import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Leagues from "../components/LeagueGroups";
import LeagueCardList from "../components/LeagueCardList";
import { useState, useEffect } from "react";
import { api } from "../utils/api_handler";
import { isComing, filterByObj } from "../utils/common";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/skeleton";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [leagueGroups, setLeagueGroups] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [eventLeagues, setEventLeagues] = useState([]);
  const [leaguesByGroup, setLeaguesByGroup] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const view = useSelector((state) => state.ui.view.mode);
  const id = useSelector((state) => state.ui.view.id);
  useEffect(() => {
    if (view === "events") {
      setEventLeagues(
        allEvents.map((league) => filterByObj(league, id, "LeagueId"))
      );
    } else if (view !== "league") {
      console.log("process.env.NODE_ENV", process.env.NODE_ENV);
      setLoading(true);
      api
        .getLeagues()
        .then((res) => {
          var allLeagueGroups = {},
            allLeagues = {},
            leaguesByGroup = {},
            allEventLeagues = [];
          res.data.forEach((leagueGroup) => {
            allLeagueGroups = {
              ...allLeagueGroups,
              [leagueGroup.LeagueGroupId]: leagueGroup.Name,
            };
            leagueGroup.Leagues.map((league) => {
              allLeagues = { ...allLeagues, [league.LeagueId]: league.Name };
              leaguesByGroup = {
                ...leaguesByGroup,
                [leagueGroup.LeagueGroupId]: {
                  ...leaguesByGroup[leagueGroup.LeagueGroupId],
                  [league.LeagueId]: league.Name,
                },
              };
            });

            const filtered_leagues = leagueGroup.Leagues.map((league) =>
              league.Games.filter((game) => isComing(game.GameDateTime))
            ).filter((game) => game.length > 0);

            filtered_leagues.length > 0 &&
              allEventLeagues.push(filtered_leagues);
          });
          setLeaguesByGroup(leaguesByGroup);
          setLeagueGroups(allLeagueGroups);
          setEventLeagues(allEventLeagues);
          setAllEvents(allEventLeagues);
          setLeagues(allLeagues);
          setLoading(false);
        })
        .catch((err) => console.log("ERROR", err));
    }
  }, [id, view]);

  return !loading ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Item>
            <Leagues
              contents={leagueGroups}
              page={"home"}
              leaguesByGroup={leaguesByGroup}
            />
          </Item>
        </Grid>
        <Grid item xs>
          <Grid container spacing={2}>
            <LeagueCardList eventLeagues={eventLeagues} leagues={leagues} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Loading />
  );
}
