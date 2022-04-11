import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { lightThemeOptions } from "styles/theme/lightThemeOptions";
import HomeIcon from "public/images/dashboard/ant-design_home-filled.svg";
import ExploreIcon from "public/images/dashboard/ic_baseline-explore.svg";
import HabitsIcon from "public/images/dashboard/bxs_brain.svg";
import MyPostsIcon from "public/images/dashboard/fa-solid_pen.svg";
import { useRouter } from "next/router";
import { DashboardProfileDropdown } from "../components/DashboardProfileDropdown.component";
import Link from "next/link";

const drawerWidth = 240;

const links: [string, React.ReactNode, RegExp, string][] = [
  ["Home", <HomeIcon key="home" />, /^\/dashboard$/, "/dashboard"],
  [
    "Explore",
    <ExploreIcon key="explore" />,
    /^\/dashboard\/explore.*/,
    "/dashboard/explore",
  ],
  [
    "Habits",
    <HabitsIcon key="habits" />,
    /^\/dashboard\/habits.*/,
    "/dashboard/habits",
  ],
  [
    "My Posts",
    <MyPostsIcon key="myposts" />,
    /^\/dashboard\/my-posts.*/,
    "/dashboard/my-posts",
  ],
];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode;
  appBarChildren: React.ReactNode;
}

export const SideBar: React.FC<Props> = ({ children, appBarChildren }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar />
      {/* <Divider /> */}
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",

          px: "1rem",
        }}
      >
        {links.map(([text, Icon, pathRegExp, path]) => {
          return (
            <Link href={path} passHref key={text}>
              <ListItem
                button={true}
                sx={{
                  borderRadius: "0.5rem",
                  background: pathRegExp.test(router.pathname)
                    ? lightThemeOptions.palette.background.default
                    : "",
                }}
              >
                <ListItemIcon>{Icon}</ListItemIcon>
                <ListItemText
                  primary={<Typography fontWeight={500}>{text}</Typography>}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "primary" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: lightThemeOptions.palette.background.default,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: "1rem",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box display="flex" justifyContent="space-between" width="100%">
            <div>{appBarChildren}</div>
            <DashboardProfileDropdown />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              background: lightThemeOptions.palette.primary.main,
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: lightThemeOptions.palette.primary.main,
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
