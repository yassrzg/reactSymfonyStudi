import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { StatService } from '../../../service/StatService';

const LineChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Connexion d'utilisateur",
                data: [],
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.4
            },
            {
                label: 'Billet Acheté',
                data: [],
                fill: false,
                borderColor: '#FFA726',
                tension: 0.4
            }
        ]
    });

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userLoginsResponse, qrCodesResponse] = await Promise.all([
                    StatService.getStatsUser(),
                    StatService.getStatsEvent()
                ]);

                const months = qrCodesResponse.data.map(stat => `${stat.month}-${stat.year}`);
                const qrCodeCounts = qrCodesResponse.data.map(stat => stat.qrCodeCount);
                const userLoginCounts = userLoginsResponse.data.map(stat => stat.loginCount);

                setChartData({
                    labels: months,
                    datasets: [
                        { ...chartData.datasets[0], data: userLoginCounts },
                        { ...chartData.datasets[1], data: qrCodeCounts }
                    ]
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        fetchData();
    }, []);

    return <div><Chart type="line" data={chartData} options={options} /></div>;
};

export default LineChart;
