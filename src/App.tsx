import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import TourPage from "./pages/TourPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="visites/:slug" element={<TourPage />} />
      </Route>
    </Routes>
  );
}

export default App;