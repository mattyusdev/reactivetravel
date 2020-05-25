import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  usersPostRegister,
  usersPostFailure,
  usersNotRegistered
} from "../redux/user/userActions";
import { Card, CardContent, TextField, Button } from "@material-ui/core";

export default function Register() {
  const [form, setForm] = useState({});

  const { isRegistered, response } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useSelector(state => state.user.isLogged);

  useEffect(() => {
    dispatch(usersNotRegistered());
    dispatch(usersPostFailure(false));
  }, []);

  return (
    <div className="user-frame">
      <Card className="card-frame">
        <CardContent>
          <h1 style={{ color: "#555" }}>REGISTER</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              dispatch(usersPostRegister(form));
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
              label="First Name..."
              onChange={e => setForm({ ...form, firstName: e.target.value })}
            />
            <br />
            <TextField
              required
              label="Last Name..."
              onChange={e => setForm({ ...form, lastName: e.target.value })}
            />
            <br />
            <TextField
              required
              label="Username..."
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
            <br />
            <TextField
              required
              type="email"
              label="Email..."
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <br />
            <TextField
              required
              type="password"
              label="Password..."
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <br />
            <Button
              required
              type="submit"
              variant="contained"
              color="secondary"
              style={{ margin: "20px" }}
            >
              Register
            </Button>{" "}
            <br />
          </form>
          <span>User?</span>
          <Link to="/login">login</Link>
          {localStorage.token ? <Redirect to="/" /> : null}
          {isRegistered ? <Redirect to="/login" /> : null}
        </CardContent>
      </Card>
    </div>
  );
}
