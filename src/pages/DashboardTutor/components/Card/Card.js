import React, { useState } from 'react';
import './Card.css';
import { motion } from 'framer-motion';
import { UilTimes } from '@iconscout/react-unicons';
import Chart from 'react-apexcharts';

const Card = (props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="Card">
            <motion.div>
                {expanded ? (
                    <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
                ) : (
                    <CompactCard param={props} setExpanded={() => setExpanded(true)} />
                )}
            </motion.div>
        </div>
    );
};

function CompactCard({ param, setExpanded }) {
    return (
        <motion.div
            className="CompactCard"
            style={{
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
            }}
            onClick={setExpanded}
        >
            <div className="radialBar">
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <span>{param.value}</span>
            </div>
        </motion.div>
    );
}

function ExpandedCard({ param, setExpanded }) {
    const data = {
        options: {
            chart: {
                type: 'area',
                height: 'auto',
            },
            dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.35,
            },
            fill: {
                colors: ['#fff'],
                type: 'gradient',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                colors: ['white'],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yyyy HH:mm',
                },
            },
            grid: {
                show: true,
            },
            xaxis: {
                type: 'datetime',
                categories: param.dates,
            },
        },
        series: [
            {
                name: param.title,
                data: param.data,
            },
        ],
    };

    return (
        <motion.div
            className="ExpandedCard"
            style={{
                background: 'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
                borderColor: 'rgba(75,192,192,1)',
                boxShadow: '0px 10px 20px 0px #F9D59B',
            }}
            layoutId="expandableCard"
        >
            <div
                style={{
                    alignSelf: 'flex-end',
                    cursor: 'pointer',
                    color: 'white',
                }}
            >
                <UilTimes onClick={setExpanded} />
            </div>
            <span>{param.title}</span>

            <div className="ChartContainer">
                <Chart series={data.series} type="area" options={data.options} />
            </div>
            <span>Last 24 hours</span>
        </motion.div>
    );
}

export default Card;
