import React, { useState, useEffect } from "react";
import Header from "../components/header";
import "../styles/globals.css";
import Login from "./auth/login";
import Register from "./auth/register";
import useAuthState from "../store/authStore";
import Sidebar from "../components/sidebar";
import functionStore from "../store/functionStore";

function MyApp({ Component, pageProps }) {
  const { logged, submitLogout } = useAuthState();
  const { event, fetchEvent } = functionStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  useEffect(() => {
    logged?.userName ? setIsAuthenticated(true) : null;
    logged ? fetchEvent(logged?._wCode?._ref) : null;
  }, [logged]);

  return (
    <div className={`overflow-x-hidden min-h-screen overflow-y-auto `}>
      {isAuthenticated ? (
        <div
          className={`flex min-h-screen flex-col overflow-x-hidden overflow-y-auto pb-24`}
        >
          <Header />
          <div className={`flex lg:w-[70%] w-full min-h-screen mx-auto py-10`}>
            <div className="sm:min-w-[5rem] w-0 md:min-w-[15rem] ease-in-out duration-300">
              <Sidebar />
            </div>
            <Component {...pageProps} />
          </div>
        </div>
      ) : isRegistering ? (
        <Register setIsRegistering={setIsRegistering} />
      ) : (
        <Login
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
        />
      )}
    </div>
  );
}

export default MyApp;
