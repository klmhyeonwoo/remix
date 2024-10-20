import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment } from "react";

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/feeed.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="true"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
        <meta name="viewport" content="width=device-width" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.feeed.kr/" />
        <meta property="og:title" content="feeed" />
        <meta property="og:image" content="https://raw.githubusercontent.com/klmhyeonwoo/Archieve/main/feeed-og.png" />
        <meta property="og:description" content="유명 개발자, 네카라쿠배 개발자들의 블로그 모음 서비스 - feeed" />
        <meta property="og:site_name" content="feeed" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="description" content="유명 개발자, 네카라쿠배 개발자들의 블로그 모음 서비스 - feeed" />
        <title>feeed</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </Fragment>
  );
}
