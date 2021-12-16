import LeagueCard from "./LeagueCard";
import { useState, useEffect } from "react";

export default function LeagueCardList({ eventLeagues }) {
  return eventLeagues.map((league, index) => (
    <LeagueCard key={index} league={league} />
  ));
}
