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

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

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
