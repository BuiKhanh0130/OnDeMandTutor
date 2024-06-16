import classNames from 'classnames/bind';
import { useEffect } from 'react';
import * as echarts from 'echarts';

import styles from './WebTrafficChart.module.scss';

function WebTrafficChart() {
    useEffect(() => {
        echarts.init(document.querySelector('#trafficChart')).setOption({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            value: 1048,
                            name: 'Search Engine',
                        },
                        {
                            value: 580,
                            name: 'Direct',
                        },
                        {
                            value: 484,
                            name: 'Email',
                        },
                        {
                            value: 300,
                            name: 'Union Ads',
                        },
                    ],
                },
            ],
        });
    }, []);
    return <div id="trafficChart" style={{ minHeight: '400px' }} className="echart"></div>;
}

export default WebTrafficChart;
