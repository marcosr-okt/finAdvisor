import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar__banner}>
      <Link to={`/`}>&#127968;</Link>
      <div className={styles.navbar__title}>Financial Advisor</div>
    </nav>
  );
}
