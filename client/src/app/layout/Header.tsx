import { AppBar, Toolbar, Typography, Switch } from "@mui/material";

interface Props {
  toggleModeChange: () => void;
}

export default function Header({ toggleModeChange }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">E-COMMERCE STORE</Typography>
        <Switch onChange={toggleModeChange} />
      </Toolbar>
    </AppBar>
  );
}
