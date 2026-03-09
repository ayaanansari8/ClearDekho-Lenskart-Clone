export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

const initialState = {
  isLoading: false,
  isError: false,
  isAuth: JSON.parse(localStorage.getItem("auth")) || false,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  token: localStorage.getItem("token") || "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isAdmin: payload.isAdmin || false,
        userData: payload.user,
        token: payload.token,
        isError: false,
      };

    case LOGOUT:
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("isAdmin");
      return {
        ...state,
        isAuth: false,
        isAdmin: false,
        userData: null,
        token: "",
      };

    default:
      return state;
  }
};