import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { usersPostFailure, usersPostLogin } from "../redux/user/userActions";
import { Card, CardContent, TextField, Button } from "@material-ui/core";

export default function Login() {
  const [form, setForm] = useState({});

  const { response } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useSelector(state => state.user.isLogged);

  useEffect(() => {
    dispatch(usersPostFailure(false));
  }, []);

  return (
    <div className="user-frame">
      <Card className="card-frame">
        <CardContent>
          <h1 style={{ color: "#555" }}>LOGIN</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              dispatch(usersPostLogin(form));
            }}
          >
            {response ? (
              <>
                <span style={{ color: "tomato" }}>{response}</span>
                <br />
              </>
            ) : null}
            <TextField
              required
              className="input"
              label="Username..."
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
            <br />
            <TextField
              required
              className="input"
              type="password"
              label="Password..."
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ margin: "20px" }}
            >
              Login
            </Button>
            <br />
            <span>Not a user? </span>
            <Link to="/register">register</Link>
          </form>
          {localStorage.token ? <Redirect to="/" /> : null}
        </CardContent>
      </Card>
    </div>
  );
}
