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
import { SEO } from "config/seo.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "config/firebase.config";
import { useUserStore } from "src/client/store/user.store";
import { doc, DocumentReference, onSnapshot } from "firebase/firestore";
import { UserDoc } from "src/types/User.types";
import { useEffect } from "react";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const [setUser, setLoading] = useUserStore(({ setUser, setLoading }) => [
    setUser,
    setLoading,
  ]);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [user, authLoading] = useAuthState(auth);

  useEffect(() => {
    if (!authLoading) {
      console.log(user);
      if (user) {
        const docRef = doc(db, "users", user.uid) as DocumentReference<UserDoc>;

        const unsub = onSnapshot(docRef, (doc) => {
          setLoading(true);
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log("Loaded user from:", source);
          const userData = doc.data();
          console.log(userData);
          if (userData) {
            setUser({
              username: userData.username,
              email: user.email as string,
              uid: user.uid,
              habits: userData.habits || [],
              hasCompletedOnBoarding: userData?.hasCompletedOnBoarding || false,
              topics:
                userData.topics?.length !== 0
                  ? userData.topics
                  : ["philosophy", "finance", "self-improvement", "technology"],
              lastReadCollectionId: userData.lastReadCollectionId || "",
            });
          }
          setLoading(false);
        });

        return unsub;
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  return (
    <>
      <DefaultSeo
        title={pageProps?.seo?.title || SEO.DEFAULT_TITLE}
        titleTemplate={SEO.DEFAULT_TITLE_TEMPLATE}
        description={SEO.DEFAULT_DESCRIPTION}
        // canonical={url}
        openGraph={{
          type: "website",
          locale: "en_US",
          // url,
          site_name: SEO.SITE_NAME,
          title: SEO.SITE_NAME,
          description: SEO.DEFAULT_DESCRIPTION,
          images: [
            {
              url: SEO.DEFAULT_OG_IMAGE,
              alt: SEO.SITE_NAME,
            },
          ],
        }}
        twitter={{
          handle: SEO.TWITTER_HANDLE,
          site: SEO.TWITTER_HANDLE,
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "shortcut icon",
            href: SEO.FAVICON_LINK,
          },
        ]}
      />
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
