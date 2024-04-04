// import { ReactComponent as TodoIcon } from "../assets/tick_box.svg";
import styles from "../styles/Header.module.scss";
import { FaTasks } from "react-icons/fa";

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.appTitle}>
          <FaTasks />
          <span>Task Management Application</span>
        </h2>
      </header>
    </div>
  );
};

export default Header;
