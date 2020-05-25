import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { vacationsPut } from "../redux/vacation/vacationActions";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    height: "70vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    overflow: "auto"
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 300
    }
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function EditModal({ modal, setModal }) {
  const [form, setForm] = useState({});

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    setForm({
      ...modal.vacationData,
      dateTo: modal.vacationData.dateTo,
      dateFrom: modal.vacationData.dateFrom
    });
  }, [modal.vacationData]);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <h2 style={{ color: "#555", margin: "10px auto" }}>
              EDIT VACATION
            </h2>
            <TextField
              required
              label="Location"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
            />
            <TextField
              required
              label="Image-Source"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
            />
            <TextField
              required
              label="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              required
              label="description"
              multiline
              rowsMax="4"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                margin="normal"
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
                required
                margin="normal"
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
              <TextField
                required
                type="number"
                label="Price"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
              />
            </MuiPickersUtilsProvider>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                dispatch(vacationsPut(modal.vacationData.id, form));
                setModal({ ...modal, open: false });
              }}
            >
              Send
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
