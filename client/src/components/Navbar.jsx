import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { usersLogout } from "../redux/user/userActions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  button: {
    padding: 0,
    marginLeft: 15
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    margin: 15,
    fontWeight: 700
  },
  seperator: {
    margin: 20
  }
}));

export default function Navbar() {
  const { username, isAdmin } = useSelector(state => state.user.userData);
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <h3>ReactiveTravel</h3>
          <h3 className={classes.seperator}>|</h3>
          <h4>Hello {username}</h4>
          <Typography className={classes.title}></Typography>
          {isAdmin ? (
            <>
              <Link className={classes.link} to="/">
                Home
              </Link>
              <Link className={classes.link} to="/admin">
                Control Panel
              </Link>
            </>
          ) : null}
          <Button
            className={classes.button}
            onClick={() => dispatch(usersLogout())}
            variant="contained"
            color="default"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
