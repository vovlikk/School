import "../PagesCss/CoursesPage.css"
import React, { useEffect, useState } from "react";
import CoursesService from "../../Service/CoursesService";

function CoursesPage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await CoursesService.getCourses();
            setCourses(data);
        };

        fetchCourses();
    }, []);

    return (
        <div className="courses-page-background ">
            <div className="courses-page-container">
                <div className="courses-page-section">

                    <div className="courses-page-list">
                        <h2>Courses List</h2>
                        <ul>
                            {courses.map((course) => (
                                <li key={course.id}>{course.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="courses-page-add-new-course">

                    </div>

                    <div className="courses-page-delete-course">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursesPage;