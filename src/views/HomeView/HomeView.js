import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth";
import { variants } from "../../utils/motionVar";
import styles from "./HomeView.module.css";

const HomeView = () => {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        <motion.h1
          className={styles.title}
          initial="initial"
          animate="animate"
          exit="exit"
          transition="transition"
          variants={variants}
        >
          Welcome 👋
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence>
        <motion.p
          className={styles.text}
          initial="initial"
          animate="animate"
          exit="exit"
          transition="transition"
          variants={variants}
        >
          Now you will exactly not forget your contacts!
        </motion.p>
      </AnimatePresence>
      {!isLoggedIn && (
        <AnimatePresence>
          <motion.p
            className={styles.info}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
            variants={variants}
          >
            Please, <b>Sign up</b> or <b>Log in</b> to have access to the
            Phonebook!
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
};

export default HomeView;
