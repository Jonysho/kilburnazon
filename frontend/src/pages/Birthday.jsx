import React, { useEffect, useState } from 'react';
import { getBirthdayEmployees } from '../api/birthdayApi';

const Birthday = () => {
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    await getBirthdayEmployees().then(data => {
      console.log(data);
      setEmployees(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateDaysUntilBirthday = (dob) => {
    const today = new Date();
    const birthday = new Date(dob);
    birthday.setFullYear(today.getFullYear());
    if (birthday < today) {
      birthday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = Math.abs(birthday - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Birthdays This Month</h1>
        <p className="text-lg">Celebrate your colleagues' special days!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold mb-2">{employee.name}</p>
              <p className="text-gray-400">
                <strong>Birthday:</strong> {new Date(employee.dob).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-semibold ${calculateDaysUntilBirthday(employee.dob) < 5 ? "text-red-500" : ""}`}>
                {calculateDaysUntilBirthday(employee.dob)} days left {calculateDaysUntilBirthday(employee.dob) < 5 ? "!" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Birthday;