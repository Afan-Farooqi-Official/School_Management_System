import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Classes = () => {
  const { classes, addClass } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newClass, setNewClass] = useState({ 
    subject: '', 
    room: '', 
    day: 'Monday', 
    timeSlot: '08:00 AM - 09:30 AM',
    color: '#1d4ed8', 
    bg: '#eff6ff'
  });

  const timeSlots = Array.from(new Set(classes.map(c => c.timeSlot))).sort();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newClass.subject || !newClass.room) return;
    
    // Auto-assign random colors if not set or just leave defaults, here we cycle some colors
    addClass(newClass);
    setIsModalOpen(false);
    toast.success('Class successfully created!');
    setNewClass({ 
      subject: '', 
      room: '', 
      day: 'Monday', 
      timeSlot: '08:00 AM - 09:30 AM',
      color: '#1d4ed8', 
      bg: '#eff6ff'
    });
  };

  const getClassForSlot = (day, timeSlot) => {
    return classes.find(c => c.day === day && c.timeSlot === timeSlot);
  };

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <h2>Class Schedule</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Create Class</button>
      </div>

      <div className="dashboard-section" style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ minWidth: '800px' }}>
          <thead>
            <tr>
              <th>Time slot</th>
              {days.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (
              <tr key={timeSlot}>
                <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{timeSlot}</td>
                {days.map(day => {
                  const c = getClassForSlot(day, timeSlot);
                  return (
                    <td key={day}>
                      {c ? (
                        <div style={{ padding: '0.5rem', background: c.bg, borderRadius: '4px', color: c.color, fontSize: '0.875rem' }}>
                          {c.subject}<br/><small>{c.room}</small>
                        </div>
                      ) : (
                        <div style={{ padding: '0.5rem', color: 'var(--border-color)', fontSize: '0.875rem', textAlign: 'center' }}>
                          -
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            {timeSlots.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No classes scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div className="dashboard-section animate-fade-in" style={{ width: '100%', maxWidth: '500px', margin: '0 2rem' }}>
            <div className="section-header">
              <h2>Create New Class</h2>
              <button className="btn" onClick={() => setIsModalOpen(false)} style={{ fontSize: '1.25rem' }}>✕</button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Subject Name</label>
                  <input 
                    type="text" required placeholder="e.g. Biology"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={newClass.subject} onChange={e => setNewClass({...newClass, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Room</label>
                  <input 
                    type="text" required placeholder="e.g. Lab 3"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={newClass.room} onChange={e => setNewClass({...newClass, room: e.target.value})}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Day of Week</label>
                  <select 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={newClass.day} onChange={e => setNewClass({...newClass, day: e.target.value})}
                  >
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Time Slot</label>
                  <input 
                    type="text" required placeholder="e.g. 11:30 AM - 01:00 PM"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={newClass.timeSlot} onChange={e => setNewClass({...newClass, timeSlot: e.target.value})}
                  />
                </div>
              </div>
              <div>
                 <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Theme</label>
                 <select 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={JSON.stringify({color: newClass.color, bg: newClass.bg})} 
                    onChange={e => {
                      const theme = JSON.parse(e.target.value);
                      setNewClass({...newClass, color: theme.color, bg: theme.bg});
                    }}
                  >
                    <option value='{"color":"#1d4ed8","bg":"#eff6ff"}'>Blue</option>
                    <option value='{"color":"#15803d","bg":"#f0fdf4"}'>Green</option>
                    <option value='{"color":"#b45309","bg":"#fffbeb"}'>Orange</option>
                    <option value='{"color":"#a21caf","bg":"#fdf4ff"}'>Purple</option>
                  </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Class</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
