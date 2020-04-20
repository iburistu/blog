import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const Oldie = () => {
    const [chart, setChart] = useState(null);
    const [age, setAge] = useState(22);

    const ageRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        let submitAge = ageRef.current.value;
        if (submitAge < 0) setAge(0);
        else if (submitAge > 100) setAge(99);
        else setAge(submitAge);
    }

    useEffect(() => {
        const generateChart = age => {
            // Constants used to generate the curve
            const H = 141.9;
            const G = 0.057;
            const S = 0.75;
            const steps = 100;
            const M = age;
            // Array that holds the data
            let data = [];
            for (let x = age; x < steps; x++) {
                data.push({
                    x: x,
                    y: (H * (1 / (G * (x - M))) * (1 / (S * Math.sqrt(2 * Math.PI))) * Math.exp(-1 * (Math.log(G * (x - M)) ** 2) / (2 * S**2)))?.toFixed(2) || 0
                })
            }
            
            const dataSet = {
                labels: data.map(e => e.x),
                datasets: [
                    {
                        label: '100% Accurate Formula to Determine Teasiblity',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data
                    }
                ]
            }

            const options = {
                scales: {
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Percentage of OK-ness to tease about being old'
                        }
                    }],
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: `Victim's Age`
                        }
                    }]
                }
            }
            return <Line data={dataSet} options={options}/>
        }

        setChart(generateChart(age));

    },[age])

    return (
        <>
            <form onSubmit={handleSubmit} style={{display: 'flex'}}>
                <input type="number" ref={ageRef} placeholder={age} style={{marginRight: '1rem', paddingLeft: '0.25rem', border: '1px solid black', fontFamily: 'IBM Plex Sans'}} />
                <button type="submit" style={{border: '1px solid black', fontFamily: 'IBM Plex Sans'}}>Recalculate</button>
            </form>
            
            <h2>Your Age: {age}</h2>
            <h2>Peak Teasing Age: {parseFloat(age) + 10}</h2>
            {chart}
        </>
    )
}

export default Oldie;