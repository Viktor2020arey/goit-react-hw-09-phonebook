import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authOperations, authSelectors } from "../../redux/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LoaderComponent from "../../components/LoaderComponent";
import styles from "./LoginView.module.css";

export default function LoginView() {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.getLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      return alert("💩 Please fill in all fields!");
    }
    dispatch(authOperations.logIn({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
      <TextField
        label="Email"
        variant="outlined"
        color="secondary"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        className={styles.textField}
      />

      <TextField
        label="Password"
        variant="outlined"
        color="secondary"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        className={styles.textField}
      />

      {!isLoading && (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
        >
          Log in
        </Button>
      )}

      {isLoading && <LoaderComponent />}
    </form>
  );
}
