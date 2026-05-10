import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';

const Students = () => {
  const { students, addStudent } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newStudent, setNewStudent] = useState({ name: '', grade: '', phone: '' });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.grade) return;
    addStudent(newStudent);
    setNewStudent({ name: '', grade: '', phone: '' });
    setIsModalOpen(false);
    toast.success('Student added successfully!');
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="dashboard-section" style={{ marginBottom: 0, position: 'relative' }}>
        <div className="section-header">
          <h2>Student Directory</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="header-search" style={{ margin: 0 }}>
              <FiSearch style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Add Student</button>
          </div>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Parent Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.phone}</td>
                <td>
                  <span className={`status-badge status-${student.status === 'Active' ? 'present' : 'absent'}`}>
                    {student.status}
                  </span>
                </td>
                <td><button className="btn" style={{ padding: '0.25rem 0.5rem', color: 'var(--primary-color)' }}>View</button></td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No students found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div className="dashboard-section animate-fade-in" style={{ width: '100%', maxWidth: '500px', margin: '0 2rem' }}>
            <div className="section-header">
              <h2>Add New Student</h2>
              <button className="btn" onClick={() => setIsModalOpen(false)} style={{ fontSize: '1.25rem' }}>✕</button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Full Name</label>
                <input 
                  type="text" required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Grade / Class</label>
                  <input 
                    type="text" required placeholder="e.g. 10th Grade"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={newStudent.grade} onChange={e => setNewStudent({...newStudent, grade: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Parent Contact</label>
                  <input 
                    type="text" required placeholder="(555) 000-0000"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
