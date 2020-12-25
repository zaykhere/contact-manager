import React, {Component} from 'react';
import Contacts from './components/Contacts';
import Header from './components/Header';
import About from './components/About';
import NotFound from './components/NotFound';
import {Provider} from './context';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import {HashRouter, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return(
      <Provider>
      <HashRouter>

      <div className="app">
        <Header heading="Contact Manager" />
        <div className="container">
        <Switch>
          <Route exact path="/" component={Contacts} />
          <Route exact path="/add-contact" component={AddContact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/edit-contact/:id" component={EditContact} />
          <Route component={NotFound} />
        </Switch>
      </div>
      </div>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;
// ReactDOM.render(<App />, document.getElementById('app'));
