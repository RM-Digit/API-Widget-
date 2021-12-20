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
import { useSelector } from "react-redux";
import Loading from "../components/skeleton";
import ls from "local-storage";

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
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const view = useSelector((state) => state.ui.view.mode);
  const id = useSelector((state) => state.ui.view.id);
  useEffect(() => {
    apiInit();
  }, []);

  useEffect(() => {
    setInterval(apiInit, 300000);

    if (view !== "home") {
      setEventLeagues(
        allEvents.map((league) => filterByObj(league, id, "LeagueId"))
      );
    } else {
      setLoading(true);
      if (id !== "") {
        setEventLeagues(allEvents);
        setLoading(false);
      } else {
        const apiData = ls("dwAPIData");
        var allLeagueGroups = {},
          allLeagues = {},
          leaguesByGroup = {},
          allEventLeagues = [];
        apiData &&
          apiData.forEach((leagueGroup) => {
            leagueGroup.Leagues.map((league) => {
              league.Games.forEach((game) => {
                if (isComing(game.GameDateTime) && game.GameStatus === "Open") {
                  allLeagueGroups = {
                    ...allLeagueGroups,
                    [leagueGroup.LeagueGroupId]: leagueGroup.Name,
                  };
                  allLeagues = {
                    ...allLeagues,
                    [league.LeagueId]: league.Name,
                  };
                  leaguesByGroup = {
                    ...leaguesByGroup,
                    [leagueGroup.LeagueGroupId]: {
                      ...leaguesByGroup[leagueGroup.LeagueGroupId],
                      [league.LeagueId]: league.Name,
                    },
                  };

                  return;
                }
              });
              return 0;
            });

            const filtered_leagues = leagueGroup.Leagues.map((league) =>
              league.Games.filter(
                (game) =>
                  isComing(game.GameDateTime) && game.GameStatus === "Open"
              )
            ).filter((game) => game.length > 0);
            allEventLeagues.push(filtered_leagues);
          });
        setLeaguesByGroup(leaguesByGroup);
        setLeagueGroups(allLeagueGroups);
        setEventLeagues(allEventLeagues);
        setAllEvents(allEventLeagues);
        setLeagues(allLeagues);
        setLoading(apiData === null);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, view, apiData]);

  async function apiInit() {
    const res = await api.getLeagues();
    const data = ls("dwAPIData", res.data);
    setApiData(data);
  }

  return !loading ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Item>
            <Leagues contents={leagueGroups} leaguesByGroup={leaguesByGroup} />
          </Item>
        </Grid>
        <Grid item xs={12} md>
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
