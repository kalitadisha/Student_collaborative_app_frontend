import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import AssignmentIcon from '@mui/icons-material/Assignment';
import {
    RssFeed,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    Event,
    School,
  } from "@mui/icons-material";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {/* eyat kiba heading dibo para */}
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PlayCircleFilledOutlined />
        </ListItemIcon>
        <ListItemText primary="My projects" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText primary="Groups" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Bookmark />
        </ListItemIcon>
        <ListItemText primary="Saved Projects" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Books" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Event />
        </ListItemIcon>
        <ListItemText primary="Event" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <School />
        </ListItemIcon>
        <ListItemText primary="Course" />
      </ListItemButton>
    </List>
  );
}
