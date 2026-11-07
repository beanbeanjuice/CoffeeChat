import "./globals.scss";

import type {Metadata, Viewport} from "next";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {comfortaa, darkTheme, pacifico} from "@/app/theme";

import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
    await headers();

    const publicUrl = process.env.PUBLIC_URL;

    return {
        title: "CoffeeChat",
        description: "A simple, secure way to share your calendar.",
        metadataBase: publicUrl && URL.canParse(publicUrl) ? new URL(publicUrl) : undefined,
    };
}

export const viewport: Viewport = {
    themeColor: "#FFC0CB",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html lang="en" className={`${pacifico.variable} ${comfortaa.variable}`}>
        <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />

              <main>
                {children}
              </main>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
  );
}
