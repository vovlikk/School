import "../PagesCss/StudentsPage.css";
import React, { useEffect, useState } from "react";
import StudentsService from "../../Service/StudentsService";

function StudentsPage() {

    const [students, setStudents] = useState([]);

    const [student, setStudentsInfo] = useState({
        studentName: "",
        studentLastName: "",
        studentAge: ""
    });

    
    const [studentedit, setStudentEditInfo] = useState({
        edditStudentName: "",
        edditStudentLastName: "",
        edditStudentAge: ""
    });

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
                first_name: student.studentName,
                last_name: student.studentLastName,
                age: Number(student.studentAge),
            });

            if (newStudent) {
                setStudents(prev => [...prev, newStudent]);
            }

            setStudentsInfo({
                studentName: "",
                studentLastName: "",
                studentAge: ""
            });

            alert("Student was added succesfull")

        } catch {
            setError("Failed to add student.");
        }
    };

    

    const startEdit = (s) => {
        setEditingStudentId(s.id);
        setStudentEditInfo({
            edditStudentName: s.first_name,
            edditStudentLastName: s.last_name,
            edditStudentAge: s.age
        });
    };

    

    const handleUpdateStudent = async (id) => {
        try {
            const updated = await StudentsService.updateStudent(id, {
                first_name: studentedit.edditStudentName,
                last_name: studentedit.edditStudentLastName,
                age: Number(studentedit.edditStudentAge)
            });

            if (updated) {
                setStudents(prev =>
                    prev.map(s => s.id === id ? updated[0] : s)
                );
            }

            setEditingStudentId(null);
            setStudentEditInfo({
                edditStudentName: "",
                edditStudentLastName: "",
                edditStudentAge: ""
            });

        } catch {
            setError("Failed to update student.");
        }
    };

   

    const handleDelete = async (id) => {
        await StudentsService.deleteStudent(id);
        setStudents(prev => prev.filter(s => s.id !== id));
    };

    

    return (
        <div className="students-page-background">
            <div className="students-page-container">
                <div className="students-page-sections">

                    <div className="students-page-list">
                        <h2>Students List</h2>

                        {loading && <p>Loading students...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        {students.length === 0 ? (
                            <p>No students found.</p>
                        ) : (
                            <ul>
                                {students.map(s => (
                                    <li key={s.id}>

                                        {editingStudentId === s.id ? (
                                            <>
                                                <input
                                                    value={studentedit.edditStudentName}
                                                    onChange={(e) =>
                                                        setStudentEditInfo(p => ({
                                                            ...p,
                                                            edditStudentName: e.target.value
                                                        }))
                                                    }
                                                />

                                                <input
                                                    value={studentedit.edditStudentLastName}
                                                    onChange={(e) =>
                                                        setStudentEditInfo(p => ({
                                                            ...p,
                                                            edditStudentLastName: e.target.value
                                                        }))
                                                    }
                                                />

                                                <input
                                                    type="number"
                                                    value={studentedit.edditStudentAge}
                                                    onChange={(e) =>
                                                        setStudentEditInfo(p => ({
                                                            ...p,
                                                            edditStudentAge: e.target.value
                                                        }))
                                                    }
                                                />

                                                <button onClick={() => handleUpdateStudent(s.id)}>
                                                    Save
                                                </button>

                                                <button onClick={() => setEditingStudentId(null)}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    {s.first_name} {s.last_name} — {s.age} yrs
                                                </span>

                                                <div className="student-buttons">

                                                    <button onClick={() => startEdit(s)}>
                                                        Edit
                                                    </button>

                                                    <button onClick={() => handleDelete(s.id)}>
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

                    <div className="students-page-add-new-student">
                        <h3>Add New Student</h3>

                        <form onSubmit={handleAddStudent}>

                            <input
                                placeholder="First Name"
                                value={student.studentName}
                                onChange={(e) =>
                                    setStudentsInfo(p => ({
                                        ...p,
                                        studentName: e.target.value
                                    }))
                                }
                                required
                            />

                            <input
                                placeholder="Last Name"
                                value={student.studentLastName}
                                onChange={(e) =>
                                    setStudentsInfo(p => ({
                                        ...p,
                                        studentLastName: e.target.value
                                    }))
                                }
                                required
                            />

                            <input
                                type="number"
                                placeholder="Age"
                                value={student.studentAge}
                                onChange={(e) =>
                                    setStudentsInfo(p => ({
                                        ...p,
                                        studentAge: e.target.value
                                    }))
                                }
                                required
                            />

                            <button type="submit">
                                Add Student
                            </button>

                        </form>
                    </div>

                    <div className="students-page-delete-student"></div>

                </div>
            </div>
        </div>
    );
}

export default StudentsPage;
