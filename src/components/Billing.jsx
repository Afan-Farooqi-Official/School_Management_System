import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FiDollarSign, FiClock, FiAlertCircle } from 'react-icons/fi';

const Billing = () => {
  const { invoices, addInvoice } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({ studentName: '', amount: '', status: 'Pending' });

  // Calculate dynamic metrics
  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);

  const handleAction = (status, studentName) => {
    if (status === 'Paid') {
      toast.success(`Invoice for ${studentName} successfully downloaded.`);
    } else {
      toast.success(`Reminder sent to ${studentName}!`);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newInvoiceData.studentName || !newInvoiceData.amount) return;

    addInvoice(newInvoiceData);
    setIsModalOpen(false);
    toast.success('New invoice created successfully!');
    setNewInvoiceData({ studentName: '', amount: '', status: 'Pending' });
  };

  return (
    <div className="animate-fade-in">
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-icon icon-blue"><FiDollarSign size={24} /></div>
          <div className="metric-info">
            <h3>Collected (All Time)</h3>
            <div className="value">${totalCollected.toLocaleString()}</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon icon-orange"><FiClock size={24} /></div>
          <div className="metric-info">
            <h3>Pending</h3>
            <div className="value">${totalPending.toLocaleString()}</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon icon-purple"><FiAlertCircle size={24} /></div>
          <div className="metric-info">
            <h3>Overdue</h3>
            <div className="value" style={{ color: '#ef4444' }}>${totalOverdue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Invoices</h2>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ New Invoice</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Student Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td style={{ fontWeight: 500 }}>{invoice.id}</td>
                <td>{invoice.studentName}</td>
                <td>${invoice.amount.toFixed(2)}</td>
                <td>{invoice.date}</td>
                <td>
                  <span className={`status-badge status-${invoice.status === 'Paid' ? 'present' : invoice.status === 'Pending' ? 'late' : 'absent'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn" 
                    style={{ padding: '0.25rem 0.5rem', color: 'var(--primary-color)' }}
                    onClick={() => handleAction(invoice.status, invoice.studentName)}
                  >
                    {invoice.status === 'Paid' ? 'Download' : 'Remind'}
                  </button>
                </td>
              </tr>
            ))}
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
              <h2>Create New Invoice</h2>
              <button className="btn" onClick={() => setIsModalOpen(false)} style={{ fontSize: '1.25rem' }}>✕</button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Student Name</label>
                <input 
                  type="text" required placeholder="e.g. John Doe"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  value={newInvoiceData.studentName} onChange={e => setNewInvoiceData({...newInvoiceData, studentName: e.target.value})}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Amount ($)</label>
                  <input 
                    type="number" required min="0" step="0.01" placeholder="0.00"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={newInvoiceData.amount} onChange={e => setNewInvoiceData({...newInvoiceData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Status</label>
                  <select 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={newInvoiceData.status} onChange={e => setNewInvoiceData({...newInvoiceData, status: e.target.value})}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
