import React, { useEffect, useState } from 'react';
import katex from './katex.mjs';
import { TwitterPicker } from 'react-color';
import './katex.min.css';

const eqns = [
    `a^2 + b^2 = c^2`,
    `\\log(xy) = \\log(x) + \\log(y)`,
    String.raw`\frac{df}{dt} = \lim_{h\to0 } = \frac{f(t + h) - f(t)}{h}`,
    String.raw`F = G\frac{m_1m_2}{r^2}`,
    `i^2 = -1`,
    String.raw`f(\omega) = \int_{\infty}^{\infty}f(x)e^{-2\pi ix\omega}dx`,
    String.raw`dS \geq 0`,
    String.raw`\nabla \cdot D= \rho_{v}`,
    String.raw`\nabla \cdot B = 0`,
    String.raw`\nabla \times E = -\frac{\partial B}{\partial t}`,
    String.raw`\nabla \times H = \frac{\partial D}{\partial t} + J`
];

const randomEqn = ~~(Math.random() * eqns.length);

const useScript = url => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.noModule = true;
        script.defer = true;
        script.integrity = "sha384-4z8mjH4yIpuK9dIQGR1JwbrfYsStrNK6MP+2Enhue4eyo0XlBDXOIPc8b6ZU0ajz";
        script.crossOrigin = 'anonymous'

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
  };

const Latex = () => {
    const [input, setInput] = useState(eqns[randomEqn]);
    const [fontSize, setFontSize] = useState(24);
    const [fontColor, setFontColor] = useState('');

    useScript("https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.js");

    useEffect(() => {
        katex.render(String.raw`${input}`, document.getElementById('latex'), {
            throwOnError: false,
            displayMode: true,
            maxExpand: 1,
            maxSize: 50,
            trust: false,
            output: 'html'
        });
    }, [input]);

    const handleColorChange = (color, e) => {
        setFontColor(`${color.hex}`);
    }

    const handleFontSizeChange = (e) => {
        const newFontSize = parseInt(e.target.value);
        if (newFontSize > 50) setFontSize(50);
        else if (newFontSize < 4) setFontSize(4);
        else setFontSize(newFontSize);
    }

    return (
        <div
            id="test"
            style={{
                border: '1px solid black',
                padding: '0 1rem'
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateRows: '70px 30px 70px 30px 70px 100px 250px',
                gridTemplateColumns: '100%',
                alignItems: 'center'
            }}>
                <h3
                    style={{
                        borderBottom: '1px solid black'
                    }}
                >
                    Input some <span dangerouslySetInnerHTML={{__html: katex.renderToString('\\LaTeX')}}></span></h3>
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                        fontSize: 'large',
                        fontFamily: 'inherit'
                    }}
                ></input>
                <h3
                    style={{
                        borderBottom: '1px solid black'
                    }}
                >
                    Change font size
                </h3>
                <input
                    type="number"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    style={{
                        width: '50px',
                        fontSize: 'large',
                        fontFamily: 'inherit'
                    }}
                ></input>
                <h3
                    style={{
                        borderBottom: '1px solid black'
                    }}
                >
                    Change font color
                </h3>
                <TwitterPicker 
                    color={fontColor}
                    onChange={handleColorChange}
                    colors={['#000000', '#FFFFFF', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7']}
                    triangle='hide'
                />
                <div 
                    id="latex"
                    style={{
                        fontSize: `${parseInt(fontSize) / 16}em`,
                        color: fontColor,
                        display: 'flex',
                        justifyContent: 'center',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        alignContent: 'center',
                        padding: '1.5rem',
                    }}
                ></div>
            </div>
        </div>
    );
}

export default Latex;