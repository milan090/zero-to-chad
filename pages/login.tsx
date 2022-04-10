import { Button, Grid, Typography } from "@mui/material"
import { NextPage } from "next"
import { PrimaryBox } from "src/client/components/Box.component"
import { TextInput } from "src/client/components/TextInput.component"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

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
      <PrimaryBox width="100%" maxWidth="30rem">
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            paddingBottom: "8rem",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h4" fontWeight="600" textAlign="center">
            Login
          </Typography>
          <TextInput
            id="filled-basic"
            label="Email"
            variant="standard"
            type="email"
            sx={{ width: "100%" }}
            {...register("email", { required: "This is required" })}
            error={!!errors.email?.message}
          />
          <TextInput
            id="filled-basic"
            label="Password"
            variant="standard"
            type="password"
            sx={{ width: "100%" }}
            {...register("password", {
              required: "This is required",
              minLength: {
                message: "Password should be atleast 6 characters long",
                value: 6,
              },
              maxLength: 24,
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%", height: "3rem", borderRadius: "0.5rem" }}
            type="submit"
          >
            <Typography variant="h5" color="white" fontWeight="500">
              Login
            </Typography>
          </Button>
        </form>
      </PrimaryBox>
      {/* </Grid> */}
    </Grid>
  )
}

export default LoginPage
