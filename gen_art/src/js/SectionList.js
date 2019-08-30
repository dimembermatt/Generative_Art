import React from 'react';
import '../css/SectionList.css';
import Section from './Section';

// list of Generative Art entries defined in res/sections.json
var docList = require('../res/sections.json');

/**
 * class SectionList displays a list of Generative Art Sections.
 * The data for the list is pulled from a populated /res/sections.json.
 * @extends React
 */
class SectionList extends React.Component {
    // section items is a map of Section components with prop data as the section data
    render() {
        // map each entry as a section to a Section element.
        const sectionItems = docList.map((section) =>
            <Section
                key={section.title.toString()}
                name={section.title}
                thumbnailURL={section.thumbnailURL}
                imageMeta={section.images}
                sectionID={section.sectionID}
                expandable={section.expandable}
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
}

export default SectionList;
