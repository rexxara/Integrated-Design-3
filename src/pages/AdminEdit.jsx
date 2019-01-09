import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { adminUserAdd, adminUser, adminUpdate } from '../api'
import { notification } from 'antd';

const styles = theme => ({
    root: {
        width: 720,
        maxWidth: 720,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    header: {
        color: 'white'
    }
});


class AdminEdit extends React.Component {

    state = {
        nickName: '',
        trueName: '',
        password: '',
        rePassword: '',
        role: 0
    };
    componentDidMount() {
        const { match: { params } } = this.props
        if (params.id !== 'new') {
            adminUser(params.id, (res) => {
                const { data: { data } } = res
                console.log(data)
                this.setState({
                    nickName: data.nickName,
                    trueName: data.trueName,
                    password: data.password,
                    role: data.role,
                })
            })
        } else {
            console.log('new')
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleClose = () => {
        this.props.history.goBack()
    }
    createUser = () => {
        const { nickName, role, trueName, password, rePassword } = this.state
        const { match: { params: { id } } } = this.props
        if (password !== rePassword) {
            notification.error({
                message: '两次输入密码不一致',
                description: '两次输入密码不一致',
            });
            return 0
        }
        if (id === 'new') {
            const data = {
                role: role,
                trueName: trueName,
                nickName: nickName,
                password: rePassword
            }
            adminUserAdd(data, (res) => {
                const { data } = res
                if (data.code === 0) {
                    notification.success({
                        message: '操作成功',
                        description: data.msg,
                    });
                    this.props.history.goBack()
                }
            })
        } else {
            const data = {
                role: role,
                trueName: trueName,
                nickName: nickName,
                password: rePassword,
                id: id
            }
            adminUpdate(data, (res) => {
                const { data } = res
                if (data.code === 0) {
                    notification.success({
                        message: '操作成功',
                        description: data.msg,
                    });
                    this.props.history.goBack()
                }
            })
        }
    }
    render() {
        const { classes } = this.props;
        const { match: { params: { id } } } = this.props
        return (
            <div>
                <br />
                <h2 className={classes.header} >{id === 'new' ? '新建' : '编辑'}用户</h2>
                <br />
                <form noValidate autoComplete="off">
                    <List component="nav" className={classes.root}>
                        <ListItem >
                            <TextField
                                required
                                id="nickName"
                                label="昵称"
                                className={classes.textField}
                                value={this.state.nickName}
                                onChange={this.handleChange('nickName')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="trueName"
                                label="真实姓名"
                                className={classes.textField}
                                value={this.state.trueName}
                                onChange={this.handleChange('trueName')}
                                margin="normal"
                                variant="outlined"
                            />
                        </ListItem>
                        <ListItem >
                            <TextField
                                required
                                id="password"
                                label="密码"
                                type="password"
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="rePassword"
                                label="重新输入密码"
                                type="password"
                                className={classes.textField}
                                value={this.state.rePassword}
                                onChange={this.handleChange('rePassword')}
                                margin="normal"
                                variant="outlined"
                            />
                        </ListItem>
                        <ListItem>

                            <TextField
                                required
                                id="role"
                                select
                                label="role"
                                className={classes.textField}
                                value={this.state.role}
                                onChange={this.handleChange('role')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="配置权限"
                                margin="normal"
                            >
                                {[{ label: '管理员', value: 1 }, { label: '用户', value: 0 }].map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </ListItem>
                        <Button variant="contained" onClick={this.handleClose} color="primary">
                            取消
            </Button>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                    <Button variant="contained" onClick={this.createUser} color="secondary" autoFocus>
                            创建
            </Button>
                    </List>
                </form>
            </div>
        );
    }
}

AdminEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminEdit);