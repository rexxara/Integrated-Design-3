import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
//components
import BasicLayOut from './components/basicLayOut';
import Drawer from './components/drawer';
//pages
import Home from './pages/Home';
import Bill from './pages/Bill';
import AccountEntries from './pages/AccountEntries';
import PersonalCenter from './pages/PersonalCenter';
import Login from './pages/Login';

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
    let loginState=localStorage.getItem('loginState')
    try {
      loginState=JSON.parse(loginState)
    } catch (error) {
      
    }
      return (
        <Router>
          <div className="App">
          <Route exact path="/" render= {()=><Redirect to="/main/home"/>} />
          <Route
          path={'/main'}
          render={() => { return loginState?<header className="App-header">
          <BasicLayOut loginState={loginState} openDrawerHandle={this.toggleDrawer}/>
          <Drawer isOpen={this.state.drawerOpen} toggleDrawer={this.toggleDrawer}/>
          <div>
            <Route path="/main/home" component={Home} />
            <Route path="/main/账单"render= {()=><Bill loginState={loginState}/>} />
            <Route path="/main/账户条目" component={AccountEntries} />
            <Route path="/main/个人中心" component={PersonalCenter} />
          </div>
          </header>
            :
            <Redirect to="/login" />}}/>
              <Route exact path="/login" component={Login} />
        </div>
        </Router>
      );
    }
}
export default App;
