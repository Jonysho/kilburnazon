import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

Chart.register(ChartDataLabels); // Register the plugin

const PieChart = ({ data }) => {
  // Group data by department
  const groupedData = data.reduce((acc, item) => {
    const { department, total_leave_days, leave_type } = item;
    if (!acc[department]) acc[department] = [];
    acc[department].push(parseInt(total_leave_days)); // Collect all leave days for each department
    return acc;
  }, {});

  // Calculate average leave days for each department
  const departmentNames = Object.keys(groupedData);
  const averageLeaveDays = departmentNames.map(department => {
    const totalDays = groupedData[department].reduce((sum, days) => sum + days, 0);
    return totalDays / groupedData[department].length; // Average = total days / number of leave types
  });

  // Calculate total average leave days across all departments
  const totalAverageLeaveDays = averageLeaveDays.reduce((sum, avg) => sum + avg, 0);

  // Calculate percentage for each department
  const percentages = averageLeaveDays.map(avg => (avg / totalAverageLeaveDays) * 100);

  // Prepare chart data
  const chartData = {
    labels: departmentNames, // Department names as labels
    datasets: [
      {
        label: 'Average Leave Days Percentage by Department',
        data: percentages, // Percentages for each department
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'], // Color for each department
        hoverOffset: 4,
      },
    ],
  };

  // Chart options including datalabels plugin configuration
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
      datalabels: {
        color: 'white', // Text color
        formatter: (value) => `${value.toFixed(1)}%`, // Format to 1 decimal place with a percentage symbol
        font: {
          weight: 'bold',
        },
        align: 'center',
        anchor: 'center',
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: '300px', height: '250px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
