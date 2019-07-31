import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

// CSS files
import './Section.css';
import 'github-markdown-css/github-markdown.css';


// get location of images folder in webpack
const images = require.context('./assets/images', true);
// also get location of the markdown text files to use
const markdownContext = require.context('./assets/data/sections/', false, /\.md$/);
// grab uri of each markdown file in here
const markdownFiles = markdownContext
    .keys()
    .map((filename) => markdownContext(filename));
console.log(markdownFiles);

class Section extends React.Component {
    constructor(props) {
        console.log("Section " + props.name);
        // props are still accessible through super constructor
        super(props);
        // default set state for derived variables
        this.state = {
            fileURL: '',
            thumbnailURL: '',
            text: ''
        }

        // generate thumbnail
        if(props.thumbnailURL !== '')
            this.state.thumbnailURL = images('./' + props.thumbnailURL);
        else
            this.state.thumbnailURL = images('./moon2.png');

        // generate section text blurb
        // first, find the url of the matching section
        var that = this;
        markdownFiles.forEach(function(file) {
            if(file.includes(props.sectionID))
                that.state.fileURL = file;
        });
    }

    // reactjs.org says that this function is a good place to load remote data, say from your github server
    componentDidMount(){
        // load that file
        console.log(this.state.fileURL);
        fetch(this.state.fileURL)
            .then(result => result.text())
            .then(result => this.setState({text: result}));
        // console.log(file);

        // append a hyperlink to more...
    }

    render(){
        return (
            <div className="section">
                <img className="thumbnail" src={this.state.thumbnailURL} alt={this.props.thumbnailURL}></img>
                <div className="details">
                    <ReactMarkdown className="markdown-body" source={this.state.text} />
                    <a id="link" href="../public/Grids.html">See More...</a>
                </div>
            </div>
        );
    }
}

export default Section;
