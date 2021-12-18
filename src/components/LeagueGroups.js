import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { switch_sidebar } from "../_actions/ui_actions";

export default function Sidebar({ contents, page, leaguesByGroup }) {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    page === "home" && setRows([{ 0: "Sports" }].concat(contents));
  }, [contents, page]);

  const handleClick = (e, groupdId) => {
    console.log("test", groupdId);
    setRows(leaguesByGroup[groupdId]);
    dispatch(switch_sidebar("league"));
  };

  const Sidebar = () => (
    <List>
      {rows.map((text, index) => (
        <ListItem
          button={index !== 0}
          key={index}
          divider
          onClick={(e) => {
            handleClick(e, Object.keys(text)[0]);
          }}
        >
          <ListItemText
            primary={Object.values(text)[0]}
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
