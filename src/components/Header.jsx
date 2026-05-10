import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiSearch, FiBell, FiSettings, FiLock, FiLogOut } from 'react-icons/fi';

const Header = () => {
  const { students, teachers, classes } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Handle clicking outside the wrappers to close them
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Data based on searchTerm
  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredTeachers = teachers.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearchOpen(true);
  };

  const handleResultClick = (type, item) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    if (type === 'student') {
      navigate('/students');
      toast.success(`Navigated to Students: ${item.name}`);
    } else if (type === 'teacher') {
      navigate('/teachers');
      toast.success(`Navigated to Teachers: ${item.name}`);
    }
  };

  const mockNotifications = [
    { id: 1, text: 'New invoice payment received from Emma Thompson.', time: '10 mins ago', unread: true },
    { id: 2, text: 'System update scheduled for tomorrow 2 AM.', time: '1 hour ago', unread: true },
    { id: 3, text: 'Pending attendance records for Grade 10 - Science.', time: '2 hours ago', unread: false },
  ];

  return (
    <header className="top-header">
      <div className="header-search" ref={searchRef} style={{ position: 'relative', overflow: 'visible' }}>
        <FiSearch style={{ color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search students, teachers..." 
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchOpen(true)}
        />
        
        {/* Dropdown Overlay */}
        {isSearchOpen && searchTerm && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '0.5rem',
            backgroundColor: '#ffffff', borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', border: '1px solid var(--border-color)',
            zIndex: 100, maxHeight: '400px', overflowY: 'auto', padding: '0.5rem 0'
          }}>
            {filteredStudents.length === 0 && filteredTeachers.length === 0 ? (
              <div style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                No results found for "{searchTerm}"
              </div>
            ) : (
              <>
                {filteredStudents.length > 0 && (
                  <div style={{ marginBottom: filteredTeachers.length > 0 ? '0.5rem' : 0 }}>
                    <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f8fafc' }}>Students</div>
                    {filteredStudents.slice(0, 5).map(student => (
                      <div key={student.id} onClick={() => handleResultClick('student', student)}
                        style={{ padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background-color 0.2s', fontSize: '0.875rem' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <span style={{ fontWeight: 500 }}>{student.name}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{student.id}</span>
                      </div>
                    ))}
                  </div>
                )}
                {filteredTeachers.length > 0 && (
                  <div>
                    <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f8fafc' }}>Faculty Members</div>
                    {filteredTeachers.slice(0, 5).map(teacher => (
                      <div key={teacher.id} onClick={() => handleResultClick('teacher', teacher)}
                        style={{ padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background-color 0.2s', fontSize: '0.875rem' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <span style={{ fontWeight: 500 }}>{teacher.name}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{teacher.department}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="header-actions">
        {/* Notifications Dropdown */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button 
            className="btn" 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            style={{ background: 'transparent', fontSize: '1.25rem', padding: '0.5rem', position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <FiBell />
            <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
          </button>
          
          {isNotifOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: '-30px', width: '300px', marginTop: '0.5rem',
              backgroundColor: '#ffffff', borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', border: '1px solid var(--border-color)',
              zIndex: 100, overflow: 'hidden'
            }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Notifications</div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {mockNotifications.map(n => (
                  <div key={n.id} onClick={() => { setIsNotifOpen(false); toast.success('Notification marked as read.'); }}
                    style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', backgroundColor: n.unread ? '#f8fafc' : 'transparent', transition: 'background-color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = n.unread ? '#f8fafc' : 'transparent'}
                  >
                     <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: 'var(--text-main)' }}>{n.text}</p>
                     <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: '0.75rem', textAlign: 'center', backgroundColor: '#f8fafc', fontSize: '0.875rem', cursor: 'pointer', color: 'var(--primary-color)' }}>
                View All Notifications
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div 
          ref={profileRef} 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', position: 'relative', padding: '0.25rem 0.5rem', borderRadius: '4px' }}
        >
          <div className="avatar">A</div>
          <div style={{ fontWeight: 500, userSelect: 'none' }}>Admin User</div>
          
          {isProfileOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, width: '200px', marginTop: '0.5rem',
              backgroundColor: '#ffffff', borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', border: '1px solid var(--border-color)',
              zIndex: 100, overflow: 'hidden', padding: '0.5rem 0'
            }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>Admin User</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>admin@greenwood.edu</div>
              </div>
              
              <div 
                onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <FiSettings /> Account Settings
              </div>
              <div 
                onClick={() => { setIsProfileOpen(false); toast.success('Password reset link sent!'); }}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <FiLock /> Reset Password
              </div>
              <div 
                onClick={() => { setIsProfileOpen(false); toast.success("You have been securely logged out."); }}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', paddingTop: '0.75rem' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <FiLogOut /> Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
