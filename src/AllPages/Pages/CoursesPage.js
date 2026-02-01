import "../PagesCss/CoursesPage.css"
import React, { useEffect, useState } from "react";
import CoursesService from "../../Service/CoursesService";

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await CoursesService.getCourses();
            setCourses(data);
        };

        fetchCourses();
    }, []);

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const newCourse = await CoursesService.addCourse({
                title: courseTitle,
                description: courseDescription,
            });
            if (newCourse) {
                setCourses([...courses, ...newCourse]);
                setCourseTitle("");
                setCourseDescription("");
            }
            alert("Course added successfully!");
        } catch(err) {
            setError("Failed to add course.");
        }
    };

    return (
        <div className="courses-page-background">
            <div className="courses-page-container">
                <div className="courses-page-sections">

                    <div className="courses-page-list">
                        <h2>Courses List</h2>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        {courses.length === 0 ? <p>No courses found.</p> : (
                        <ul>
                            {courses.map((course) => (
                                <li key={course.id}>{course.name}{course.title} {course.description}
                                    <button onClick={async() =>{
                                        await CoursesService.deleteCourse(course.id);
                                        setCourses(courses.filter(c => c.id !== course.id));
                                    }}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>

                    <div className="courses-page-add-new-course">
                        <h3>Add New Course</h3>
                        <form onSubmit={handleAddCourse}>
                            <input
                                type="text"
                                placeholder="Course Name"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Course Description"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                required
                            />
                            <button type="submit">Add Course</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CoursesPage;
