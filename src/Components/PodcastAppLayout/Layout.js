import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
const Layout = () => {
  return (
    <>
      <div className={styles.title}>
        <Link to="/">
            <h1>Podcaster</h1>
        </Link>
      </div>

      <Outlet />
    </>
  )
};

export default Layout;