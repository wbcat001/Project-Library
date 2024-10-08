import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

import {MainViewType} from "./Demo"

const drawerWidth = `${100 / 6 }%`;

interface SideBarProps{
    mainViewArray: MainViewType[],
    onSelectView: (mainView:MainViewType) => void;
}

export const SideBar: React.FC<SideBarProps> = ({mainViewArray, onSelectView}) => {

    const handleClick = (mainView: MainViewType) => {
        onSelectView(mainView);
    }
    return (
        <Box sx={{display: "flex"}}>
            <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {mainViewArray.map((text, index) => (
            <ListItem key={text} disablePadding onClick={ () => handleClick(text)}>
              <ListItemButton >
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Drawer>
        </Box>
    )
}
