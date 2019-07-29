import React from 'react';
import './App.css';
import Section from './Section';

function App() {
    var sections = ["Matthew", "Samantha", "Mindy"];
    const sectionItems = sections.map((section) =>
        <Section
            key={section.toString()}
            name={section}>
            </Section>
    );
    return (
        <div className="App">
            <ul>{sectionItems}</ul>
        </div>
    );
}

export default App;
