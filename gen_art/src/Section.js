import React from 'react';
import './Section.css';

function Section(props) {
    return (
        <div className="Section">
            <h1>Hello, {props.name}</h1>
        </div>
    );
}

export default Section;
