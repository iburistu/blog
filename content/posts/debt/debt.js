import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const Debt = () => {
    const [dataSet, setDataSet] = useState(null);
    const [start, setStart] = useState('2016-01-02');
    const [end, setEnd] = useState('2020-12-31');

    const options = {
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'USD (Trillions)'
                }
            }],
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: `Date`
                },
                type: 'time'
            }]
        }
    }

    useEffect(() => {
        const generateData = async (start, end) => {
            
/*             const totalResponse = await fetch(`https://eg9v5a7pna.execute-api.us-east-1.amazonaws.com/beta/v1/trumpbux?type=total&end=${end}&start=${start}`)
            const totalData = await totalResponse.json(); 

            const govResponse = await fetch(`https://eg9v5a7pna.execute-api.us-east-1.amazonaws.com/beta/v1/trumpbux?type=gov&end=${end}&start=${start}`)
            const govData = await govResponse.json();

            const publicResponse = await fetch(`https://eg9v5a7pna.execute-api.us-east-1.amazonaws.com/beta/v1/trumpbux?type=public&end=${end}&start=${start}`)
            const publicData = await publicResponse.json(); */

            const response = await fetch('https://eg9v5a7pna.execute-api.us-east-1.amazonaws.com/beta/v1/trumpbux/source');
            const body = await response.json();

            const data = body.filter(e => (new Date(e.effectiveDate) > new Date(start)) && (new Date(e.effectiveDate) < new Date(end)));

            const dataSet = {
                labels: data.map(e => e.effectiveDate),
                datasets: [
                    {
                        label: 'Total',
                        fill: false,
                        lineTension: 0.0,
                        data: data.map(e => (e.totalDebt / 1e12).toFixed(2)),
                        borderColor: '#333333',
                        pointRadius: 0,
                        pointHitRadius: 10,
                    },
                    {
                        label: 'Intra-government',
                        fill: false,
                        lineTension: 0.0,
                        data: data.map(e => (e.governmentHoldings / 1e12).toFixed(2)),
                        borderColor: '#5688C7',
                        pointRadius: 0,
                        pointHitRadius: 10,
                    },
                    {
                        label: 'Public',
                        fill: false,
                        lineTension: 0.0,
                        data: data.map(e => (e.publicDebt / 1e12).toFixed(2)),
                        borderColor: '#00FFCD',
                        pointRadius: 0,
                        pointHitRadius: 10,
                    }
                ]
            }
            setDataSet(dataSet);
        };
        generateData(start, end);
    }, [start, end]);

    return (
        <>
            <h1>US National Debt</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <div>
                    <h3>Start:</h3>
                    <DatePicker selected={new Date(start)} onChange={date => setStart(date.toISOString().split('T')[0])} />
                </div>
                <div>
                    <h3>End:</h3>
                    <DatePicker selected={new Date(end)} onChange={date => setEnd(date.toISOString().split('T')[0])} />
                </div>
            </div>
            <Line options={options} data={dataSet || {}} />
        </>
    )
}

export default Debt;