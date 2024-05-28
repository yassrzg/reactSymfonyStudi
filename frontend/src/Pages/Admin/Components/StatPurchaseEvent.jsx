import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { StatService } from '../../../service/StatService';

export default function EventPurchaseStats() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        fetchEventPurchaseStats();
    }, []);

    const fetchEventPurchaseStats = async () => {
        try {
            const response = await StatService.getStatsPurchaseEvent();
            const data = response.data;

            const eventNames = data.map(event => event.event.name);
            const purchaseCounts = data.map(event => event.count);

            const chartData = {
                labels: eventNames,
                datasets: [
                    {
                        label: "Nombre d'achat par événement",
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
                        data: purchaseCounts,
                        barPercentage: 0.5,
                        categoryPercentage: 0.5,
                    }
                ]
            };

            setChartData(chartData);

            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            const chartOptions = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };

            setChartOptions(chartOptions);
        } catch (error) {
            console.error('Error fetching event purchase stats:', error);
        }
    };

    return (
        <div className="card">
            <h3>Event Purchase Statistics</h3>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
