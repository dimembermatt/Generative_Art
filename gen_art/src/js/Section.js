import React from 'react';
import ReactMarkdown from 'react-markdown';
import SkyLight from 'react-skylight';

// CSS files
import '../css/Section.css';
import '../res/github-markdown.css';

// get location of images folder in webpack
var imageContext;
// also get location of the markdown text files to use
var markdownContext;

imageContext    = require.context('../images', true);
markdownContext = require.context('../res/markdown_docs/', false, /\.md$/);// grab uri of each markdown file in here


const markdownFiles = markdownContext
    .keys()
    .map((filename) => markdownContext(filename));
console.log(markdownFiles);

// -------------------------------------------------------------

//  -----------------------------------------------------------
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
            this.state.thumbnailURL = imageContext('./thumbnails/' + props.thumbnailURL);
        else
            this.state.thumbnailURL = imageContext('./thumbnails/moon2.png');

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
    }

    render(){
        // style
        var dialogStyle = {
            backgroundColor: 'rgb(245, 245, 245)',
            color: '#ffffff',
            width: '90%',
            height: '90%',
            marginTop: '2%',
            marginLeft: '4.5%',
            top: '0%',
            left: '0%',
            closeButtonStyle: {
                color: 'black'
            }
        };
        // URI for image assets transformation in the markdown
        const getURI = function(input){
            return imageContext(input);
        };

        return (
            <div className="section">
                <img className="thumbnail" src={this.state.thumbnailURL} alt={this.props.thumbnailURL}></img>
                <div className="details">
                    <ReactMarkdown
                        className="markdown-body summary"
                        source={this.state.text}
                        skipHtml={true}
                        disallowedTypes={['image', 'imageReference']}
                        unwrapDisallowed={true}
                    />
                    <button onClick={() => this.untitled.show()}>Read more...</button>
                    <SkyLight dialogStyles={dialogStyle} hideOnOverlayClicked ref={ref => this.untitled = ref}>
                        <ReactMarkdown className="markdown-body full"
                            source={this.state.text}
                            escapeHtml={false}
                            transformImageUri={getURI}
                        />
                    </SkyLight>
                </div>
            </div>
        );
    }
}

export default Section;
