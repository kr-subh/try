import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StudentList.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const url = `${BASE_URL.replace(/\/+$/, '')}/students`;
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(url, { headers });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to fetch students (Status ${res.status})`);
        }

        const data = await res.json();
        if (!ignore) {
          setStudents(Array.isArray(data.students) ? data.students : []);
          setTotalStudents(data.totalStudents || (Array.isArray(data.students) ? data.students.length : 0));
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Error connecting to student service.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const url = `${BASE_URL.replace(/\/+$/, '')}/students`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    fetch(url, { headers })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `Failed to fetch students (Status ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setStudents(Array.isArray(data.students) ? data.students : []);
        setTotalStudents(data.totalStudents || (Array.isArray(data.students) ? data.students.length : 0));
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Error connecting to student service.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="student-list-container">
      <div className="student-list-header">
        <div>
          <h1 className="student-list-title">Student Directory</h1>
          <p className="student-list-subtitle">
            Manage enrolled students, academic courses, and record details.
          </p>
        </div>
        <Link to="/students/new" className="btn-add-student">
          + Add New Student
        </Link>
      </div>

      {loading && (
        <div className="state-card state-loading" role="status">
          <div className="spinner" />
          <p>Loading student records from server...</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-card state-error" role="alert">
          <p className="error-text"><strong>API Error:</strong> {error}</p>
          <button type="button" className="btn-retry" onClick={handleRetry}>
            Retry Request
          </button>
        </div>
      )}

      {!loading && !error && students.length === 0 && (
        <div className="state-card state-empty">
          <h3>No Student Records Found</h3>
          <p>The student directory is currently empty.</p>
          <Link to="/students/new" className="btn-add-first">
            Enroll First Student
          </Link>
        </div>
      )}

      {!loading && !error && students.length > 0 && (
        <div className="table-responsive-wrapper">
          <div className="table-meta-bar">
            <span>Showing <strong>{students.length}</strong> of <strong>{totalStudents}</strong> students</span>
          </div>

          <table className="student-table" aria-label="Student records list">
            <thead>
              <tr>
                <th scope="col">Student ID</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Course</th>
                <th scope="col">Roll Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id || student.studentId}>
                  <td className="cell-id">
                    <code>{student.studentId}</code>
                  </td>
                  <td className="cell-name">{student.fullName}</td>
                  <td className="cell-email">{student.email}</td>
                  <td className="cell-course">
                    <span className="badge-course">{student.course}</span>
                  </td>
                  <td className="cell-roll">{student.rollNo}</td>
                  <td className="cell-actions">
                    <Link to={`/students/${student._id}/edit`} className="action-link edit-link">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
