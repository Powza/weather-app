import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default ({ children, title = "Weather" }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
    <ToastContainer />
  </>
);
