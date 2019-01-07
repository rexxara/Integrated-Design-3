import React from 'react';
import { Link } from "react-router-dom";
class Login extends React.Component {

    setlocalStorage=()=>{
        const loginState={
            userId:'001',
            isAdmin:true
        }
        localStorage.setItem('loginState', JSON.stringify(loginState));
        window.location.href='/'
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
                <Link to='/login'>Login</Link>
                <button onClick={this.setlocalStorage}>SetLoginLocalStorage</button>
                <button onClick={this.getlocalStorage}>getlocalStorage</button>
                <button onClick={this.removelocalStorage}>removelocalStorage</button>
            </div>
        );
    }
}

export default Login;
