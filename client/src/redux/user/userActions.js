import {
  USERS_LOGIN,
  USERS_LOGOUT,
  USERS_POST_REQUEST,
  USERS_POST_SUCCESS,
  USERS_POST_FAILURE,
  USERS_REGISTERED,
  USERS_NOTREGISTERED,
} from "./userTypes";

export const usersPostLogin = (form) => {
  return async (dispatch) => {
    dispatch(usersPostRequest());
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const token = await response.text();
      localStorage.setItem("token", token);
      usersPostSuccess({});
      dispatch(usersLogin());
    } else {
      const res = await response.text();
      dispatch(usersPostFailure(res));
    }
  };
};

export const usersPostRegister = (form) => {
  return async (dispatch) => {
    dispatch(usersPostRequest());
    const response = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      usersPostSuccess({});
      dispatch(usersRegistered());
    } else {
      const res = await response.text();
      dispatch(usersPostFailure(res));
    }
  };
};

export const usersPostRequest = () => {
  return { type: USERS_POST_REQUEST };
};

export const usersPostSuccess = (userData) => {
  return { type: USERS_POST_SUCCESS, payload: userData };
};

export const usersPostFailure = (response) => {
  return { type: USERS_POST_FAILURE, payload: response };
};

export const usersLogin = () => {
  return { type: USERS_LOGIN };
};

export const usersLogout = () => {
  localStorage.clear();
  return { type: USERS_LOGOUT };
};

export const usersRegistered = () => {
  return { type: USERS_REGISTERED };
};

export const usersNotRegistered = () => {
  return { type: USERS_NOTREGISTERED };
};
