import React from 'react';
import './SectionList.css';
import Section from './Section';
import sectionData from '../assets/data/sections.json';

class SectionList extends React.Component {
    // section items is a map of Section components with prop data as the section data
    render() {
        const sectionItems = sectionData.map((section) =>
            <Section
                key={section.title.toString()}
                name={section.title}
                thumbnailURL={section.thumbnailURL}
                sectionID={section.sectionID}
                >
            </Section>
        );
        return (
            // return a list of section items
            <div className="App">
                <ul>{sectionItems}</ul>
            </div>
            // route to each dynamically loaded generative art page
        );
    }

}

export default SectionList;
