import React from 'react';
import ReactMarkdown from 'react-markdown';

// CSS files
import './Page.css';
import 'github-markdown-css/github-markdown.css';

// get location of images folder in webpack
const imageContext = require.context('../assets/images/description', true);
const imageFiles = imageContext
    .keys()
    .map((filename) => imageContext(filename));
console.log(imageFiles);

// also get location of the markdown text files to use
const markdownContext = require.context('../assets/data/sections/', false, /\.md$/);
// grab uri of each markdown file in here
const markdownFiles = markdownContext
    .keys()
    .map((filename) => markdownContext(filename));
console.log(markdownFiles);

class Page extends React.Component {
    constructor(props) {
        console.log(props.location);
        // props are still accessible through super constructor
        super(props);
        // default set state for derived variables
        this.state = {
            id: 'introduction',
            fileURL: '',
            text: ''
        }

        // if no state is passed, default to introduction id
        var that = this;
        if (props.location.state !== undefined)
            this.state.id = props.location.state.id;

        // use id to find file.
        markdownFiles.forEach(function(file) {
            if(file.includes(that.state.id))
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

        // replace all image calls in this file with relevant image contexts.
        // 1. Get an array of all image calls in this.state.text using regex
        // 2. match each one with imageFile names; create an similar sized array with each match in index order respective of the original.
        // 3. replace each instance in this.state.text with the respective uri.
        // (?<=\().+?(?=\))
    }

    render() {
        return (
            <div>
                <ReactMarkdown className="markdown-body-full" source={this.state.text}/>
            </div>
        );
    }
}

export default Page;
