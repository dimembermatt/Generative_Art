import React from 'react';
import ReactMarkdown from 'react-markdown';
import SkyLight from 'react-skylight';
import Gallery from './Gallery';

// CSS files
import '../css/Section.css';
import '../css/github-markdown.css';

// get location of images folder in webpack
var imageContext    = require.context('../images', true);;
// also get location of the markdown text files to use
var markdownContext = require.context('../res/markdown_docs/', false, /\.md$/);;

// URI for image assets transformation in the markdown
const getURI = function(input){
    return imageContext(input);
};

/**
 * class Section creates an instance of a Generative Art Entry, containing a thumbnail, a summary description, and an expandable frame containing the entry content pulled from a markdown file.
 * @props
 *      key             - unique key for each component
 *      name            - official name for the Generative Art Entry
 *      thumbnailURL    - URL for section thumbnail
 *      imageMeta       - image URLs for gallery display, if any
 *      SectionID       - id used to grab markdown, image files
 *      expandable      - boolean whether there is expandable content to render
 * @extends React
 */
class Section extends React.Component {
    constructor(props) {
        // console.log("Section " + props.name);

        // props are still accessible through super constructor
        super(props);
        // default set state for derived variables
        this.state = {
            fileURL: '',
            images: [],
            thumbnailURL: '',
            text: ''
        };

        // generate thumbnail
        if(props.thumbnailURL !== '')
            this.state.thumbnailURL = getURI("./thumbnails/" + props.thumbnailURL);
        else
            this.state.thumbnailURL = getURI("./thumbnails/moon2.png");

        // grab file URL of the markdown file specified by the sectionID
        this.state.fileURL = markdownContext("./" + props.sectionID + ".md");

        // populate an array of images with the correct path substring
        var that = this;
        props.imageMeta.forEach(function(file) {
            // console.log(file);
            if(props.expandable === "true")
                that.state.images.push([getURI("./" + props.sectionID +  "/" + file[0]), file[1], file[2]]);
        });

        // console.log("SectionID: ", props.sectionID);
        // console.log("FileURL: ", this.state.fileURL);
        // console.log("ImageMeta: ", this.state.images);
    }

    // reactjs.org says that this function is a good place to load remote data, say from your github server
    componentDidMount() {
        // load the text from the markdown file
        fetch(this.state.fileURL)
            .then(result => result.text())
            .then(result => this.setState({text: result}));
    }

    render() {
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

        // only display gallery if images exist
        let gallery;
        if(this.state.images.length !== 0) {
            gallery =
                <Gallery
                    images={this.state.images}
                />;
        }

        // only display expandable if prop is true
        let expandable;
        if(this.props.expandable === "true"){
            expandable =
                <div>
                    <button onClick={() => this.untitled.show()}>Read more...</button>
                    <SkyLight dialogStyles={dialogStyle} hideOnOverlayClicked ref={ref => this.untitled = ref}>
                        <div className="full">
                            <ReactMarkdown className="markdown-body"
                                source={this.state.text}
                                escapeHtml={false}
                                transformImageUri={getURI}
                            />
                            <br/>
                            {gallery}
                        </div>
                    </SkyLight>
                </div>;
        }

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
                    {expandable}
                </div>
            </div>
        );
    }
}

export default Section;
