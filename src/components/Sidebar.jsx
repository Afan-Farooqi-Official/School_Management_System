import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiMonitor, FiBook, FiCalendar, FiDollarSign, FiSettings } from 'react-icons/fi';
import { MdSchool } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div style={{ width: 32, height: 32, background: 'var(--primary-color)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MdSchool size={20} color="white" />
        </div>
        EduManage
      </div>
      <div className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <FiHome size={18} style={{ marginRight: '8px' }} /> Dashboard
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiUsers size={18} style={{ marginRight: '8px' }} /> Students
        </NavLink>
        <NavLink to="/teachers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiMonitor size={18} style={{ marginRight: '8px' }} /> Teachers
        </NavLink>
        <NavLink to="/classes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiBook size={18} style={{ marginRight: '8px' }} /> Classes
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiCalendar size={18} style={{ marginRight: '8px' }} /> Attendance
        </NavLink>
        <NavLink to="/billing" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiDollarSign size={18} style={{ marginRight: '8px' }} /> Billing
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiSettings size={18} style={{ marginRight: '8px' }} /> Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
