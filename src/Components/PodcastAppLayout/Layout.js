import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
const Layout = () => {
  return (
    <>
      <div >
        <Link className={styles.title} to="/">
            <h1>Podcaster</h1>
        </Link>
      </div>

      <Outlet />
    </>
  )
};

export default Layout;