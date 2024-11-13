// _app.tsx
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import Layout from "./layout";
import { TokenProps } from "@/types/global";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [token, setToken] = useState<TokenProps["token"]>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      router.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
      router.push("/dashboard");
    }
  }, [token]);

  const handleLogout = (): void => {
    sessionStorage.removeItem("token");
    setToken(null);
    router.push("/"); // Redirect to home page on logout
  };

  return (
    <Layout token={token} handleLogout={handleLogout}>
      <Component {...pageProps} token={token} setToken={setToken} />
    </Layout>
  );
}
