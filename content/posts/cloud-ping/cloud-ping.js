import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    border: 2px solid black;
`;

const StyledTh = styled.th`
    border: 2px solid black;
    padding: 0.25rem;
`;

const StyledTd = styled.td`
    border: 2px solid black;
    padding: 0.25rem;
`;

const StyledButton = styled.button`
    display: inline block;
    padding: 0.35rem 1.2rem;
    border: 0.1rem solid black;
    border-radius: 5px;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 500;
    color: black;
    text-align: center;
    background-color: rgb(119, 221, 119);
    font-size: larger;
    margin-top: 1rem;
    line-height: 1.1;
    transition: all 0.2s;
    font-family: inherit;

    &:disabled {
        background-color: rgb(67, 167, 67);
    }

    &:active, &:focus {
        box-shadow: 0 0 0 2px black;
    }
`;

const CloudPing = () => {
    const [loading, setLoading] = useState(false);
    const [ping, setPing] = useState([]);

    const getPing = () => {
        setLoading(true);

        Promise.all([
            fetch("https://dynamodb.us-east-1.amazonaws.com"),
            fetch("https://dynamodb.us-east-2.amazonaws.com"),
            fetch("https://dynamodb.us-west-1.amazonaws.com"),
            fetch("https://dynamodb.us-west-2.amazonaws.com"),
            fetch("https://dynamodb.af-south-1.amazonaws.com"),
            fetch("https://dynamodb.ap-east-1.amazonaws.com"),
            fetch("https://dynamodb.ap-northeast-1.amazonaws.com"),
            fetch("https://dynamodb.ap-northeast-2.amazonaws.com"),
            fetch("https://dynamodb.ap-northeast-3.amazonaws.com"),
            fetch("https://dynamodb.ap-southeast-1.amazonaws.com"),
            fetch("https://dynamodb.ap-southeast-2.amazonaws.com"),
            fetch("https://dynamodb.ca-central-1.amazonaws.com"),
            fetch("https://dynamodb.eu-central-1.amazonaws.com"),
            fetch("https://dynamodb.eu-west-1.amazonaws.com"),
            fetch("https://dynamodb.eu-west-2.amazonaws.com"),
            fetch("https://dynamodb.eu-west-3.amazonaws.com"),
            fetch("https://dynamodb.eu-south-1.amazonaws.com"),
            fetch("https://dynamodb.me-south-1.amazonaws.com"),
            fetch("https://dynamodb.sa-east-1.amazonaws.com"),
            fetch("https://dynamodb.us-gov-east-1.amazonaws.com"),
            fetch("https://dynamodb.us-gov-west-1.amazonaws.com")
        ])
        .then(() => {
            // We need a delay here bc for some reason the performance API sometimes doesn't log requests fast enough?
            // 750 ms is pretty high - could potentially be lowered to 100 or less, but I want everything to show up
            setTimeout(() => {
                const perf = performance.getEntriesByType('resource');
                setPing(
                    perf.filter(el => el.name.match(/(?<=https:\/\/dynamodb.)(.*)(?=.amazonaws.com\/)/gm))
                        .map(el => ({ region: el.name.match(/(?<=https:\/\/dynamodb.)(.*)(?=.amazonaws.com\/)/gm)[0], ping: (el.responseEnd - el.startTime) }))
                        .sort((a, b) => a.ping - b.ping)
                );
                performance.clearResourceTimings();
                setLoading(false);
            }, 750);
        });
    }

    useEffect(() => {
        getPing();
    }, []);

    return (
        <Container>
            <h1>AWS Region Latency</h1>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>Region</StyledTh>
                        <StyledTh>Ping</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    { ping.map(el => 
                        <tr key={el.region}>
                            <StyledTd>{el.region}</StyledTd>
                            <StyledTd>{el.ping.toFixed(1)} ms</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <StyledButton onClick={getPing} disabled={loading}>{ loading ? <BeatLoader loading={loading} size={10} /> : 'Ping' }</StyledButton>
        </Container>
    )
}

export default CloudPing;