import "../PagesCss/StudentsPage.css";
import React, { useEffect, useState } from "react";
import StudentsService from "../../Service/StudentsService";

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [studentLastName, setStudentLastName] = useState("");
    const [studentAge, setStudentAge] = useState("");

    const [edditStudentName, setEdditStudentName] = useState("");
    const [edditStudentLastName, setEdditStudentLastName] = useState("");
    const [edditStudentAge, setEdditStudentAge] = useState("");

    const [editingStudentId, setEditingStudentId] = useState(null);
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
                setStudents([...students, newStudent]); 
                setStudentName("");
                setStudentLastName("");
                setStudentAge("");
            }
            alert("Student added successfully!");
        } catch {
            setError("Failed to add student.");
        } finally {
            setStudentName("");
            setStudentLastName("");
            setStudentAge("");
        }
    };

    const handleUpdateStudent = async (id) => {
    try {
        const updatedFields = {};
        if (edditStudentName) updatedFields.first_name = edditStudentName;
        if (edditStudentLastName) updatedFields.last_name = edditStudentLastName;
        if (edditStudentAge) updatedFields.age = Number(edditStudentAge);

        const updated = await StudentsService.updateStudent(id, updatedFields);

        if (updated) {
            
            setStudents(students.map(s => s.id === id ? updated[0] : s));
        }

        setEditingStudentId(null);
        setEdditStudentName("");
        setEdditStudentLastName("");
        setEdditStudentAge("");
    } catch {
        setError("Failed to update student.");
    }
};

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
                                        {editingStudentId === student.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={edditStudentName}
                                                    onChange={(e) => setEdditStudentName(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    value={edditStudentLastName}
                                                    onChange={(e) => setEdditStudentLastName(e.target.value)}
                                                />
                                                <input
                                                    type="number"
                                                    value={edditStudentAge}
                                                    onChange={(e) => setEdditStudentAge(e.target.value)}
                                                />
                                                <button onClick={() => handleUpdateStudent(student.id)}>Save</button>
                                                <button onClick={() => setEditingStudentId(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    {student.first_name} {student.last_name} — {student.age} yrs
                                                </span>
                                                <div className="student-buttons">
                                                <button
                                                    onClick={() => {
                                                        setEditingStudentId(student.id);
                                                        setEdditStudentName(student.first_name);
                                                        setEdditStudentLastName(student.last_name);
                                                        setEdditStudentAge(student.age);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        await StudentsService.deleteStudent(student.id);
                                                        setStudents(students.filter(s => s.id !== student.id));
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {loading && <p>Loading students...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
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

                    <div className="students-page-delete-student"></div>
                </div>
            </div>
        </div>
    );
}

export default StudentsPage;
