import { Button, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import { PrimaryBox } from "src/client/components/Box.component";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const ChooseTopicsPage: NextPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      {/* <Grid item width="50%"> */}
      <PrimaryBox
        width="100%"
        maxWidth="30rem"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2rem",
          paddingBottom: "2rem", //8
        }}
      >
        <Typography variant="h4" fontWeight="600" textAlign="center">
          Select The Topics That Interest You
        </Typography>
        <Autocomplete //TODO: remove outline
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={topics}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Topics" placeholder="Science" />
          )}
          sx={{ width: "500px", backgroundColor: "white", borderRadius: 16 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: 450,
            marginTop: 5,
          }}
        >
          <Button //TODO: position buttons correctly
            variant="contained"
            color="secondary"
            sx={{ width: "30%", height: "3rem", borderRadius: "0.5rem" }}
          >
            <Typography variant="h5" color="white" fontWeight="500">
              Skip
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "30%", height: "3rem", borderRadius: "0.5rem" }}
          >
            <Typography variant="h5" color="white" fontWeight="500">
              Next
            </Typography>
          </Button>
        </Box>
      </PrimaryBox>
      {/* </Grid> */}
    </Grid>
  );
};

const topics = [
  //TODO: replace with db
  { name: "Technology" },
  { name: "Science" },
];

export default ChooseTopicsPage;
