import "../PagesCss/EnrollmentPage.css";
import React, { useEffect, useState } from "react";
import EnrollmentService from "../../Service/EnrollmentService";

function EnrollmentPage() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const studentsData = await EnrollmentService.getStudents();
            setStudents(studentsData);

            const coursesData = await EnrollmentService.getCourses();
            setCourses(coursesData);
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

        // Проверка: студент уже записан на этот курс
        const alreadyEnrolled = enrollmentData.some(
            e => e.students.id === selectedStudent.id && e.courses.id === selectedCourse.id
        );
        if (alreadyEnrolled) {
            alert("Student is already enrolled in this course.");
            return;
        }

        // Проверка пересечения по времени с другими курсами студента (инфо, не блокирует)
        const hasConflict = enrollmentData
            .filter(e => e.students.id === selectedStudent.id)
            .some(e => {
                const existingStart = new Date(`1970-01-01T${e.courses.time}:00`);
                const existingEnd = new Date(existingStart.getTime() + courseDurationMinutes * 60000);
                return selectedCourseStart < existingEnd && selectedCourseEnd > existingStart;
            });

        if (hasConflict) {
            console.log("Warning: Selected course time conflicts with another course for this student.");
        }

        const { data, error } = await EnrollmentService.addStudentToCourse(selectedStudent.id, selectedCourse.id);

        if (error) {
            alert("Failed to enroll student.");
            console.error(error);
        } else {
            alert("Student enrolled successfully!");
            setSelectedStudent(null);
            setSelectedCourse(null);
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
                                        {course.title} ({course.time})
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
                </div>
            </div>
        </div>
    );
}

export default EnrollmentPage;
