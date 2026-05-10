import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const FacultyCard = ({ teacher, onMessage, onProfile }) => (
  <div className="metric-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.5rem', gap: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>
        {teacher.name.replace(/[^a-zA-Z]/g, '').charAt(0)}
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>{teacher.name}</h3>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{teacher.role}</span>
      </div>
    </div>
    <div style={{ width: '100%', fontSize: '0.875rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
        <span style={{ color: 'var(--text-muted)' }}>Department</span>
        <span style={{ fontWeight: 500 }}>{teacher.department}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', wordBreak: 'break-all' }}>
        <span style={{ color: 'var(--text-muted)' }}>Email</span>
        <span style={{ color: 'var(--primary-color)', marginLeft: '0.5rem' }}>{teacher.email}</span>
      </div>
    </div>
    <div style={{ width: '100%', display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
      <button className="btn" onClick={() => onMessage(teacher)} style={{ flex: 1, backgroundColor: '#f1f5f9', color: 'var(--text-main)' }}>Message</button>
      <button className="btn" onClick={() => onProfile(teacher)} style={{ flex: 1, backgroundColor: '#f1f5f9', color: 'var(--text-main)' }}>Profile</button>
    </div>
  </div>
);

const Teachers = () => {
  const { teachers, addTeacher } = useContext(AppContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', role: '', department: '', email: '' });
  
  // Interactive Modal States
  const [selectedTeacherForMessage, setSelectedTeacherForMessage] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  
  const [selectedTeacherForProfile, setSelectedTeacherForProfile] = useState(null);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTeacher.name) return;
    addTeacher(newTeacher);
    setNewTeacher({ name: '', role: '', department: '', email: '' });
    setIsAddModalOpen(false);
    toast.success('Teacher added successfully!');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(!messageContent.trim()) return;
    toast.success(`Message sent to ${selectedTeacherForMessage.name}!`);
    setMessageContent('');
    setSelectedTeacherForMessage(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Faculty Members</h2>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>+ Add Teacher</button>
      </div>
      
      <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {teachers.map(teacher => (
          <FacultyCard 
            key={teacher.id} 
            teacher={teacher} 
            onMessage={setSelectedTeacherForMessage} 
            onProfile={setSelectedTeacherForProfile} 
          />
        ))}
      </div>

       {/* Add Teacher Modal */}
       {isAddModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div className="dashboard-section animate-fade-in" style={{ width: '100%', maxWidth: '500px', margin: '0 2rem' }}>
            <div className="section-header">
              <h2>Add New Teacher</h2>
              <button className="btn" onClick={() => setIsAddModalOpen(false)} style={{ fontSize: '1.25rem' }}>✕</button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div>
                 <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Full Name</label>
                 <input 
                   type="text" required
                   style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                   value={newTeacher.name} onChange={e => setNewTeacher({...newTeacher, name: e.target.value})}
                 />
               </div>
               <div>
                 <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Email Address</label>
                 <input 
                   type="email" required
                   style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                   value={newTeacher.email} onChange={e => setNewTeacher({...newTeacher, email: e.target.value})}
                 />
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                 <div>
                   <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Role</label>
                   <input 
                     type="text" required placeholder="e.g. Teacher"
                     style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                     value={newTeacher.role} onChange={e => setNewTeacher({...newTeacher, role: e.target.value})}
                   />
                 </div>
                 <div>
                   <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Department</label>
                   <input 
                     type="text" required placeholder="e.g. Science"
                     style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                     value={newTeacher.department} onChange={e => setNewTeacher({...newTeacher, department: e.target.value})}
                   />
                 </div>
               </div>
               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                 <button type="button" className="btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                 <button type="submit" className="btn btn-primary">Save Teacher</button>
               </div>
             </form>
          </div>
        </div>
      )}

      {/* Message Teacher Modal */}
      {selectedTeacherForMessage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div className="dashboard-section animate-fade-in" style={{ width: '100%', maxWidth: '500px', margin: '0 2rem' }}>
            <div className="section-header">
              <h2>Message {selectedTeacherForMessage.name}</h2>
              <button className="btn" onClick={() => setSelectedTeacherForMessage(null)} style={{ fontSize: '1.25rem' }}>✕</button>
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Subject</label>
                <input 
                  type="text" required placeholder="Enter message subject..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                <textarea 
                  required rows="5" placeholder="Type your message here..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', resize: 'vertical' }}
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn" onClick={() => setSelectedTeacherForMessage(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Profile Modal */}
      {selectedTeacherForProfile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div className="dashboard-section animate-fade-in" style={{ width: '100%', maxWidth: '600px', margin: '0 2rem', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                 <div className="avatar" style={{ width: '80px', height: '80px', fontSize: '2.5rem', borderRadius: '16px' }}>
                   {selectedTeacherForProfile.name.replace(/[^a-zA-Z]/g, '').charAt(0)}
                 </div>
                 <div>
                   <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-main)' }}>{selectedTeacherForProfile.name}</h2>
                   <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>{selectedTeacherForProfile.role} • {selectedTeacherForProfile.department}</span>
                 </div>
               </div>
               <button className="btn" onClick={() => setSelectedTeacherForProfile(null)} style={{ fontSize: '1.25rem', padding: '0.5rem' }}>✕</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
              <div>
                 <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email Address</span>
                 <strong style={{ color: 'var(--text-main)' }}>{selectedTeacherForProfile.email}</strong>
              </div>
              <div>
                 <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Employee ID</span>
                 <strong style={{ color: 'var(--text-main)' }}>{selectedTeacherForProfile.id}</strong>
              </div>
              <div>
                 <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Join Date</span>
                 <strong style={{ color: 'var(--text-main)' }}>Aug 15, 2021 (Mock)</strong>
              </div>
              <div>
                 <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Active Classes</span>
                 <strong style={{ color: 'var(--text-main)' }}>5 Classes (Mock)</strong>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
               <button className="btn btn-primary" onClick={() => {
                 const t = selectedTeacherForProfile;
                 setSelectedTeacherForProfile(null);
                 setSelectedTeacherForMessage(t);
               }}>
                 Send a Direct Message
               </button>
            </div>
          </div>
         </div>
      )}
    </div>
  );
};

export default Teachers;
