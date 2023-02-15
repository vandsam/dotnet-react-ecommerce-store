import "./styles.css";
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const toggleModeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header toggleModeChange={toggleModeChange} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
