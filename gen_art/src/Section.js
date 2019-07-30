import React from 'react';
// import ReactMarkdown from 'react-markdown';
import './Section.css';

// get location of images folder in webpack
const images = require.context('./assets/images', true);
// also get location of the markdown text files to use
const markdownContext = require.context('./assets/data/sections/', false, /\.md$/);
// grab uri of each markdown file in here
const markdownFiles = markdownContext
    .keys()
    .map((filename) => markdownContext(filename));
console.log(markdownFiles);

function Section(props) {
    // generate thumbnail
    let thumbnailURL = '';
    if(props.thumbnailURL !== '')
        thumbnailURL = images('./' + props.thumbnailURL);
    else
        thumbnailURL = images('./moon2.png');

    // generate section text blurb
    // first, find the url of the matching section

    // load that file

    // grab the first x characters

    // append a hyperlink to more...

    return (
        <div className="section">
            <img className="thumbnail" src={thumbnailURL} alt={props.thumbnailURL}></img>
            <div className="details">
                <h1>Hello, {props.name}</h1>
                <p>first xx words...</p>
            </div>
        </div>
    );
}

export default Section;
