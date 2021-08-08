import { useSelector, useDispatch } from "react-redux";
import { authSelectors, authOperations } from "../../redux/auth";
import Button from "@material-ui/core/Button";
import defaultAvatar from "../../components/img/avatar.png";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  return (
    <div className={styles.container}>
      <img
        src={defaultAvatar}
        alt="Default Avatar"
        width="32"
        className={styles.avatar}
      />
      <span className={styles.name}>Welcome, {name}</span>
      <Button
        className={styles.btn}
        color="secondary"
        variant="outlined"
        type="button"
        onClick={() => dispatch(authOperations.logOut())}
      >
        Log out
      </Button>
    </div>
  );
}
