import mantineStyles from "@mantine/core/styles.css?url";
import mantineDates from "@mantine/dates/styles.css?url";
import mantineNotifications from "@mantine/notifications/styles.css?url";
import mantineTiptap from "@mantine/tiptap/styles.css?url";
import {
  Button,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  Title,
  Text,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from "react-router";
import classes from "~/styles/NotFound.module.css";
import { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: mantineStyles },
  { rel: "stylesheet", href: mantineDates },
  { rel: "stylesheet", href: mantineNotifications },
  { rel: "stylesheet", href: mantineTiptap },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          {children}
          <ScrollRestoration />
          <Scripts />
        </MantineProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>
              Unable to find the page you requested.
            </Title>
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
            >
              Please check the URL, and failing that, report the issue to us.
            </Text>
            <Group justify="center">
              <Button variant="subtle" size="md" component={Link} to="/">
                Take me back to home page
              </Button>
            </Group>
          </Container>
        );
      default:
        return (
          <Container className={classes.root}>
            <div className={classes.label}>{error.status}</div>
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
            >
              {error.data.message}
            </Text>
          </Container>
        );
    }
  }
  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error";
  if (error?.message) {
    errorMessage = error.message;
  }

  return (
    <Container className={classes.root}>
      <div className={classes.label}>Error</div>
      <Title className={classes.title}>Something went wrong.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {errorMessage}
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
