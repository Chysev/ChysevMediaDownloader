import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/core/styles/Accordion.css";
import { createTheme, MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
