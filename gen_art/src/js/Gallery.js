import React from 'react';
import PhotoGallery from "react-photo-gallery";

/**
 * class Gallery displays a given list of photos.
 * @extends React
 * @props images - array of image metadata to display
 */
class Gallery extends React.Component {
    constructor(props) {
        // console.log("Images: ", props.images);
        super(props);
        this.state = {
            photos: [],
            display: false
        }

        // format to React Photo Gallery requirements
        var that = this;
        props.images.forEach(function(image) {
            that.state.photos.push({
                src: image[0],
                width: image[1],
                height: image[2]
            });
        });

        // bind onClick to React Component
        this.onClick = this.onClick.bind(this);
    }

    /**
     * onClick expands/collapses the gallery based on display state
     */
    onClick() {
        // console.log(this.state.display);
        if(this.state.display === false)
            this.setState({display: true});
        else
            this.setState({display: false});
    }

    render() {
        const headerStyle = {
            color: "black"
        };
        return (
            <div>
                <button onClick={this.onClick}>
                    <h2 style={headerStyle}>Gallery</h2>
                </button>
                {
                    this.state.display ?
                    <PhotoGallery
                        photos={this.state.photos}
                        direction={"column"}
                    /> : null
                }
            </div>
        );
    }
}

export default Gallery;
