import "@/styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <div className="font-montserrat">
      <Layout>
        <div className="2xl:w-[1400px] 2xl:mx-auto">
           <Component {...pageProps} />
        </div>
       
      </Layout>
    </div>
  );
}
