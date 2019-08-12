import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import SectionList from './SectionList';
import Page from './Page';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/pages/:id"
                        component={Page}
                    />
                    <Route
                        path="/"
                        component={SectionList}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
