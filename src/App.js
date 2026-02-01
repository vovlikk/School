import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from './AllPages/LandingPage';
import CoursesPage from './AllPages/Pages/CoursesPage';
import StudentsPage from './AllPages/Pages/StudentsPage';
import EnrollmentPage from './AllPages/Pages/EnrollmentPage';
import Header from './AllPages/MainPage/Header';

function App() {
  return (
    <>
      <Header/>

             <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/enrollment" element={<EnrollmentPage />} />
            </Routes>
    </>
  );
}

export default App;
