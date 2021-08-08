import axios from "axios";
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from "./contacts-actions";

export const fetchContacts = () => (dispatch) => {
  dispatch(fetchContactsRequest());

  axios
    .get("/contacts")
    .then(({ data }) => dispatch(fetchContactsSuccess(data)))
    .catch((error) => {
      dispatch(fetchContactsError(error));

      if (error.response.status === 404) {
        alert("There is no such user's collection!");
      } else if (error.response.status === 500) {
        alert("Oops! Server error! Please try later!");
      } else {
        alert("Something went wrong! Please reload the page!");
      }
    });
};

export const addContact = (name, number) => (dispatch) => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactRequest());

  axios
    .post("/contacts", contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch((error) => {
      dispatch(addContactError(error));

      if (error.response.status === 400) {
        alert("Contact creation error!");
      } else {
        alert("Something went wrong! Please reload the page!");
      }
    });
};

export const deleteContact = (contactId) => (dispatch) => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSuccess(contactId)))
    .catch((error) => {
      dispatch(deleteContactError(error));

      if (error.response.status === 404) {
        alert("There is no such user's collection!");
      } else if (error.response.status === 500) {
        alert("Oops! Server error! Please try later!");
      } else {
        alert("Something went wrong! Please reload the page!");
      }
    });
};
