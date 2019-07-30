import React from 'react';
import './App.css';
import Section from './Section';
import sectionData from './assets/data/sections.json';

function App() {
    // section items is a map of Section components with prop data as the section data
    const sectionItems = sectionData.map((section) =>
        <Section
            key={section.title.toString()}
            name={section.title}
            thumbnailURL={section.thumbnailURL}
            sectionURL={section.sectionID}
            >
        </Section>
    );
    return (
        // return a list of section items
        <div className="App">
            <ul>{sectionItems}</ul>
        </div>
    );
}

export default App;
