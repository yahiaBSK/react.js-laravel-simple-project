import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./layouts/navbar/navbar";
import Footer from "./layouts/footer/footer";
import About from "./Pages/About.jsx";
import Students from "./Pages/Students.jsx";
import StudentInfo from "./Pages/StudentInfo.jsx";
import Home from "./Pages/Home.jsx";
import { useEffect, useState } from "react";
import StudentEdit from "./Pages/StudentEdit.jsx";

function App() {
  const [themeIcon, setThemeIcon] = useState(null);
  const currentTheme = localStorage.getItem("themeMode");

  useEffect(() => {
    if (currentTheme) {
      document.body.className = currentTheme;
      if (currentTheme === "dark text-foreground bg-background") {
        setThemeIcon("☀️");
      } else {
        setThemeIcon("🌜");
      }
    } else {
      setThemeIcon("☀️");
      console.log("no theme was in local storage");
    }
  }, []);

  const themeHandler = () => {
    if (document.body.className == "dark text-foreground bg-background") {
      setThemeIcon("🌜");
      localStorage.setItem("themeMode", "light text-foreground bg-background");
      document.body.className = "light text-foreground bg-background";
    } else {
      setThemeIcon("☀️");
      localStorage.setItem("themeMode", "dark text-foreground bg-background");
      document.body.className = "dark text-foreground bg-background";
    }
  };

  return (
    <div>
      <BrowserRouter>
        <NavBar themeMode={themeHandler} themeIcon={themeIcon} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:student_id" element={<StudentInfo />} />
          {/* <Route path="/students/:student_id/edit" element={<StudentEdit />} /> */}
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
