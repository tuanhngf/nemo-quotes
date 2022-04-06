import axios from "axios";
import Swal from "sweetalert2";
import { API } from "../utils/config";
import { SweetAlertSuccessful } from "../models/SweetAlertModels";
import { SweetAlertFailure } from "../models/SweetAlertModels";

const alertSuccess = new SweetAlertSuccessful();
const alertFailure = new SweetAlertFailure();

export const getQuotesAction = () => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: "LOADING_TRUE",
      });

      let result = await axios.get(API);

      dispatch({
        type: "GET_QUOTES",
        quotesList: result.data.quotes.reverse(),
      });

      await dispatch({
        type: "LOADING_FALSE",
      });
    } catch (error) {
      Swal.fire({
        ...alertFailure,
      });
      console.log(error);
    }
  };
};

export const createQuotesAction = (formData) => async (dispatch) => {
  try {
    await axios.post(API, formData);

    await Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getQuotesAction());
      },
    });

    window.location.reload();
  } catch (error) {
    Swal.fire({
      ...alertFailure,
    });
    console.log(error);
  }
};

export const updateQuotesAction = (formData, id) => async (dispatch) => {
  try {
    await axios.put(`${API}/${id}`, formData);

    await Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getQuotesAction());
      },
    });

    window.location.reload();
  } catch (error) {
    Swal.fire({
      ...alertFailure,
    });
    console.log(error);
  }
};

export const deleteQuotesAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API}/${id}`);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getQuotesAction());
      },
    });
  } catch (error) {
    Swal.fire({
      ...alertFailure,
    });
    console.log(error);
  }
};
