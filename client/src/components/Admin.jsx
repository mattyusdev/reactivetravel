import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import NewVacation from "./NewVacation";
import Navbar from "./Navbar";
import Charts from "./Charts";
import {
  vacationsGet,
  vacationsAdminNotAdded
} from "../redux/vacation/vacationActions";
import { Redirect } from "react-router-dom";
import Page404 from "./Page404";

export default function Admin() {
  const { isAdmin } = useSelector(state => state.user.userData);
  const { isAdded } = useSelector(state => state.vacation);
  const dispatch = useDispatch();

  useSelector(state => state.user.isLogged);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(vacationsGet(true));
      dispatch(vacationsAdminNotAdded());
    }
  }, []);

  return isAdmin ? (
    <div className="admin-frame">
      <Navbar />
      <main className="admin-items">
        <NewVacation />
        <Charts />
      </main>
      {isAdded ? <Redirect to="/" /> : null}

      {localStorage.token ? null : <Redirect to="/login" />}
    </div>
  ) : (
    <Page404 text="Not Authorized." />
  );
}
