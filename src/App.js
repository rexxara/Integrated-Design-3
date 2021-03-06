import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
//components
import BasicLayOut from './components/basicLayOut';
import Drawer from './components/drawer';
//pages
import Home from './pages/Home';
import Admin from './pages/Admin';
import Bill from './pages/Bill';
import AccountEntries from './pages/AccountEntries';
import PersonalCenter from './pages/PersonalCenter';
import Login from './pages/Login';
import AdminEdit from './pages/AdminEdit';
import ItemEdit from './pages/ItemEdit';
import AccountEdit from './pages/AccountEdit';

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
          <Drawer loginState={loginState} isOpen={this.state.drawerOpen} toggleDrawer={this.toggleDrawer}/>
          <div>
            <Route path="/main/home" component={Home} />
            <Route path="/main/账单"render= {()=><Bill loginState={loginState}/>} />
            <Route path="/main/账户条目" component={AccountEntries} />
            <Route path="/main/个人中心" component={PersonalCenter} />
            <Route path="/main/Admin用户管理" component={Admin} />
            <Route path={`/main/admin/Edit/:id`} component={AdminEdit} />
            <Route path={`/main/item/Edit/:id`} component={ItemEdit} />
            <Route path={`/main/account/Edit/:id`} component={AccountEdit} />
            
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
