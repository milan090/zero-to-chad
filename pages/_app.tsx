import * as React from "react";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import createEmotionCache from "../utility/createEmotionCache";
import { lightThemeOptions } from "../styles/theme/lightThemeOptions";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import { Toaster } from "react-hot-toast";

// import your default seo configuration
import { SEO } from "../config/seo.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "config/firebase.config";
import { useUserStore } from "src/client/store/user.store";
import { doc, DocumentReference, getDoc } from "firebase/firestore";
import { UserDoc } from "src/types/User.types";
import { useEffect } from "react";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const [user] = useAuthState(auth);
  const { setUser } = useUserStore(({ setUser }) => ({ setUser }));
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", user.uid) as DocumentReference<UserDoc>;
      getDoc<UserDoc>(docRef).then((res) => {
        const username = res.data()?.username;
        if (username) {
          setUser({
            username,
            email: user.email as string,
            uid: user.uid,
          });
        }
      });
    }
  }, [user]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
          <Toaster />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
