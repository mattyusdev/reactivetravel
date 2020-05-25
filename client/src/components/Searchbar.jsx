import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  vacationsPostSearch,
  vacationsGet
} from "../redux/vacation/vacationActions";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    padding: 2,
    margin: 5
  },
  div: {
    padding: 30
  }
}));

export default function Searchbar() {
  const [form, setForm] = useState({ text: "", dateFrom: null, dateTo: null });
  const [req, setReq] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div className={classes.div}>
      <form
        className="search"
        onSubmit={e => {
          e.preventDefault();
          dispatch(vacationsPostSearch(form));
        }}
      >
        <TextField
          label="Keywords"
          value={form.text}
          onChange={e => setForm({ ...form, text: e.target.value })}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            required={req}
            label="Date From"
            format="dd/MM/yyyy"
            value={form.dateFrom}
            onChange={e => {
              if (e) setReq(true);
              setForm({ ...form, dateFrom: e });
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardDatePicker
            required={req}
            label="Date To"
            format="dd/MM/yyyy"
            value={form.dateTo}
            onChange={e => {
              if (e) setReq(true);
              setForm({ ...form, dateTo: e });
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={e => {
            e.preventDefault();
            setReq(false);
            setForm({ text: "", dateFrom: null, dateTo: null });
            dispatch(vacationsGet(false));
          }}
          type="reset"
        >
          RESET
        </Button>
      </form>
    </div>
  );
}
