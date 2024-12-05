import React from 'react';

const EmployeePopup = ({ employee, onClose }) => {
  if (!employee) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 relative">
        <button className="absolute top-4 right-4 text-gray-600" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">{employee.name}</h2>
        <p><strong>Job Title:</strong> {employee.job}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Date of Birth:</strong> {employee.dob}</p>
        <p><strong>NI Number:</strong> {employee.nin}</p>
        {employee.office_name ? <p><strong>Office:</strong> {employee.office_name}</p> : null}
        {employee.distribution_centre_name ? <p><strong>Distribution Centre:</strong> {employee.distribution_centre_name}</p> : null}
        <p><strong>Home address:</strong> {employee.home_address}</p>
        <p><strong>Hired Date:</strong> {employee.hired_date}</p>
      </div>
    </div>
  );
};

export default EmployeePopup;