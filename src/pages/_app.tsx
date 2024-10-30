import { AppProps } from "next/app";
import { useState, useEffect } from "react";
import "../styles/globals.css"; // Assuming you have global styles
import Layout from "./layout";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Manage the token state globally
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null,
  );

  useEffect(() => {
    // Sync token with localStorage when it changes
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Handle logout
  const handleLogout = () => {
    router.push("/");
    setToken(null);
  };

  return (
    // Wrap all pages in the Layout component
    <Layout token={token} handleLogout={handleLogout}>
      <Component {...pageProps} token={token} setToken={setToken} />
    </Layout>
  );
}
