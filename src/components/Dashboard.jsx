import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppContext } from '../context/AppContext';
import { FiUsers, FiMonitor, FiBook, FiDollarSign } from 'react-icons/fi';

const data = [
  { name: 'Mon', attendance: 95 },
  { name: 'Tue', attendance: 92 },
  { name: 'Wed', attendance: 98 },
  { name: 'Thu', attendance: 94 },
  { name: 'Fri', attendance: 96 },
];

const Dashboard = () => {
  const { globalMetrics, attendance } = useContext(AppContext);
  return (
    <div className="animate-fade-in">
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-icon icon-blue"><FiUsers size={24} /></div>
          <div className="metric-info">
            <h3>Total Students</h3>
            <div className="value">{globalMetrics.totalStudents.toLocaleString()}</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon icon-green"><FiMonitor size={24} /></div>
          <div className="metric-info">
            <h3>Total Teachers</h3>
            <div className="value">{globalMetrics.totalTeachers}</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon icon-purple"><FiBook size={24} /></div>
          <div className="metric-info">
            <h3>Active Classes</h3>
            <div className="value">{globalMetrics.activeClasses}</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon icon-orange"><FiDollarSign size={24} /></div>
          <div className="metric-info">
            <h3>Revenue (MTD)</h3>
            <div className="value">${globalMetrics.revenue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
        <div className="section-header">
          <h2>Weekly Attendance Trends</h2>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                itemStyle={{ color: 'var(--primary-color)', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="attendance" stroke="var(--primary-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Attendance</h2>
          <button className="btn btn-primary">View All Reports</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Date</th>
              <th>Status</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {attendance.slice(0, 4).map((record, index) => (
              <tr key={index}>
                <td>{record.studentName}</td>
                <td>{record.class}</td>
                <td>{record.date}</td>
                <td>
                  <span className={`status-badge status-${record.status.toLowerCase()}`}>
                    {record.status} {record.remarks && `(${record.remarks})`}
                  </span>
                </td>
                <td>{record.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
