import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const requestLeave = async (employee_id, leave_type, start_date, end_date, reason ) => {
    if (!employee_id) {throw new Error('Employee is required')}
    if (!leave_type) {throw new Error('Leave type is required')}
    if (!start_date) {throw new Error('Start date is required')}
    if (!end_date) {throw new Error('End date is required')}
    try {
        const response = await axios.post(`${API_URL}/employees/leave/request`, { employee_id, leave_type, start_date, end_date, reason });
        return response.data;
    } catch (error) {
        console.error('Error requesting leave: ', error);
        throw new Error('Error requesting leave');
    }
}

const getRequests = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees/leave/request`);
        return response.data;
    } catch (error) {
        console.error('Error fetching requests: ', error);
        throw error;
    }
}

const approveRequest = async (request_id) => {
    try {
        const response = await axios.put(`${API_URL}/employees/leave/request/approve`, request_id);
        return response.data;
    } catch (error) {
        console.error('Error approving request: ', error);
        throw error;
    }
}

const rejectRequest = async (request_id) => {
    try {
        const response = await axios.put(`${API_URL}/employees/leave/request/reject`, request_id);
        return response.data;
    } catch (error) {
        console.error('Error approving request: ', error);
        throw error;
    }
}

const getRequestsData = async (start, end, filter) => {
    try {
        const response = await axios.get(`${API_URL}/employees/leave/${filter}`, {params: { start, end }});
        return response.data;
    } catch (error) {
        console.error('Error fetching requests: ', error);
        throw error;
    }
}

export { requestLeave, getRequests, approveRequest, rejectRequest, getRequestsData };

const processLeaveData = (rows) => {
    const totalAbsences = {
      totalDaysAbsent: 0, // total number of leave requests
      totalSickAbsence: 0,
      totalVacationAbsence: 0,
      totalPersonalAbsence: 0,
    };
  
    const absencesByQuarter = {
      Q1: { sick: 0, vacation: 0, personal: 0 },
      Q2: { sick: 0, vacation: 0, personal: 0 },
      Q3: { sick: 0, vacation: 0, personal: 0 },
      Q4: { sick: 0, vacation: 0, personal: 0 },
    };
  
    const averageAbsencesByDepartment = {};
  
    rows.forEach((row) => {
      // Count total absences by leave type
      const count = parseInt(row.total_leave_days, 10);
      
      if (row.leave_type === 'Sick') totalAbsences.totalSickAbsence += count;
      if (row.leave_type === 'Vacation') totalAbsences.totalVacationAbsence += count;
      if (row.leave_type === 'Personal') totalAbsences.totalPersonalAbsence += count;
  
      // Group absences by quarter
      if (row.quarter === 'Q1') {
        if (row.leave_type === 'Sick') absencesByQuarter.Q1.sick += count;
        if (row.leave_type === 'Vacation') absencesByQuarter.Q1.vacation += count;
        if (row.leave_type === 'Personal') absencesByQuarter.Q1.personal += count;
      }
      if (row.quarter === 'Q2') {
        if (row.leave_type === 'Sick') absencesByQuarter.Q2.sick += count;
        if (row.leave_type === 'Vacation') absencesByQuarter.Q2.vacation += count;
        if (row.leave_type === 'Personal') absencesByQuarter.Q2.personal += count;
      }
      if (row.quarter === 'Q3') {
        if (row.leave_type === 'Sick') absencesByQuarter.Q3.sick += count;
        if (row.leave_type === 'Vacation') absencesByQuarter.Q3.vacation += count;
        if (row.leave_type === 'Personal') absencesByQuarter.Q3.personal += count;
      }
      if (row.quarter === 'Q4') {
        if (row.leave_type === 'Sick') absencesByQuarter.Q4.sick += count;
        if (row.leave_type === 'Vacation') absencesByQuarter.Q4.vacation += count;
        if (row.leave_type === 'Personal') absencesByQuarter.Q4.personal += count;
      }
  
      // Update department-level statistics
      if (!averageAbsencesByDepartment[row.department]) {
        averageAbsencesByDepartment[row.department] = {
          totalLeaveCount: 0,
          departmentName: row.department,
          leaveCountsByQuarter: { Q1: 0, Q2: 0, Q3: 0, Q4: 0 },
        };
      }
      
      averageAbsencesByDepartment[row.department].totalLeaveCount += count;
      averageAbsencesByDepartment[row.department].leaveCountsByQuarter[row.quarter] += count;
    });
  
    totalAbsences.totalDaysAbsent = totalAbsences.totalSickAbsence + totalAbsences.totalVacationAbsence + totalAbsences.totalPersonalAbsence;
  
    const averageAbsencesArray = Object.values(averageAbsencesByDepartment).map((department) => {
      return {
        department: department.departmentName,
        rate: department.totalLeaveCount / rows.length, // Average across all rows
        leaveCountsByQuarter: department.leaveCountsByQuarter, // Quarterly breakdown
      };
    });
  
    return {
      totalAbsences,
      absencesByQuarter,
      averageAbsencesByDepartment: averageAbsencesArray,
    };
  };