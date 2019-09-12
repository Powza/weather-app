import Head from "next/head";

export default ({ children, title = "Weather" }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </>
);
