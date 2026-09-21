import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MainLayout() {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer
                email="info@lucienaparis.com"
                phone="+33 1 23 45 67 89"
            />
        </>
    );
}

export default MainLayout;