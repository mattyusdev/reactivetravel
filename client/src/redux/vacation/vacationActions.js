import {
  VACATION_GET_REQUEST,
  VACATION_GET_SUCCESS,
  VACATION_GET_FAILURE,
  VACATION_ADMIN_ADDED,
  VACATION_ADMIN_ADDEDFALSE,
} from "./vacationTypes";
import { usersPostSuccess, usersLogout, usersLogin } from "../user/userActions";

export const vacationsGet = (isInit) => {
  return async (dispatch) => {
    dispatch(vacationsGetRequest());
    const response = await fetch("/api/vacations", {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (isInit) {
        dispatch(usersLogin());
        dispatch(usersPostSuccess(data[0]));
      }
      dispatch(vacationsGetSuccess(data[1]));
    } else {
      if (isInit) dispatch(usersLogout());
      dispatch(vacationsGetFailure());
    }
  };
};

export const vacationsGetRequest = () => {
  return { type: VACATION_GET_REQUEST };
};

export const vacationsGetSuccess = (vacations) => {
  return { type: VACATION_GET_SUCCESS, payload: vacations };
};

export const vacationsGetFailure = () => {
  return { type: VACATION_GET_FAILURE };
};

export const vacationsAdminAdded = () => {
  return { type: VACATION_ADMIN_ADDED };
};

export const vacationsAdminNotAdded = () => {
  return { type: VACATION_ADMIN_ADDEDFALSE };
};

export const vacationsPutFollow = (userId, vacationId, isFollow) => {
  return async (dispatch) => {
    const response = await fetch(`/api/vacations/${vacationId}/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify({
        userId,
        add: isFollow,
      }),
    });

    if (response.ok) {
      dispatch(vacationsGet(false));
    }
  };
};

export const vacationsPut = (vacationId, form) => {
  return async (dispatch) => {
    const response = await fetch(`/api/vacations/${vacationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      dispatch(vacationsGet(false));
    }
  };
};

export const vacationsDelete = (vacationId) => {
  return async (dispatch) => {
    const response = await fetch(`/api/vacations/${vacationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });

    if (response.ok) {
      dispatch(vacationsGet(false));
    }
  };
};

export const vacationsPostSearch = (form) => {
  return async (dispatch) => {
    const response = await fetch(`/api/vacations/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(vacationsGetSuccess(data));
    }
  };
};

export const vacationsPost = (form) => {
  return async (dispatch) => {
    const response = await fetch(`/api/vacations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      dispatch(vacationsAdminAdded());
    }
  };
};
