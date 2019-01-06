import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//components
import BasicLayOut from './components/basicLayOut';
import Drawer from './components/drawer';
//pages
import Home from './pages/Home';
import Bill from './pages/Bill';
import AccountEntries from './pages/AccountEntries';
import PersonalCenter from './pages/PersonalCenter';
class App extends Component {

  state = {
    drawerOpen:false
  };

  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <BasicLayOut openDrawerHandle={this.toggleDrawer}/>
          <Drawer isOpen={this.state.drawerOpen} toggleDrawer={this.toggleDrawer}/>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/账单" component={Bill} />
            <Route path="/账户条目" component={AccountEntries} />
            <Route path="/个人中心" component={PersonalCenter} />
          </div>
        </header>
      </div>
      </Router>
    );
  }
}

export default App;
