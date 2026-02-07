import "../PagesCss/CoursesPage.css";
import React, { useEffect, useState } from "react";
import CoursesService from "../../Service/CoursesService";

function CoursesPage() {

    const [courses, setCourses] = useState([]);

    
    const [corsesinfo, setCoursesInfo] = useState({
        courseTitle: "",
        courseDescription: "",
        courseStartTime: "",
    });

    
    const [edditCourse, setEditCourse] = useState({
        edditCourseTitle: "",
        edditCourseDescription: "",
        edditCourseStartTime: ""
    });

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

        if (!corsesinfo.courseTitle || !corsesinfo.courseDescription || !corsesinfo.courseStartTime) {
            setError("All fields are required.");
            return;
        }

        try {
            const newCourse = await CoursesService.addCourse({
                title: corsesinfo.courseTitle,
                description: corsesinfo.courseDescription,
                start_time: corsesinfo.courseStartTime,
            });

            if (newCourse) {
                setCourses(prev => [...prev, newCourse]);
            }

            setCoursesInfo({
                courseTitle: "",
                courseDescription: "",
                courseStartTime: "",
            });

            alert("Cours was sucesfull added")

        } catch {
            setError("Failed to add course. Time conflict or duplicate title.");
        }
    };



    const handleDeleteCourse = async (id) => {
        try {
            await CoursesService.deleteCourse(id);
            setCourses(prev => prev.filter(c => c.id !== id));
        } catch {
            setError("Failed to delete course.");
        }
    };

    

    const startEdit = (course) => {
        setEditingCourseId(course.id);
        setEditCourse({
            edditCourseTitle: course.title,
            edditCourseDescription: course.description,
            edditCourseStartTime: course.start_time
        });
    };

    

    const handleUpdateCourse = async (id) => {
        try {
            const updatedCourse = await CoursesService.updateCourse(id, {
                title: edditCourse.edditCourseTitle,
                description: edditCourse.edditCourseDescription,
                start_time: edditCourse.edditCourseStartTime
            });

            if (updatedCourse) {
                setCourses(prev =>
                    prev.map(c => c.id === id ? updatedCourse[0] : c)
                );
            }

            setEditingCourseId(null);
            setEditCourse({
                edditCourseTitle: "",
                edditCourseDescription: "",
                edditCourseStartTime: ""
            });

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
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {courses.length === 0 ? (
                            <p>No courses found.</p>
                        ) : (
                            <ul>
                                {courses.map((course) => (
                                    <li key={course.id}>

                                        {editingCourseId === course.id ? (
                                            <>
                                                <input
                                                    value={edditCourse.edditCourseTitle}
                                                    onChange={(e) =>
                                                        setEditCourse(p => ({
                                                            ...p,
                                                            edditCourseTitle: e.target.value
                                                        }))
                                                    }
                                                />

                                                <input
                                                    value={edditCourse.edditCourseDescription}
                                                    onChange={(e) =>
                                                        setEditCourse(p => ({
                                                            ...p,
                                                            edditCourseDescription: e.target.value
                                                        }))
                                                    }
                                                />

                                                <input
                                                    type="time"
                                                    value={edditCourse.edditCourseStartTime}
                                                    onChange={(e) =>
                                                        setEditCourse(p => ({
                                                            ...p,
                                                            edditCourseStartTime: e.target.value
                                                        }))
                                                    }
                                                />

                                                <button onClick={() => handleUpdateCourse(course.id)}>
                                                    Save
                                                </button>

                                                <button onClick={() => setEditingCourseId(null)}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    {course.title} ({course.start_time}) — {course.description}
                                                </span>

                                                <div className="course-buttons">
                                                    <button onClick={() => startEdit(course)}>
                                                        Edit
                                                    </button>

                                                    <button onClick={() => handleDeleteCourse(course.id)}>
                                                        Delete
                                                    </button>
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
                                placeholder="Course Title"
                                value={corsesinfo.courseTitle}
                                onChange={(e) =>
                                    setCoursesInfo(p => ({
                                        ...p,
                                        courseTitle: e.target.value
                                    }))
                                }
                                required
                            />

                            <input
                                placeholder="Course Description"
                                value={corsesinfo.courseDescription}
                                onChange={(e) =>
                                    setCoursesInfo(p => ({
                                        ...p,
                                        courseDescription: e.target.value
                                    }))
                                }
                                required
                            />

                            <input
                                type="time"
                                value={corsesinfo.courseStartTime}
                                onChange={(e) =>
                                    setCoursesInfo(p => ({
                                        ...p,
                                        courseStartTime: e.target.value
                                    }))
                                }
                                required
                            />

                            <button type="submit">
                                Add Course
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CoursesPage;
