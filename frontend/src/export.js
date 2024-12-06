import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin

const exportToCSV = (filteredData) => {
    const dataToExport = filteredData.map(item => ({
        EmployeeID: item.employee_id,
        EmployeeName: item.employee_name,
        DepartmentName: item.department_name,
        JobTitle: item.job_title,
        BaseSalary: item.base_salary ? '£' + item.base_salary.toLocaleString() : 'N/A',
        Bonuses: item.bonuses ? '£' + item.bonuses.toLocaleString() : 'N/A',
        Incentives: item.incentives ? '£' + item.incentives.toLocaleString() : 'N/A',
        OtherAllowances: item.other_allowances ? '£' + item.other_allowances.toLocaleString() : 'N/A',
        TaxDeductions: item.tax_deductions ? '£' + item.tax_deductions.toLocaleString() : 'N/A',
        InsuranceDeductions: item.insurance_deductions ? '£' + item.insurance_deductions.toLocaleString() : 'N/A',
        RetirementContributions: item.retirement_contributions ? '£' + item.retirement_contributions.toLocaleString() : 'N/A',
        NetPay: item.net_pay ? '£' + item.net_pay.toLocaleString() : 'N/A',
    }));

    const csv = Papa.unparse(dataToExport);

    // Create a download link and trigger the download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // for modern browsers
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'payroll_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

const exportToPDF = (filteredData) => {
    const doc = new jsPDF();
    doc.text('Payroll Report', 20, 10);

    const tableData = filteredData.map(item => [
        item.employee_id,
        item.employee_name,
        item.department_name,
        item.job_title,
        item.base_salary ? '£' + item.base_salary.toLocaleString() : 'N/A',
        item.bonuses ? '£' + item.bonuses.toLocaleString() : 'N/A',
        item.incentives ? '£' + item.incentives.toLocaleString() : 'N/A',
        item.other_allowances ? '£' + item.other_allowances.toLocaleString() : 'N/A',
        item.tax_deductions ? '£' + item.tax_deductions.toLocaleString() : 'N/A',
        item.insurance_deductions ? '£' + item.insurance_deductions.toLocaleString() : 'N/A',
        item.retirement_contributions ? '£' + item.retirement_contributions.toLocaleString() : 'N/A',
        item.net_pay ? '£' + item.net_pay.toLocaleString() : 'N/A',
    ]);

    // Add the table to the PDF
    doc.autoTable({
        head: [['ID', 'Name', 'Department', 'Job Title', 'Base Salary', 'Bonuses', 'Incentives', 'Other Allowances', 'Tax Deductions', 'Insurance Deductions', 'Retirement Contributions', 'Net Pay']],
        body: tableData,
        startY: 20,
        theme: 'grid',
    });

    // Save the PDF
    doc.save('payroll_report.pdf');
};

export { exportToCSV, exportToPDF };