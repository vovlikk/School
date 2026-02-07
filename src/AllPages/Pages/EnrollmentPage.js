import "../PagesCss/EnrollmentPage.css";
import React, { useEffect, useState } from "react";
import EnrollmentService from "../../Service/EnrollmentService";

function EnrollmentPage() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [studentsAndCourses, setStudentsAndCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const studentsData = await EnrollmentService.getStudents();
            setStudents(studentsData);

            const coursesData = await EnrollmentService.getCourses();
            setCourses(coursesData);

            const coursesstudentsData = await EnrollmentService.getCoursesAndStudents();
            setStudentsAndCourses(coursesstudentsData);
        }
        fetchData();
    }, []);

    async function enrollStudent() {
        if (!selectedStudent || !selectedCourse) {
            alert("Please select a student and a course");
            return;
        }

        const enrollmentData = await EnrollmentService.getCoursesAndStudents();
        const courseDurationMinutes = 45;

        const selectedCourseStart = new Date(`1970-01-01T${selectedCourse.time}:00`);
        const selectedCourseEnd = new Date(selectedCourseStart.getTime() + courseDurationMinutes * 60000);

        const alreadyEnrolled = enrollmentData.some(
            e => e.students.id === selectedStudent.id && e.courses.id === selectedCourse.id
        );
        if (alreadyEnrolled) {
            alert("Student is already enrolled in this course.");
            return;
        }

        const hasConflict = enrollmentData
            .filter(e => e.students.id === selectedStudent.id)
            .some(e => {
                const existingStart = new Date(`1970-01-01T${e.courses.time}:00`);
                const existingEnd = new Date(existingStart.getTime() + courseDurationMinutes * 60000);
                return selectedCourseStart < existingEnd && selectedCourseEnd > existingStart;
            });

        if (hasConflict) {
            alert("Student cannot be enrolled because they already have a lesson at this time.");
        return;
    }

        const { data, error } = await EnrollmentService.addStudentToCourse(selectedStudent.id, selectedCourse.id);

        if (error) {
            alert("Failed to enroll student.");
            console.error(error);
        } else {
            alert("Student enrolled successfully!");
            setSelectedStudent(null);
            setSelectedCourse(null);
            setStudentsAndCourses(await EnrollmentService.getCoursesAndStudents());
        }
    }

    return (
        <div className="enrollment-page-background">
            <div className="enrollment-page-container">
                <h2 className="enrollment-title">Enrollment</h2>
                <div className="enrollment-page-sections">
                    <div className="enrollment-column">
                        <h3>Students</h3>
                        {students.length === 0 ? (
                            <p className="empty">No students found</p>
                        ) : (
                            <select
                                value={selectedStudent?.id || ""}
                                onChange={e => setSelectedStudent(students.find(s => s.id === e.target.value))}
                            >
                                <option value="">Select Student</option>
                                {students.map(student => (
                                    <option key={student.id} value={student.id}>
                                        {student.first_name} {student.last_name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="enrollment-column">
                        <h3>Courses</h3>
                        {courses.length === 0 ? (
                            <p className="empty">No courses found</p>
                        ) : (
                            <select
                                value={selectedCourse?.id || ""}
                                onChange={e => setSelectedCourse(courses.find(c => c.id === e.target.value))}
                            >
                                <option value="">Select Course</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>
                                        {course.title} 
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="enrollment-column take-column">
                        <h3>Enroll</h3>
                        <button
                            onClick={enrollStudent}
                            disabled={!selectedStudent || !selectedCourse}
                        >
                            Enroll
                        </button>
                    </div>

                    <div className="enrollment-fetch-students-courses-column">
                        <h3>Students and Courses</h3>
                        {studentsAndCourses.length === 0 ? (
                            <p>No enrollments</p>
                        ) : (
                            <ul>
                                {studentsAndCourses.map(item => (
                                    <li key={item.id}>
                                        <strong>{item.students.first_name} {item.students.last_name}</strong> — {item.courses.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnrollmentPage;
