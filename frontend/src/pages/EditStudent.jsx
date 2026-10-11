import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EditStudent.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    course: '',
    rollNo: '',
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchRecord() {
      try {
        const url = `${BASE_URL.replace(/\/+$/, '')}/students/${id}`;
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(url, { headers });
        if (!res.ok) {
          if (res.status === 404) {
            if (!ignore) setNotFound(true);
            return;
          }
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to fetch student details');
        }

        const data = await res.json();
        const student = data.student || data;
        if (!ignore && student) {
          setFormData({
            studentId: student.studentId || '',
            fullName: student.fullName || '',
            email: student.email || '',
            course: student.course || '',
            rollNo: student.rollNo || '',
          });
        }
      } catch (err) {
        if (!ignore) {
          setErrorMessage(err.message || 'Error loading student record.');
        }
      } finally {
        if (!ignore) {
          setInitialLoading(false);
        }
      }
    }

    fetchRecord();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { fullName, course, rollNo } = formData;
    if (!fullName.trim() || !course.trim() || !rollNo.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setSaveLoading(true);

    try {
      const url = `${BASE_URL.replace(/\/+$/, '')}/students/${id}`;
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          fullName: fullName.trim(),
          course: course.trim(),
          rollNo: rollNo.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || `Failed to update student record (Status ${res.status})`);
      }

      setSuccessMessage('Student record updated successfully!');
      setTimeout(() => {
        navigate('/students');
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message || 'Error updating student record.');
    } finally {
      setSaveLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="add-student-container">
        <div className="state-card state-loading">
          <div className="spinner" />
          <p>Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="add-student-container">
        <div className="state-card state-error">
          <h2>Student Record Not Found</h2>
          <p style={{ margin: '1rem 0' }}>The requested student ID does not exist in the database.</p>
          <Link to="/students" className="btn-add-first">
            &larr; Return to Student Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="add-student-container">
      <div className="add-student-header">
        <Link to="/students" className="back-link">
          &larr; Back to Student Directory
        </Link>
        <h1 className="add-student-title">Edit Student Record</h1>
        <p className="add-student-subtitle">
          Update academic course, roll number, and contact details for {formData.fullName}.
        </p>
      </div>

      <div className="add-student-card">
        {errorMessage && (
          <div className="form-alert form-alert-error" role="alert">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="form-alert form-alert-success" role="status">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="edit-studentId">Student ID</label>
              <input
                id="edit-studentId"
                name="studentId"
                type="text"
                className="form-input"
                value={formData.studentId}
                disabled
                style={{ opacity: 0.65, cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-rollNo">
                Roll Number <span className="req">*</span>
              </label>
              <input
                id="edit-rollNo"
                name="rollNo"
                type="text"
                className="form-input"
                value={formData.rollNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="edit-fullName">
                Full Name <span className="req">*</span>
              </label>
              <input
                id="edit-fullName"
                name="fullName"
                type="text"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-email">Email Address</label>
              <input
                id="edit-email"
                name="email"
                type="email"
                className="form-input"
                value={formData.email}
                disabled
                style={{ opacity: 0.65, cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-course">
                Academic Course / Branch <span className="req">*</span>
              </label>
              <input
                id="edit-course"
                name="course"
                type="text"
                className="form-input"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/students" className="btn-cancel">
              Cancel
            </Link>
            <button type="submit" className="btn-submit" disabled={saveLoading}>
              {saveLoading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
