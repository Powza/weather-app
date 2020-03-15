import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default ({ children, title = "Weather" }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
    <ToastContainer />
  </>
);
