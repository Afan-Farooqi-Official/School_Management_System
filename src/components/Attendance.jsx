import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Attendance = () => {
  const { students, addAttendanceRecord } = useContext(AppContext);
  const [selectedClass, setSelectedClass] = useState('Grade 10 - Science');
  
  // Local state for the current attendance session before saving
  const [sessionData, setSessionData] = useState(
    students.map(s => ({ studentId: s.id, studentName: s.name, status: 'Present', remarks: '' }))
  );

  const handleStatusChange = (index, status) => {
    const newData = [...sessionData];
    newData[index].status = status;
    setSessionData(newData);
  };

  const handleRemarksChange = (index, remarks) => {
    const newData = [...sessionData];
    newData[index].remarks = remarks;
    setSessionData(newData);
  };

  const handleSaveSession = () => {
    // Save each record to global context
    sessionData.forEach(record => {
      addAttendanceRecord({
        studentName: record.studentName,
        class: selectedClass,
        status: record.status,
        remarks: record.remarks,
        teacher: 'Admin User' // Current logged in user
      });
    });
    toast.success('Attendance records saved!');
  };

  const presentCount = sessionData.filter(s => s.status === 'Present').length;
  const absentCount = sessionData.filter(s => s.status === 'Absent').length;
  const lateCount = sessionData.filter(s => s.status === 'Late').length;

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <h2>Daily Attendance</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            className="header-search" 
            style={{ width: 'auto' }}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option>Grade 10 - Science</option>
            <option>Grade 11 - Math</option>
            <option>Grade 12 - History</option>
          </select>
          <input type="date" className="header-search" style={{ width: 'auto' }} defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
      </div>

      <div className="dashboard-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <div><strong>Total Students:</strong> {students.length}</div>
          <div><span style={{ color: '#166534', fontWeight: 600 }}>Present: {presentCount}</span></div>
          <div><span style={{ color: '#991b1b', fontWeight: 600 }}>Absent: {absentCount}</span></div>
          <div><span style={{ color: '#92400e', fontWeight: 600 }}>Late: {lateCount}</span></div>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {sessionData.map((record, index) => (
              <tr key={record.studentId}>
                <td>{record.studentName}</td>
                <td>
                  <select 
                    style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                    value={record.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>
                <td>
                   <input 
                    type="text" 
                    placeholder="Add note..." 
                    style={{ width: '100%', padding: '0.25rem 0.5rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                    value={record.remarks}
                    onChange={(e) => handleRemarksChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleSaveSession}>Save Attendance</button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
