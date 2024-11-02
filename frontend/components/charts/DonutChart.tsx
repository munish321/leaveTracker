
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux';
import { userState } from '@/redux/slices/userSlice';
import { leaveBalance } from '@/service/dashboardService';

export default function DoughnutChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [leaveBalanceData, setLeaveBalance] = useState([]);
    const { userData } = useSelector(userState);

    useEffect(() => {
        const leaveBalance1 = async () => {
            const querry = await leaveBalance(userData._id);
            setLeaveBalance(querry);
        }
        leaveBalance1()
    }, []);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: leaveBalanceData.map((item:any)=>item.name),
            datasets: [
                {
                    data: leaveBalanceData.map((item:any)=>item.value),
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };
        setChartData(data);
        setChartOptions(options);
    }, [leaveBalanceData]);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
        