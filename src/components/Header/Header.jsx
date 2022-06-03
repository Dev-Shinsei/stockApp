import * as React from "react";
import "./styles.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link className="link" to="/">
              <HomeOutlinedIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          <div>
            <Link className="link" to="/add/product">
              <Button variant="contained">Adiconar Produto</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
