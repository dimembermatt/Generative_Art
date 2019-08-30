import React from 'react';
import PhotoGallery from "react-photo-gallery";

/**
 * class Gallery displays a given list of photos.
 * @extends React
 * @props images - array of imageURIs to display
 */
class Gallery extends React.Component {
    constructor(props) {
        console.log("Images: ", props.images);
        super(props);
        this.state = {
            photos: []
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
    }

    render() {
        const headerStyle = {
            color: "black"
        };
        return (
            <div>
                <h2 style={headerStyle}>Gallery</h2>
                <PhotoGallery photos={this.state.photos} direction={"column"}/>
            </div>
        );
    }
}

export default Gallery;
