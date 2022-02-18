import React, { useState } from 'react';
import './style.css'

const fun_fact_array = [
    "I love dogs",
    "I love cats",
    "I have a family",
    "I love TV",
    "I get excited about things",
    "I love summer",
    "I like eating pizza",
    "I like eating ice cream",
    "I try to stay active",
    "I love the beach",
    "I'm secretly a messy person",
    "I secretly love romantic comedies",
    "I think I'm a good person",
    "I love spending time with friends and family",
    "I like reading",
    "I love staying in bed on the weekends",
    "I love painting",
    "I love writing",
    "I like to draw",
    "I'm quirky!",
    "I'm secretly so weird!",
    "I talk to myself sometimes!",
    "I love the holidays",
    "I've met a celebrity",
    "I've been told I'm smart",
    "People tell me I'm funny!"
];

const FunFacts = () => {
    const [fun_fact, setFun_fact] = useState(fun_fact_array[0]);
    const [status, setStatus] = useState("");

    return (
        <>
            <h1>Fun Facts For People Who Aren't Fun!</h1>
            <button 
                onClick={() => setFun_fact(fun_fact_array[Math.floor(Math.random()*fun_fact_array.length)])}
            >
                <h4>Generate new fun fact</h4>
            </button>
            <h2>Your fun fact: </h2><span className={"fact"}>{fun_fact}</span>
            <hr></hr>
            <form
                onSubmit={event => {
                    event.preventDefault();
                    const form = event.target;
                    const data = new FormData(form);
                    const xhr = new XMLHttpRequest();
                    xhr.open(form.method, form.action);
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState !== XMLHttpRequest.DONE) return;
                        if (xhr.status === 200) {
                            form.reset();
                            setStatus("SUCCESS");
                        } else {
                            setStatus("ERROR");
                        }
                    };
                    xhr.send(data);
                }}
                action="https://formspree.io/f/mgepkqyl"
                method="POST"
            >
                <h3>Submit your own fun fact:</h3>
                <input type="text" name="message" autoComplete="off"></input>
                { status === "SUCCESS" ? <p>Thanks!</p> : <button className={'submit'} type="submit">Send</button> }
                { status === "ERROR" && <p>Oops! There's been an error...</p> }
            </form>
        </>
    )
}

export default FunFacts;