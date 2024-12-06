import React from 'react';

export const PromoteForm = ({employee, handlePromote, view, error, success, percentage, setPercentage, promotions}) => {
  return (
    <div className="mb-4 p-6 bg-gray-800 rounded-lg shadow-lg">
    <form onSubmit={handlePromote} className='grid grid-cols-2 gap-8 items-center'>
      <div className='flex items-center w-full'>
      <label className='mr-4 text-white'>Name</label>
      <span className="border border-gray-300 p-2 rounded w-full bg-gray-300 text-opacity-90 text-gray-600">{employee.name || 'N/A'}</span>
      </div>
      <img src={employee.imageUrl || "images/profile.avif"} alt={employee.name} className="w-48 h-48 rounded-full mx-auto row-span-3" />
      <div className='flex items-center w-full'>
      <label className='mr-4 text-white'>Email</label>
      <span className="border border-gray-300 p-2 rounded w-full bg-gray-300 text-opacity-90 text-gray-600">{employee.email || 'N/A'}</span>
      </div>
      <div className='flex items-center'>
      <label className='mr-4 text-white whitespace-nowrap'>Job Title</label>
      <span className="border border-gray-300 p-2 rounded w-full bg-gray-300 text-opacity-90 text-gray-600">{employee.job || 'N/A'}</span>
      </div>
      <div className='flex items-center'>
      <label className='mr-4 text-white'>Office</label>
      <span className="border border-gray-300 p-2 rounded w-full bg-gray-300 text-opacity-90 text-gray-600">{employee.office || 'N/A'}</span>
      </div>
      <div className='flex items-center'>
      <label className='text-white mr-4'>Salary</label>
      <span className="border border-gray-300 p-2 rounded w-full bg-gray-300 text-opacity-90 text-gray-600">{employee.salary || 'N/A'}</span>
      </div>
      <div className='flex items-center justify-evenly'>
      <div className='mr-4'>
        <label className='mr-4 text-white'>Contract</label>
        <span className="border border-gray-300 p-2 rounded bg-gray-300 text-opacity-90 text-gray-600">{employee.contract || 'N/A'}</span>
      </div>
      <div>
        <label className='mr-4 text-white'>Start Date</label>
        <span className="border border-gray-300 p-2 rounded bg-gray-300 text-opacity-90 text-gray-600">{employee.hired_date || 'N/A'}</span>
      </div>
      </div>
      <div className='col-span-2'>
      <div className='flex justify-evenly items-center'>
        <label className='mr-4 text-white'>% Salary Increase</label>
        <input type="number" step="0.1" min='0' max='100' placeholder="0.0%" className="border border-gray-300 p-2 rounded" value={percentage} onChange={(e) => {setPercentage(e.target.value)}}/>
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">{view}</button>
      </div>
      {error ? <p className="text-red-500 mt-4">{error}</p> : null}
      {success ? <p className="text-green-500 mt-4">{success}</p> : null}
      </div>
    </form>
    <div className='mt-10'>
      <h1 className='text-white text-3xl mb-4'>Previous Promotions:</h1>
      <ul className='text-white'>
      {promotions.map((promotion, index) => (
        <li key={index} className='border border-gray-300 p-4 rounded mt-4 bg-gray-700 hover:bg-gray-600'>
        <p><strong>Name:</strong> {promotion.name}</p>
        <p><strong>Date:</strong> {promotion.promotion_date}</p>
        <p><strong>Previous Salary:</strong> {promotion.previous_salary}</p>
        <p><strong>New Salary:</strong> {promotion.new_salary}</p>
        <p><strong>Increase:</strong> {promotion.promotion_percentage}%</p>
        <p><strong>Remarks:</strong> {promotion.remarks ? promotions.remark : "N/A"}</p>
        </li>
      ))}
      </ul>
    </div>
    </div>
  );
};
