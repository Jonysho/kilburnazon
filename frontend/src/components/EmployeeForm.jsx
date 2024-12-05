import React from 'react';

export const EmployeeForm = ({employee, setEmployee, handleSubmit, error, success, jobs, offices, view}) => {
    return (
        <div className="mb-4">
          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-8 items-center'>
            <div className='flex items-center w-full'>
              <label className='mr-4 text-white'>Name</label>
              <input type="text" placeholder="Name" className="border border-gray-300 p-2 rounded w-full" value={employee.name || ''} onChange={(e) => setEmployee({ ...employee, name: e.target.value })}/>
            </div>
            <img src={employee.imageUrl || "images/profile.avif "}  alt={employee.name} className="w-48 h-48 rounded-full mx-auto row-span-3" />
            <div className='flex items-center w-full'>
              <label className='mr-4 text-white'>Email</label>
              <input type="email" placeholder="Email" className="border border-gray-300 p-2 rounded w-full" value={employee.email || ''} onChange={(e) => setEmployee({ ...employee, email: e.target.value })}/>
            </div>
            <div className='flex items-center'>
              <div className='flex items-center mr-5'>
                <label className='mr-4 text-white whitespace-nowrap'>Date of Birth</label>
                <input type="date" className="border border-gray-300 p-2 rounded"value={employee.dob || ''} onChange={(e) => setEmployee({ ...employee, dob: e.target.value })}/>
              </div>
              <div className='flex items-center'>  
                <label className='mr-4 text-white whitespace-nowrap'>NI Number</label>
                <input type="text" placeholder="NI Number" className="border border-gray-300 p-2 rounded"value={employee.nin || ''} onChange={(e) => setEmployee({ ...employee, nin: e.target.value })}/>
              </div>
            </div>
            <div className='flex items-center w-full col-span-2'>
              <label className='text-white whitespace-nowrap mr-4'>Home Address</label>
              <input type="text" placeholder="Home Address" className="border border-gray-300 p-2 rounded w-full"value={employee.home_address || ''} onChange={(e) => setEmployee({ ...employee, home_address: e.target.value })}/>
            </div>
              <div>
              <label className='mr-4 text-white'>Job Title</label>
              <select className ="border border-gray-300 p-2 rounded" value={employee.job || ''} onChange={(e) => setEmployee({ ...employee, job: e.target.value })}>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
              </div>
              <div className='flex items-center'>
              <label className='mr-4 text-white'>Office</label>
              <select className ="border border-gray-300 p-2 rounded w-full" value={employee.office || ''} onChange={(e) => setEmployee({ ...employee, office: e.target.value })}>
                <option value="">Select Office</option>
                {offices.map(office => (
                  <option key={office.id} value={office.id}>
                    {office.name}
                  </option>
                ))}
              </select>
              </div>
              <div className='flex items-center'>
                <label className='text-white mr-4'>Salary</label>
                <input type="number" min="0" placeholder="Salary" className="border border-gray-300 p-2 rounded w-full" value={employee.salary || ''} onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}/>
              </div>
              <div className='flex items-center'>
                <label className='mr-4 text-white'>Contract</label>
                <select className ="border border-gray-300 p-2 rounded" value={employee.contract || ''} onChange={(e) => setEmployee({ ...employee, contract: e.target.value })}>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label className='mr-4 text-white'>Start Date</label>
                <input type="date" className="border border-gray-300 p-2 rounded" value={employee.hired_date || ''} onChange={(e) => setEmployee({ ...employee, hired_date: e.target.value })}/>
              </div>
             <div className="items-center">
              <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">{view}</button>
              {error ? <p className="text-red-500 absolute">{error}</p> : null}
              {success ? <p className="text-green-500 absolute">{success}</p> : null}
             </div>
            <div>
            </div>
          </form>
        </div>
    )
}