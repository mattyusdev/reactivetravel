import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { vacationsPost } from "../redux/vacation/vacationActions";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80%"
    }
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function NewVacation() {
  const [form, setForm] = useState({ dateFrom: null, dateTo: null });

  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div className="add-vacation">
      <h1 style={{ color: "#555" }}>ADD VACATION</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(vacationsPost(form));
        }}
        className={classes.root}
        autoComplete="off"
      >
        <TextField
          required
          label="Location"
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <TextField
          required
          label="Image-Source"
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <TextField
          required
          label="Title"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <TextField
          required
          label="description"
          multiline
          rowsMax="4"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            required
            label="Date From"
            format="dd/MM/yyyy"
            value={form.dateFrom}
            onChange={e => {
              setForm({ ...form, dateFrom: e });
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            required
            label="Date To"
            format="dd/MM/yyyy"
            value={form.dateTo}
            onChange={e => {
              setForm({ ...form, dateTo: e });
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          required
          type="number"
          label="Price"
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Send
        </Button>
      </form>
    </div>
  );
}
