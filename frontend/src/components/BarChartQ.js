import { Bar } from 'react-chartjs-2';

const BarChartQ = ({ data }) => {
    // Group data by quarter and leave type
    const groupedData = data.reduce((acc, item) => {
        const { quarter, leave_type, total_leave_days } = item;
        if (!acc[quarter]) acc[quarter] = { Sick: 0, Vacation: 0, Personal: 0 };
        acc[quarter][leave_type] += total_leave_days;
        return acc;
    }, {});

    // Extract quarters and data for each leave type
    const quarters = Object.keys(groupedData);
    const sickData = quarters.map(quarter => groupedData[quarter].Sick || 0);
    const vacationData = quarters.map(quarter => groupedData[quarter].Vacation || 0);
    const personalData = quarters.map(quarter => groupedData[quarter].Personal || 0);

    const chartData = {
        labels: quarters,  // Quarters as labels on the x-axis
        datasets: [
            {
                label: 'Sick Absence',
                data: sickData,
                backgroundColor: '#4CAF50',
                borderWidth: 1,
                barThickness: 12,  // Controls width of the bars
                categoryPercentage: 0.5,  // Controls the spacing between bars (less than 1 for overlap)
                offset: true,  // Ensures there’s slight overlap
            },
            {
                label: 'Vacation Absence',
                data: vacationData,
                backgroundColor: '#2196F3',
                borderWidth: 1,
                barThickness: 12,
                categoryPercentage: 0.5,
                offset: true,
            },
            {
                label: 'Personal Absence',
                data: personalData,
                backgroundColor: '#FF5722',
                borderWidth: 1,
                barThickness: 12,
                categoryPercentage: 0.5,
                offset: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                beginAtZero: true,
                stacked: false,  // No stacking, bars will be side-by-side
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container" style={{ width: '600px', height: '400px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChartQ;
