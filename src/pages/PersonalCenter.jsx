import React from 'react';
import { getUserProfile, updateUserProfile } from '../api'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { notification } from 'antd';

const styles = theme => ({
    root: {
        width: '720px',
        maxWidth: 720,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        marginRight: '20px'
    }
});

class PersonalCenter extends React.Component {
    state = {
        isEdit: false
    };

    componentDidMount() {
        getUserProfile((data) => {
            console.log(data)
            const { data: { data: { id, nickName, password, role, trueName } } } = data
            this.setState({
                id, nickName, role, trueName,
                iniPassword: password,
                iniNickName: nickName
            })
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    toggleEdit = () => {
        this.setState({ isEdit: !this.state.isEdit, nickName: this.state.iniNickName })
    }
    submitChange = () => {
        console.log(this.state)
        const { id, nickName, role, trueName, password, rePassword, iniNickName, iniPassword } = this.state
        if (password && password !== rePassword) {
            notification.error({
                message: '两次输入密码不一致',
                description: '两次输入密码不一致',
            });
            return 0
        }
        const data = {
            id: id,
            role: role,
            trueName: trueName,
            nickName: nickName || iniNickName,
            password: rePassword || iniPassword
        }
        updateUserProfile(data,(res)=>{
            console.log(res)
            localStorage.removeItem('loginState');
            window.location.href = '/'
        })
    }
    render() {
        const { classes } = this.props;
        const { id, nickName, role, trueName, password, isEdit, rePassword } = this.state
        return (
            <div>
                <div>个人中心</div>
                <br />
                <List className={classes.root}>
                    <ListItem>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                        <ListItemText primary="用户ID" secondary={id} />
                    </ListItem>
                    {isEdit ?
                        <ListItem>
                            <TextField
                                id="nickName"
                                label="昵称"
                                className={classes.textField}
                                value={nickName}
                                onChange={this.handleChange('nickName')}
                                margin="normal"
                                variant="outlined"
                            />
                        </ListItem>
                        :
                        <ListItem>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            <ListItemText primary="昵称" secondary={nickName} />
                        </ListItem>
                    }
                    <ListItem>
                        <Avatar>
                            <BeachAccessIcon />
                        </Avatar>
                        <ListItemText primary="角色" secondary={role ? '管理员' : '用户'} />
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                        <ListItemText primary="真实姓名" secondary={trueName} />
                    </ListItem>
                    {isEdit &&
                        <ListItem>
                            <TextField
                                id="password"
                                label="新密码"
                                className={classes.textField}
                                type="password"
                                value={password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                                variant="outlined"
                            />
                        </ListItem>}
                    {isEdit &&
                        <ListItem>
                            <TextField
                                id="rePassword"
                                label="重复输入密码"
                                className={classes.textField}
                                type="password"
                                value={rePassword}
                                onChange={this.handleChange('rePassword')}
                                margin="normal"
                                variant="outlined"
                            />
                        </ListItem>}
                    <ListItem>
                        <Button onClick={this.toggleEdit} variant="contained" color="secondary" className={classes.button}>
                            {isEdit ? '取消' : '编辑'}
                        </Button>
                        {
                            isEdit &&
                            <Button onClick={this.submitChange} variant="contained" color="secondary" className={classes.button}>
                                提交
                        </Button>}
                    </ListItem>
                </List>
            </div>
        );
    }
}


PersonalCenter.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PersonalCenter);