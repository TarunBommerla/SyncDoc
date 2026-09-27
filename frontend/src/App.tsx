import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DocumentPage from "./pages/DocumentPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents" element={<DocumentPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
