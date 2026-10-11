import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddStudent.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AddStudent() {
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    course: '',
    rollNo: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { studentId, fullName, email, course, rollNo } = formData;
    if (!studentId.trim() || !fullName.trim() || !email.trim() || !course.trim() || !rollNo.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (fullName.trim().length < 2) {
      setErrorMessage('Full name must be at least 2 characters long.');
      return;
    }

    setLoading(true);

    try {
      const url = `${BASE_URL.replace(/\/+$/, '')}/students`;
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          studentId: studentId.trim(),
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          course: course.trim(),
          rollNo: rollNo.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.message && data.message.includes('E11000')) {
          throw new Error('A student with this Student ID, Email, or Roll Number already exists.');
        }
        throw new Error(data.message || `Failed to create student (Status ${res.status})`);
      }

      setSuccessMessage('Student record enrolled successfully!');
      setTimeout(() => {
        navigate('/students');
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message || 'Error saving student record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-container">
      <div className="add-student-header">
        <Link to="/students" className="back-link">
          &larr; Back to Student Directory
        </Link>
        <h1 className="add-student-title">Enroll New Student</h1>
        <p className="add-student-subtitle">
          Submit verified student information into the institutional database.
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
              <label htmlFor="studentId">
                Student ID <span className="req">*</span>
              </label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                className="form-input"
                placeholder="e.g. STU-1001"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rollNo">
                Roll Number <span className="req">*</span>
              </label>
              <input
                id="rollNo"
                name="rollNo"
                type="text"
                className="form-input"
                placeholder="e.g. CS-2024-042"
                value={formData.rollNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="fullName">
                Full Name <span className="req">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-input"
                placeholder="e.g. Aarav Sharma"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Institutional Email <span className="req">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="aarav@college.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course">
                Academic Course / Branch <span className="req">*</span>
              </label>
              <input
                id="course"
                name="course"
                type="text"
                className="form-input"
                placeholder="e.g. B.Tech Computer Science"
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
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving Student...' : 'Create Student Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
