import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user has a valid JWT token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to the dashboard if the user is authenticated
      router.push("/dashboard");
    } else {
      // Redirect to the login page if the user is not authenticated
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AI-Powered Personal Finance Advisor</title>
        <meta
          name="description"
          content="Manage your finances smarter with AI-driven insights."
        />
      </Head>

      <main className={styles.main}>
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to Personal Finance Advisor
        </h1>
        <p className="text-lg text-center mb-8">
          Manage your finances smarter with AI-driven insights.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>

          {!isAuthenticated && (
            <div className="flex space-x-6">
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
