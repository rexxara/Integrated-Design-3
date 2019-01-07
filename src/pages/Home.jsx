import React from 'react';
import { Link } from "react-router-dom";
class Home extends React.Component {

    setlocalStorage=()=>{
        const loginState={
            userId:'001',
            isAdmin:true
        }
        localStorage.setItem('loginState', JSON.stringify(loginState));
        console.log('succe')
    }
    getlocalStorage=()=>{
        const res=localStorage.getItem('loginState');
        console.log(res)
    }
    removelocalStorage=()=>{
        const res=localStorage.removeItem('loginState');
        console.log(res)
    }
    render() {
        return (
            <div>
                <h2>homepage</h2>
                <Link to='/login'>gotoLogin</Link>
                <button onClick={this.setlocalStorage}>SetLoginLocalStorage</button>
                <button onClick={this.getlocalStorage}>getlocalStorage</button>
                <button onClick={this.removelocalStorage}>removelocalStorage</button>
            </div>
        );
    }
}

export default Home;
