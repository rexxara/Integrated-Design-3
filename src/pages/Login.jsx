import React from 'react';
import { login } from '../api'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { notification } from 'antd';
const styles = {
    root: {
        width: '100%',
        maxWidth: 360,
        margin: 'auto'
    },
    listItem: {
        margin: 'auto'
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
};
class Login extends React.Component {

    state = {
        loginDisable: false
    };
    setlocalStorage = () => {
        const loginState = {
            userId: '001',
            isAdmin: true
        }
        localStorage.setItem('loginState', JSON.stringify(loginState));
        window.location.href = '/'
        console.log('succe')
    }
    getlocalStorage = () => {
        const res = localStorage.getItem('loginState');
        console.log(res)
    }
    removelocalStorage = () => {
        const res = localStorage.removeItem('loginState');
        console.log(res)
    }

    login = () => {
        this.setState({ loginDisable: true });
        const nickName = document.getElementById("nickName").value
        const password = document.getElementById("password").value
        login({
            nickName: nickName,
            password: password
        }, (res)=>{
            console.log(res)
            const {data}=res
            this.setState({ loginDisable: false });
            if(data.code===0){
                this.loginSuccess(data)
            }else{
                this.loginFailed(data)
            }
        })
    }
    loginSuccess=(data)=>{
        const nickName = document.getElementById("nickName").value
        const loginState={
            nickName:nickName,
            isAdmin:data.data
        }
        localStorage.setItem('loginState', JSON.stringify(loginState));
        window.location.href = '/'
        const res = localStorage.getItem('loginState');
        console.log(res)
    }
    loginFailed=(data)=>{
        console.log(data)
        notification.error({
            message: '登陆失败',
            description: data.msg,
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
    }
    render() {
        const { loginDisable } = this.state;
        const { classes } = this.props;
        return (<div style={{ height: "80vh" }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        登陆
                </Typography>
                </Toolbar>
            </AppBar>
            <h2>登陆</h2>
            <List className={classes.root}>
                <ListItem className={classes.listItem}>
                    <TextField
                        required
                        id="nickName"
                        label="账号"
                        defaultValue=""
                        className={classes.listItem}
                        margin="normal"
                        variant="filled"
                    />
                </ListItem>

                <ListItem >
                    <TextField
                        required
                        id="password"
                        label="密码"
                        defaultValue=""
                        className={classes.listItem}
                        type="password"
                        margin="normal"
                        variant="filled"
                    />
                </ListItem>

                <Button disabled={loginDisable} onClick={this.login} className={classes.listItem} variant="contained" color="secondary" className={classes.button}>
                    登陆
                    </Button>
            </List>
            <button onClick={this.setlocalStorage}>SetLoginLocalStorage</button>
            <button onClick={this.getlocalStorage}>getlocalStorage</button>
            <button onClick={this.removelocalStorage}>removelocalStorage</button>
            <button onClick={this.loginFailed}>loginFailed</button>
        </div>
        );
    }
}

export default withStyles(styles)(Login);