import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import { PrimaryBox } from "src/client/components/Box.component";
import { TextInput } from "src/client/components/TextInput.component";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "config/firebase.config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { FirebaseError } from "firebase/app";
import Router from "next/router";
import Link from "next/link";
import { useUserStore } from "src/client/store/user.store";

type Inputs = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

const createUser = async (user: User, username: string) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      username,
      habits: [],
      hasCompletedOnBoarding: false,
    });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async ({ email, password, username }: Inputs) => {
  try {
    const q = await getDocs(
      query(collection(db, "users"), where("username", "==", username))
    );

    if (!q.empty) throw { code: "auth/username" };

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    createUser(user, username);
  } catch (err) {
    const error = err as FirebaseError;
    const code = error?.code;
    console.log(error);
    if (code === "auth/email-already-in-use") {
      throw { type: "email", message: "Email already in user" };
    } else if (code == "auth/username") {
      throw { type: "username", message: "Account with this username exists" };
    }
  }
};

const SignupPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const password = useRef({});
  password.current = watch("password", "");
  const [loading, setLoading] = useState(false);
  const [userUid, hasCompletedOnBoarding] = useUserStore((state) => [
    state.uid,
    state.hasCompletedOnBoarding,
  ]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await signUp(data);
    } catch (err) {
      const error = err as { type: string; message: string };
      console.log("err", error);
      if (error.type === "email") {
        setError("email", { message: error.message });
      } else if (error.type == "username") {
        setError("username", { message: error.message });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(userUid);
    if (userUid) {
      if (!hasCompletedOnBoarding) {
        Router.push("/choosetopics");
      } else {
        Router.push("/dashboard");
      }
    }
  }, [userUid]);

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
            Join Us Now!
          </Typography>
          <TextInput
            id="username"
            label="Username"
            variant="standard"
            sx={{ width: "100%" }}
            {...register("username", { required: "This is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextInput
            id="email"
            label="Email"
            variant="standard"
            type="email"
            sx={{ width: "100%" }}
            {...register("email", { required: "This is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
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
              maxLength: {
                value: 24,
                message: "Password should not be longer than 24 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextInput
            id="cpassword"
            label="Confirm Password"
            variant="standard"
            type="password"
            sx={{ width: "100%" }}
            {...register("cpassword", {
              required: "This is required",
              validate: (value) =>
                value === password.current || "Passwords don't match",
            })}
            error={!!errors.cpassword}
            helperText={errors.cpassword?.message}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%", height: "3rem", borderRadius: "0.5rem" }}
            type="submit"
          >
            <Typography variant="h5" color="white" fontWeight="500">
              {loading ? <CircularProgress /> : "Sign Up"}
            </Typography>
          </Button>
          <Typography>
            Have an existing account?
            <Link href="/login" passHref>
              <a> Login</a>
            </Link>
          </Typography>
        </form>
      </PrimaryBox>
      {/* </Grid> */}
    </Grid>
  );
};

export default SignupPage;
