import { useState } from "react";
import { NextPage } from "next";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import { SideBar } from "src/client/layouts/SideBar.layout";
//import { storage } from "firebase/storage";
import ChevronLeftIcon from "public/images/dashboard/akar-icons_chevron-left.svg";

const CreateCollectionPage: NextPage = () => {
  const appBarChildren = (
    <Box sx={{ display: "flex" }}>
      <ChevronLeftIcon />
      <Typography
        fontWeight="500"
        color="#79766E"
        sx={{ marginLeft: 1, marginTop: 0.2 }}
      >
        Posts/Create/Post/Collection
      </Typography>
    </Box>
  );

  return (
    <SideBar appBarChildren={appBarChildren}>
      <Typography variant="h5" fontWeight="600" sx={{ paddingTop: 3 }}>
        Create Collection
      </Typography>
      <Box sx={{ display: "flex", paddingTop: 3 }}>
        <Card sx={{ width: 448, height: 225, borderRadius: 4 }}>
          <CardContent>
            <TextField
              placeholder="Name of Collection"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              style={{ width: 365, color: "#79766E" }}
            />
            <TextField
              placeholder="Little bit of description about the collection"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{
                width: 365,
                height: 120,
                color: "#79766E",
              }}
            />
          </CardContent>
        </Card>

        <Card
          sx={{
            width: 223,
            height: 223,
            borderRadius: 4,
            bgcolor: "#E8E8E8",
            marginLeft: 5,
            textAlign: "center",
          }}
        >
          <CardActionArea sx={{ width: "100%", height: "100%" }}>
            <CardContent>
              <Typography fontWeight="500" sx={{ wordSpacing: 100 }}>
                Upload Thumbnail
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </SideBar>
  );
};

export default CreateCollectionPage;
