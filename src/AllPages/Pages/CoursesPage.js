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
        <div>
            <h2>Courses List</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>{course.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CoursesPage;