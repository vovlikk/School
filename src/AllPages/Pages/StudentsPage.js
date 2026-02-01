import "../PagesCss/StudentsPage.css";
import React, { useEffect, useState } from "react";
import StudentsService from "../../Service/StudentsService";

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [studentLastName, setStudentLastName] = useState("");
    const [studentAge, setStudentAge] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await StudentsService.getStudents();
                setStudents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const newStudent = await StudentsService.addStudent({
                first_name: studentName,
                last_name: studentLastName,
                age: studentAge,
            });
            if (newStudent) {
                setStudents([...students, ...newStudent]);
                setStudentName("");
                setStudentLastName("");
                setStudentAge("");
            }
            alert("Student added successfully!");
        } catch {
            setError("Failed to add student.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="students-page-background">
            <div className="students-page-container">
                <div className="students-page-sections">
                    <div className="students-page-list">
                        <h2>Students List</h2>
                        {students.length === 0 ? (
                            <p>No students found.</p>
                        ) : (
                            <ul>
                                {students.map(student => (
                                    <li key={student.id}>
                                        {student.name} {student.last_name} — {student.age} yrs

                                        <button
                                                onClick={async () => {
                                                    await StudentsService.deleteStudent(student.id);
                                                    setStudents(students.filter(s => s.id !== student.id));
                                                }}
                                                style={{
                                                    marginLeft: "10px",
                                                    padding: "4px 8px",
                                                    backgroundColor: "#003f64",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Delete
                                        </button>
                                        
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="students-page-add-new-student">
                        <h3>Add New Student</h3>
                        <form onSubmit={handleAddStudent}>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={studentLastName}
                                onChange={(e) => setStudentLastName(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Age"
                                value={studentAge}
                                onChange={(e) => setStudentAge(e.target.value)}
                                required
                            />
                            <button type="submit">Add Student</button>
                        </form>
                    </div>

                    <div className="students-page-delete-student">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentsPage;
