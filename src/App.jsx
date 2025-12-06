
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import { Outlet } from "react-router-dom"
import { AuthContext } from "./components/context/AuthContextComponent"
import { useContext, useEffect } from "react";
import { GetUserInfo } from "./components/service/api.service";
import { Spin } from "antd";

function App() {
  const { setUser, appLoading, setAppLoading } = useContext(AuthContext);

  const getUserInformation = async () => {
    // await new Promise(resolve => setTimeout(resolve, 5000));

    const response = await GetUserInfo();
    if (response.data) {
      setUser(response.data.user);
    }
    setAppLoading(false);
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    appLoading === true ?
      <>
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          <Spin />
        </div>
      </>
      :
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
  )
}

export default App
