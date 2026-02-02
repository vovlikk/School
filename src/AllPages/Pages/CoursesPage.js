import "../PagesCss/CoursesPage.css";
import React, { useEffect, useState } from "react";
import CoursesService from "../../Service/CoursesService";

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseStartTime, setCourseStartTime] = useState(""); 

    const [edditCourseTitle, setEdditCourseTitle] = useState("");
    const [edditCourseDescription, setEdditCourseDescription] = useState("");
    const [edditCourseStartTime, setEdditCourseStartTime] = useState("");

    const [editingCourseId, setEditingCourseId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await CoursesService.getCourses();
                setCourses(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCourses();
    }, []);

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setError(null);

        if (!courseTitle || !courseDescription || !courseStartTime) {
            setError("All fields are required.");
            return;
        }

        try {
            const newCourse = await CoursesService.addCourse({
                title: courseTitle,
                description: courseDescription,
                start_time: courseStartTime, 
            });
            if (newCourse) {
                setCourses([...courses, newCourse]);
            }
        } catch (err) {
            setError("Failed to add course. Make sure the title is unique and time is valid.");
        } finally {
            setCourseTitle("");
            setCourseDescription("");
            setCourseStartTime("");
            alert("Course added successfully.");
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await CoursesService.deleteCourse(id);
            setCourses(courses.filter(c => c.id !== id));
        } catch (err) {
            setError("Failed to delete course.");
        }
    };

   
    const handleUpdateCourse = async (id) => {
        try {
            const updatedFields = {};
            if (edditCourseTitle) updatedFields.title = edditCourseTitle;
            if (edditCourseDescription) updatedFields.description = edditCourseDescription;
            if (edditCourseStartTime) updatedFields.start_time = edditCourseStartTime;

            const updatedCourse = await CoursesService.updateCourse(id, updatedFields);
            if (updatedCourse) {
                setCourses(courses.map(c => c.id === id ? updatedCourse[0] : c)); 
            }

            setEditingCourseId(null);
            setEdditCourseTitle("");
            setEdditCourseDescription("");
            setEdditCourseStartTime("");
        } catch (err) {
            setError("Failed to update course.");
            console.log(err);
        }
    };

    return (
        <div className="courses-page-background">
            <div className="courses-page-container">
                <div className="courses-page-sections">

                    <div className="courses-page-list">
                        <h2>Courses List</h2>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        {courses.length === 0 ? (
                            <p>No courses found.</p>
                        ) : (
                            <ul>
                                {courses.map((course) => (
                                    <li key={course.id}>
                                        {editingCourseId === course.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={edditCourseTitle}
                                                    onChange={(e) => setEdditCourseTitle(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    value={edditCourseDescription}
                                                    onChange={(e) => setEdditCourseDescription(e.target.value)}
                                                />
                                                <input
                                                    type="time"
                                                    value={edditCourseStartTime}
                                                    onChange={(e) => setEdditCourseStartTime(e.target.value)}
                                                />
                                                <button onClick={() => handleUpdateCourse(course.id)}>Save</button>
                                                <button onClick={() => setEditingCourseId(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                {course.title} ({course.start_time}) — {course.description}
                                                </span>
                                                
                                                <div className="course-buttons">
                                                    <button
                                                        onClick={() => {
                                                            setEditingCourseId(course.id);
                                                            setEdditCourseTitle(course.title);
                                                            setEdditCourseDescription(course.description);
                                                            setEdditCourseStartTime(course.start_time);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                                                </div>
                                            </>
                                        )}
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
                                placeholder="Course Title"
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
                            <input
                                type="time"
                                placeholder="Start Time"
                                value={courseStartTime}
                                onChange={(e) => setCourseStartTime(e.target.value)}
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
