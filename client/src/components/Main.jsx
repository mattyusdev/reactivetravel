import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Vacation from "./Vacation";
import EditModal from "./EditModal";

import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  vacationsGet,
  vacationsAdminNotAdded
} from "../redux/vacation/vacationActions";

export default function Main() {
  const [modal, setModal] = useState({ open: false, vacationData: {} });

  const { isAdmin } = useSelector(state => state.user.userData);
  const { vacations } = useSelector(state => state.vacation);
  const dispatch = useDispatch();

  useSelector(state => state.user.isLogged);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(vacationsGet(true));
      dispatch(vacationsAdminNotAdded());
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Searchbar />
      <main>
        {vacations.map(v => (
          <Vacation setModal={setModal} key={v.id} vac={v} />
        ))}
      </main>
      {isAdmin ? <EditModal modal={modal} setModal={setModal} /> : null}
      {localStorage.token ? null : <Redirect to="/login" />}
    </div>
  );
}
