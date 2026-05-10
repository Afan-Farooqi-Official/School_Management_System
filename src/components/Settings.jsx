import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { schoolConfig, setSchoolConfig } = useContext(AppContext);
  const [localConfig, setLocalConfig] = useState(schoolConfig);

  // If the global state ever changes from elsewhere, sync the local form
  useEffect(() => {
    setLocalConfig(schoolConfig);
  }, [schoolConfig]);

  const handleSave = () => {
    setSchoolConfig(localConfig);
    toast.success('School configuration updated!');
  };

  const handleDiscard = () => {
    setLocalConfig(schoolConfig); // Revert to global state
    toast.success('Changes discarded');
  };

  return (
    <div className="animate-fade-in dashboard-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="section-header">
        <h2>School Configuration</h2>
      </div>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>School Name</label>
          <input 
            type="text" 
            value={localConfig.schoolName}
            onChange={(e) => setLocalConfig({...localConfig, schoolName: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} 
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Academic Year</label>
            <select 
              value={localConfig.academicYear}
              onChange={(e) => setLocalConfig({...localConfig, academicYear: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            >
              <option>2023 - 2024</option>
              <option>2024 - 2025</option>
              <option>2025 - 2026</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Currency</label>
            <select 
              value={localConfig.currency}
              onChange={(e) => setLocalConfig({...localConfig, currency: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Address</label>
          <textarea 
            rows={3} 
            value={localConfig.address}
            onChange={(e) => setLocalConfig({...localConfig, address: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          </textarea>
        </div>
        
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="button" className="btn" onClick={handleDiscard} style={{ border: '1px solid var(--border-color)' }}>Discard Changes</button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
