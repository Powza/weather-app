import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";

export default ({ children, title = "Weather" }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </>
);
