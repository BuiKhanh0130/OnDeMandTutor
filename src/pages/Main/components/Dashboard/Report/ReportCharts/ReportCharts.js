import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import styles from './ReportCharts.module.scss';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

const MONEY_DATA_URL = 'dashboard/admin_dashboard'

function ReportCharts() {
    const RequestPrivate = useRequestsPrivate();

    const [data, setData] = useState({
        series: [],
        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false,
                },
            },
            market: {
                size: 4,
            },
            colors: ['#4154f1', '#2eca6a', '#ff771d'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis: {
                type: 'datetime',
                categories: [],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
            },
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await RequestPrivate.get(MONEY_DATA_URL);

            const series = response.data.map(item => ({
                name: item.title,
                data: item.dates.map((date, index) => ({
                    x: new Date(date).toISOString(),
                    y: item.data[index]
                }))
            }));

            const categories = response.data[0].dates.map(date => new Date(date).toISOString());

            setData(prevData => ({
                ...prevData,
                series: series,
                options: {
                    ...prevData.options,
                    xaxis: {
                        ...prevData.options.xaxis,
                        categories: categories
                    }
                }
            }));
        };

        fetchData();
    }, []);

    return (
        <Chart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={data.options.chart.height}
        />
    );
}

export default ReportCharts;
