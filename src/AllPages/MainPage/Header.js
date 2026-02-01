import React from "react";
import "./MainPageCss/header.css";
import CoursesPage from "../Pages/CoursesPage";
import StudentsPage from "../Pages/StudentsPage";
import EnrollmentPage from "../Pages/EnrollmentPage";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header-background">
            <div className="header-container">
                <h1 className="header-logo">School Web</h1>

                <nav className="header-nav">
                    <Link to="/courses">Courses</Link>
                    <Link to="/students">Students</Link>
                    <Link to="/enrollment">Enrollment</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
