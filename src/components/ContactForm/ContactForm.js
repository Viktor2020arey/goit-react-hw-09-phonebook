import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";
import LoaderComponent from "../LoaderComponent";
import styles from "./ContactForm.module.css";

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const checkRepeatName = (name) => {
    return contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const checkRepeatNumber = (number) => {
    return contacts.find((contact) => contact.number === number);
  };

  const checkEmptyQuery = (name, number) => {
    return name.trim() === "" || number.trim() === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetInput();
    if (checkRepeatName(name)) {
      return alert(`🤔 ${name} is already in the phonebook.`);
    } else if (checkRepeatNumber(number)) {
      return alert(`🤔 ${number} is already in the phonebook.`);
    } else if (checkEmptyQuery(name, number)) {
      return alert("😱 Enter the contact's name and number phone!");
    } else {
      dispatch(contactsOperations.addContact(name, number));
    }
  };

  const resetInput = () => {
    setName("");
    setNumber("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
        />
      </label>
      <label className={styles.label}>
        Number
        <NumberFormat
          placeholder="Enter phone number"
          format="(###) ###-##-##"
          mask="_"
          pattern="^[0-9\s\(\)\-]{15}"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={styles.input}
        />
      </label>

      {!isLoading && (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
          className={styles.btn}
        >
          Add contact
        </Button>
      )}

      {isLoading && <LoaderComponent />}
    </form>
  );
}

export default ContactForm;
