import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import ReactGA from "react-ga";

const queryClient = new QueryClient();
const googleTrackingId = import.meta.env.VITE_GOOGLE_ANALYTICS as string;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/feeed.svg" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="true"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
        {googleTrackingId && (
          <Fragment>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTrackingId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${googleTrackingId}');
                `,
              }}
            />
          </Fragment>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(googleTrackingId);
  }, []);

  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location]);
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </Fragment>
  );
}
