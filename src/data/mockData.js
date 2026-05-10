export const initialStudents = [
  { id: 'STU-1042', name: 'Emma Thompson', grade: '10th Grade', phone: '(555) 123-4567', status: 'Active' },
  { id: 'STU-1043', name: 'James Wilson', grade: '10th Grade', phone: '(555) 987-6543', status: 'Active' },
  { id: 'STU-1044', name: 'Sarah Parker', grade: '11th Grade', phone: '(555) 321-7654', status: 'Suspended' },
  { id: 'STU-1045', name: 'Michael Brown', grade: '12th Grade', phone: '(555) 444-5555', status: 'Active' },
];

export const initialTeachers = [
  { id: 'TEA-001', name: 'Mr. Robert Davis', role: 'Senior Teacher', department: 'Science', email: 'r.davis@school.edu' },
  { id: 'TEA-002', name: 'Mrs. Jane Smith', role: 'Department Head', department: 'Mathematics', email: 'j.smith@school.edu' },
  { id: 'TEA-003', name: 'Ms. Alice Johnson', role: 'Teacher', department: 'History', email: 'a.johnson@school.edu' },
  { id: 'TEA-004', name: 'Dr. William Taylor', role: 'Teacher', department: 'Physics', email: 'w.taylor@school.edu' },
];

export const initialAttendance = [
  { id: 1, studentName: 'Emma Thompson', class: 'Grade 10 - Science', date: 'Today, 8:00 AM', status: 'Present', teacher: 'Mr. Davis' },
  { id: 2, studentName: 'James Wilson', class: 'Grade 10 - Science', date: 'Today, 8:00 AM', status: 'Late', remarks: '15m', teacher: 'Mr. Davis' },
  { id: 3, studentName: 'Sarah Parker', class: 'Grade 11 - Math', date: 'Today, 9:30 AM', status: 'Absent', teacher: 'Mrs. Smith' },
  { id: 4, studentName: 'Michael Brown', class: 'Grade 12 - History', date: 'Yesterday', status: 'Present', teacher: 'Ms. Johnson' },
];

export const initialInvoices = [
  { id: 'INV-2023-001', studentName: 'Emma Thompson', amount: 1200.00, date: 'Oct 01, 2023', status: 'Paid' },
  { id: 'INV-2023-002', studentName: 'Sarah Parker', amount: 1200.00, date: 'Oct 01, 2023', status: 'Pending' },
  { id: 'INV-2023-003', studentName: 'Michael Brown', amount: 1200.00, date: 'Sep 01, 2023', status: 'Overdue' },
];

export const initialClasses = [
  { id: 'CLS-1', timeSlot: '08:00 AM - 09:30 AM', day: 'Monday', subject: 'Math 101', room: 'Room 402', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'CLS-2', timeSlot: '08:00 AM - 09:30 AM', day: 'Tuesday', subject: 'Science', room: 'Lab 1', color: '#15803d', bg: '#f0fdf4' },
  { id: 'CLS-3', timeSlot: '08:00 AM - 09:30 AM', day: 'Wednesday', subject: 'Math 101', room: 'Room 402', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'CLS-4', timeSlot: '08:00 AM - 09:30 AM', day: 'Thursday', subject: 'Science', room: 'Lab 1', color: '#15803d', bg: '#f0fdf4' },
  { id: 'CLS-5', timeSlot: '08:00 AM - 09:30 AM', day: 'Friday', subject: 'Art', room: 'Room 201', color: '#a21caf', bg: '#fdf4ff' },
  { id: 'CLS-6', timeSlot: '09:45 AM - 11:15 AM', day: 'Monday', subject: 'History', room: 'Room 305', color: '#b45309', bg: '#fffbeb' },
  { id: 'CLS-7', timeSlot: '09:45 AM - 11:15 AM', day: 'Tuesday', subject: 'English', room: 'Room 306', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'CLS-8', timeSlot: '09:45 AM - 11:15 AM', day: 'Wednesday', subject: 'History', room: 'Room 305', color: '#b45309', bg: '#fffbeb' },
  { id: 'CLS-9', timeSlot: '09:45 AM - 11:15 AM', day: 'Thursday', subject: 'English', room: 'Room 306', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'CLS-10', timeSlot: '09:45 AM - 11:15 AM', day: 'Friday', subject: 'PE', room: 'Gym', color: '#1d4ed8', bg: '#eff6ff' },
];

export const metrics = {
  totalStudents: 1245,
  totalTeachers: 84,
  activeClasses: 112,
  revenue: 42500,
};

export const initialSchoolConfig = {
  schoolName: 'Greenwood High School',
  academicYear: '2023 - 2024',
  currency: 'USD ($)',
  address: '123 Education Lane, Learning City, ED 12345'
};
