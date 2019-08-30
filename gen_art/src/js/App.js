import React from 'react';
import '../css/App.css';
import SectionList from './SectionList';

/**
 * class App holds the SPA. Currently, there is only one main component, SectionList.
 * @extends React
 */
class App extends React.Component {
    render() {
        return (
            <SectionList></SectionList>
        );
    }
}

export default App;
