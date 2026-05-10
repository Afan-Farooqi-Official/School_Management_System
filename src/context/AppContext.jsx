import React, { createContext, useState } from 'react';
import { initialStudents, initialTeachers, initialAttendance, initialInvoices, initialClasses, initialSchoolConfig, metrics } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [classes, setClasses] = useState(initialClasses);
  const [schoolConfig, setSchoolConfig] = useState(initialSchoolConfig);
  const [globalMetrics, setGlobalMetrics] = useState(metrics);

  const addStudent = (student) => {
    const newStudent = {
      id: `STU-${1000 + students.length + 50}`, // Simple ID generation
      ...student,
      status: 'Active'
    };
    setStudents([...students, newStudent]);
    setGlobalMetrics({ ...globalMetrics, totalStudents: globalMetrics.totalStudents + 1 });
  };

  const addTeacher = (teacher) => {
    const newTeacher = {
      id: `TEA-00${teachers.length + 1}`,
      ...teacher
    };
    setTeachers([...teachers, newTeacher]);
    setGlobalMetrics({ ...globalMetrics, totalTeachers: globalMetrics.totalTeachers + 1 });
  };

  const addAttendanceRecord = (record) => {
    const newRecord = {
      id: attendance.length + 1,
      date: new Date().toLocaleDateString(),
      ...record
    };
    setAttendance([newRecord, ...attendance]);
  };

  const addClass = (newClass) => {
    const classData = {
      id: `CLS-${classes.length + 1}`,
      ...newClass
    };
    setClasses([...classes, classData]);
    setGlobalMetrics({ ...globalMetrics, activeClasses: globalMetrics.activeClasses + 1 });
  };

  const addInvoice = (invoice) => {
    const newInvoice = {
      id: `INV-${new Date().getFullYear()}-00${invoices.length + 1}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      ...invoice,
      amount: parseFloat(invoice.amount) || 0,
    };
    setInvoices([newInvoice, ...invoices]);
  };

  return (
    <AppContext.Provider value={{
      students,
      teachers,
      attendance,
      invoices,
      classes,
      schoolConfig,
      globalMetrics,
      addStudent,
      addTeacher,
      addAttendanceRecord,
      addClass,
      addInvoice,
      setSchoolConfig
    }}>
      {children}
    </AppContext.Provider>
  );
};
