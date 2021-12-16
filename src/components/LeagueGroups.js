import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
export default function Sidebar({ leagueGroups }) {
  const Sidebar = () => (
    <List>
      {["Sports"].concat(leagueGroups).map((text, index) => (
        <ListItem
          button={index !== 0}
          key={text}
          divider={index !== leagueGroups.length}
        >
          {/* {index !== 0 && <ListItemIcon>{icons[text]}</ListItemIcon>} */}
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontWeight: index === 0 ? "700" : "normal",
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return <Sidebar />;
}
