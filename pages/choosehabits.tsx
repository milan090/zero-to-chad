import * as React from 'react';
import { Button, Grid, Typography, Box, Card, CardActionArea, CardContent, Checkbox } from "@mui/material"
import { NextPage } from "next"
import { PrimaryBox } from "src/client/components/Box.component"
import CircleChecked from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
//BIG TODO: remove hardcoded values and make it dynamic 
const ChooseHabitsPage: NextPage = () => {

  const [cb1, cb1Set] = React.useState(false);
  const [cb2, cb2Set] = React.useState(false);

  const handleClick = () => {
    if (cb1 == true) {
      console.log('Card "Wake Up Early" selected')
    }
    if (cb2 == true) {
      console.log('Card "Workout" selected')
    }
  }


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
        maxWidth="65rem" //30
        sx={{
          display: "flex",
          justifyContent: "center", //center
          flexWrap: "wrap",
          gap: "2rem",
          paddingBottom: "2rem", //8
        }}
      >
        <Typography variant="h4" fontWeight="600" textAlign="center">
            Select Your Habits
        </Typography> 

        <Box 
        sx={{ display: 'flex', gap: 3,  width: 1050 }}>
          <Card
          sx={{ height: 150, width: 230, borderRadius: 4 }}>
            <CardActionArea
            onClick={() => {cb1Set(old => !old)}}>
              <CardContent>
                <Typography fontWeight="600">
                  Wake Up Early
                </Typography>
                <Typography fontWeight="400">
                  lorem ipsum waking early makes you feel fresh and energetic
                </Typography>
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleChecked />}
                  style={{ float: "right", bottom: 106, left: 10 }}
                  checked={cb1}
                  //color="#3297FD"
                />
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
          sx={{ height: 150, width: 230, borderRadius: 4 }}>
            <CardActionArea
            onClick={() => {cb2Set(old => !old)}}>
              <CardContent>
                <Typography fontWeight="600">
                  Workout
                </Typography>
                <Typography fontWeight="400">
                  lorem ipsum waking early makes you feel fresh and energetic
                </Typography>
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleChecked />}
                  style={{ float: "right", bottom: 106, left: 10 }}
                  checked={cb2}
                  //color="#3297FD"
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <Box
        sx={{ display: 'flex', justifyContent: 'space-between',  width: 950, marginTop: 5 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "13rem", height: "2rem", borderRadius: "0.5rem" }}
          >
            <Typography variant="h5" color="white" fontWeight="500">
              Skip
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            sx={{ width: "13rem", height: "2rem", borderRadius: "0.5rem" }}
          >
            <Typography variant="h5" color="white" fontWeight="500">
              Next
            </Typography>
          </Button>
        </Box>
      </PrimaryBox>
      {/* </Grid> */}
    </Grid>
  )
}

export default ChooseHabitsPage