import { RETURN_ERRORS, CLEAR_ERRORS } from "./types";

export const getErrors = (msg, status, id = null) => {
  return {
    type: RETURN_ERRORS,
    payload: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
