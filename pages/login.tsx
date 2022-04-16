import { Button, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import { PrimaryBox } from "src/client/components/Box.component";
import { TextInput } from "src/client/components/TextInput.component";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "config/firebase.config";
import Router from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const error = err as { code: string };
    console.log(error.code);
    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      throw {
        type: "password",
        message: "Invalid email and password combination",
      };
    }
  }
};

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    login(email, password)
      .then(() => {
        Router.push("/dashboard");
      })
      .catch((err) => {
        const error = err as { type: string; message: string };
        if (error.type === "password") {
          setError("password", { message: error.message });
        }
      });
  };
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) Router.push("/dashboard");
  }, [user]);

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
            gap: "1rem",
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
          <Typography>
            Not Registered yet?
            <Link href="/signup" passHref>
              <a> Sign Up</a>
            </Link>
          </Typography>
        </form>
      </PrimaryBox>
      {/* </Grid> */}
    </Grid>
  );
};

export default LoginPage;
