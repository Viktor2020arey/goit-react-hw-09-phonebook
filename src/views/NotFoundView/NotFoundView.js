import errorImage from "../../components/img/error.jpg";
import styles from "./NotFoundView.module.css";

export default function NotFoundView() {
  return (
    <main role="alert" className={styles.main}>
      <img src={errorImage} width="650" alt="Error" className={styles.img} />
      <h1 className={styles.title}>Page not found 😨</h1>
    </main>
  );
}
