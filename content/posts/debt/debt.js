import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const Debt = () => {
    const [rawDataSet, setRawDataSet] = useState([]);
    const [chartDataSet, setChartDataSet] = useState([]);
    const [start, setStart] = useState('1993-01-01');
    const [end, setEnd] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`);

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
    // Initial load useEffect
    useEffect(() => {
        const getRawData = async () => {
            const response = await fetch('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?page[size]=10000');
            const body = await response.json();

            setRawDataSet(body.data.map(({ record_date, tot_pub_debt_out_amt, intragov_hold_amt, debt_held_public_amt }) => ({ record_date, tot_pub_debt_out_amt, intragov_hold_amt, debt_held_public_amt })));

        };
        getRawData();
    }, []);

    // On change of start and end time 
    useEffect(() => {
        const data = rawDataSet?.filter(e => (new Date(e?.record_date) > new Date(start)) && (new Date(e?.record_date) < new Date(end)));
        const dataSet = {
            labels: data?.map(e => e?.record_date),
            datasets: [
                {
                    label: 'Total',
                    fill: false,
                    lineTension: 0.0,
                    data: data?.map(e => ((e?.tot_pub_debt_out_amt ?? 0) / 1e12).toFixed(2)),
                    borderColor: '#333333',
                    pointRadius: 0,
                    pointHitRadius: 10,
                },
                {
                    label: 'Intra-government',
                    fill: false,
                    lineTension: 0.0,
                    data: data?.map(e => ((e?.intragov_hold_amt ?? 0) / 1e12).toFixed(2)),
                    borderColor: '#5688C7',
                    pointRadius: 0,
                    pointHitRadius: 10,
                },
                {
                    label: 'Public',
                    fill: false,
                    lineTension: 0.0,
                    data: data?.map(e => ((e?.debt_held_public_amt) / 1e12).toFixed(2)),
                    borderColor: '#00FFCD',
                    pointRadius: 0,
                    pointHitRadius: 10,
                }
            ]
        };

        setChartDataSet(dataSet);

    }, [rawDataSet, start, end]);

    return (
        <>
            <h1>US National Debt</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <div>
                    <h3>Start:</h3>
                    <DatePicker selected={new Date(start)} onChange={date => setStart(date?.toISOString().split('T')[0] ?? '1993-01-01')} />
                </div>
                <div>
                    <h3>End:</h3>
                    <DatePicker selected={new Date(end)} onChange={date => setEnd(date?.toISOString().split('T')[0] ?? `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`)} />
                </div>
            </div>
            <Line options={options} data={chartDataSet} />
        </>
    )
}

export default Debt;