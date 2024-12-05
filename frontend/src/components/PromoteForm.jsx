import React from 'react';

export const PromoteForm = ({employee, handlePromote, view, error, success, percentage, setPercentage}) => {
    return (
        <div className="mb-4">
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
            <div>
                <div className='flex justify-evenly items-center'>
                    <label className='mr-4 text-white'>% Salary Increase</label>
                    <input type="number" min='0' max='300 text-opacity-90' placeholder="0%" className="border border-gray-300 p-2 rounded" value={percentage} onChange={(e) => {setPercentage(e.target.value)}}/>
                    <div className="items-center col-span-2">
                    <button type="submit" className="bg-green-500 text-white p-2 rounded">{view}</button>
                </div>
                {error ? <p className="text-red-500 absolute mt-20">{error}</p> : null}
                {success ? <p className="text-green-500 absolute mt-20">{success}</p> : null}
                </div>
            </div>
          </form>
          <div className='mt-10'>
            <h1 className='text-white text-3xl'>Previous Promotions:</h1>
          </div>
        </div>
    );
};