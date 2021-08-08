import { useSelector, useDispatch } from "react-redux";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "../../utils/motionVar";
import styles from "./ContactList.module.css";

function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(contactsSelectors.getVisibleContacts);
  const contacts = useSelector(contactsSelectors.getContacts);

  return (
    <>
      {contacts.length > 0 && (
        <motion.ul className={styles.list}>
          <AnimatePresence>
            {visibleContacts.map(({ id, name, number }) => (
              <motion.li
                className={styles.item}
                key={id}
                initial="initial"
                animate="animate"
                exit="exit"
                transition="transition"
                variants={variants}
              >
                <p className={styles.text}>
                  {name}: {number}
                </p>
                <IconButton
                  className={styles.btn}
                  aria-label="delete"
                  color="secondary"
                  type="button"
                  onClick={() => dispatch(contactsOperations.deleteContact(id))}
                >
                  <DeleteIcon />
                </IconButton>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {!contacts.length && (
        <AnimatePresence>
          <motion.p
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
            variants={variants}
          >
            Your phonebook is empty. Please add contact.
          </motion.p>
        </AnimatePresence>
      )}
    </>
  );
}

export default ContactList;
