import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../Header";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;