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
import ChevronLeftIcon from "public/images/dashboard/akar-icons_chevron-left.svg";

const CreateCollectionPage: NextPage = () => {
  return (
    <SideBar>
      <ChevronLeftIcon />
      <Typography fontWeight="500" color="#79766E">
        Posts/Create/Post/Collection
      </Typography>
      <Box sx={{ display: "flex", paddingTop: 3 }}>
        <Typography fontWeight="600">Create Collection</Typography>
        <Card sx={{ width: 448, height: 225, borderRadius: 4 }}>
          <CardContent>
            <TextField
              label="Name of Collection"
              variant="standard"
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              label="Little bit of description about the collection"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ width: 365 }}
            />
          </CardContent>
        </Card>

        <Card
          sx={{
            width: 223,
            height: 223,
            borderRadius: 4,
            bgcolor: "#E8E8E8",
            paddingLeft: 5,
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography>Upload Thumbnail</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </SideBar>
  );
};

export default CreateCollectionPage;
