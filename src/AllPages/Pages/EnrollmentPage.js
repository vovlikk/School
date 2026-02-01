import "../PagesCss/EnrollmentPage.css";
import React, { useEffect, useState } from "react";
import EnrollmentService from "../../Service/EnrollmentService";

function EnrollmentPage() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const studentsData = await EnrollmentService.getStudents();
            setStudents(studentsData);

            const coursesData = await EnrollmentService.getCourses();
            setCourses(coursesData);
        }
        fetchData();
    }, []);

    return (
        <div className="enrollment-page-background">
            <div className="enrollment-page-container">
                <h2 className="enrollment-title">Enrollment</h2>

                <div className="enrollment-page-sections">
                    
                    <div className="enrollment-column">
                        <h3>Students</h3>
                        <ul>
                            {students.length === 0 ? (
                                <li className="empty">No students found</li>
                            ) : (
                                students.map(student => (
                                    <li key={student.id}>
                                        {student.first_name} {student.last_name}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    
                    <div className="enrollment-column">
                        <h3>Courses</h3>
                        <ul>
                            {courses.length === 0 ? (
                                <li className="empty">No courses found</li>
                            ) : (
                                courses.map(course => (
                                    <li key={course.id}>
                                        {course.title}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                   
                    <div className="enrollment-column take-column">
                        <h3>Enroll</h3>
                        <p>Select student and course</p>
                        <button disabled>Enroll</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnrollmentPage;
