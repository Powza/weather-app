import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

library.add(fab, fas);

export default ({ children, title = "Weather" }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
    <ToastContainer />
  </>
);
