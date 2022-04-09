import { Button, Grid, Typography } from "@mui/material"
import { NextPage } from "next"
import { PrimaryBox } from "src/client/components/Box.component"
import { TextInput } from "src/client/components/TextInput.component"

const ChooseHabitsPage: NextPage = () => {
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
          paddingBottom: "8rem",
        }}
      >
        <Typography variant="h4" fontWeight="600" textAlign="center">
            Choose Your Habits
        </Typography>
        <TextInput
          id="filled-basic"
          label="Username"
          type="text"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextInput
          id="filled-basic"
          label="Email"
          type="email"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextInput
          id="filled-basic"
          label="Password"
          type="password"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextInput
          id="filled-basic"
          label="Confirm Password"
          type="password"
          variant="standard"
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "100%", height: "3rem", borderRadius: "0.5rem" }}
        >
          <Typography variant="h5" color="white" fontWeight="500">
            Register
          </Typography>
        </Button>
      </PrimaryBox>
      {/* </Grid> */}
    </Grid>
  )
}

export default ChooseHabitsPage
