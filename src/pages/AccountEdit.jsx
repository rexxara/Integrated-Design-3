import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { getItemDetail, addAccount, getUserItemsByuserID } from '../api'
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


class AccountEdit extends React.Component {

    state = {
        money: 200,
        description: '无',
        items: [],
        itemID: ''
    };
    componentDidMount() {
        let loginState = localStorage.getItem('loginState')
        try {
            loginState = JSON.parse(loginState)
        } catch (error) {

        }

        getUserItemsByuserID(loginState.id, (res) => {
            const { data } = res
            const items = data.data.filter(el => el.owner === loginState.id)
            this.setState({ userId: loginState.id, items: items, itemID: items[0].id })
        })
        const { match: { params } } = this.props
        if (params.id !== 'new') {
            getItemDetail(params.id, (res) => {
                console.log(res)
                const { data: { code, data, msg } } = res
                console.log(data)
                if (code === 67673) {
                    notification.error({
                        message: '不能操作',
                        description: msg,
                    });
                    this.props.history.goBack()
                } else {
                    this.setState({
                        id: data.id,
                        name: data.name,
                        owner: data.owner,
                        type: data.type,
                        description: data.description || '无'
                    })
                }
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
        const { money, description, itemID, userId } = this.state
        const date = new Date()
        const form = {
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            money: money,
            description: description,
            itemId: itemID,
            userId: userId
        }
        console.log(form)
        addAccount(form, (res) => {
            const { data } = res
            if (data.code === 0) {
                notification.success({
                    message: '操作成功',
                    description: data.msg,
                });
                this.props.history.goBack()
            }
        })
        //addAccount
        // const { name, owner, type, description } = this.state
        // const { match: { params: { id } } } = this.props
        // if (id === 'new') {
        //     const data = {
        //         name: name,
        //         owner: owner,
        //         type: type,
        //         description: description
        //     }
        //     addItem(data, (res) => {
        //         const { data } = res
        //         if (data.code === 0) {
        //             notification.success({
        //                 message: '操作成功',
        //                 description: data.msg,
        //             });
        //             this.props.history.goBack()
        //         }
        //     })
        // } else {
        //     const data = {
        //         name: name,
        //         owner: owner,
        //         type: type,
        //         description: description,
        //         id: id
        //     }
            // updateItem(data, (res) => {
            //     const { data } = res
            //     if (data.code === 0) {
            //         notification.success({
            //             message: '操作成功',
            //             description: data.msg,
            //         });
            //         this.props.history.goBack()
            //     }
            // })
        // }
    }
    render() {
        const { classes } = this.props;
        const { match: { params: { id } } } = this.props
        const { items,itemID } = this.state
        console.log(itemID)
        return (
            <div>
                <br />
                <h2 className={classes.header} >{id === 'new' ? '新建' : '编辑'}账单条目</h2>
                <br />
                <form noValidate autoComplete="off">
                    <List component="nav" className={classes.root}>
                        <ListItem >
                            <TextField
                                required
                                id="money"
                                label="花费"
                                className={classes.textField}
                                value={this.state.money}
                                onChange={this.handleChange('money')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="description"
                                label="备注"
                                className={classes.textField}
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                required
                                id="itemID"
                                select
                                label="账户条目"
                                className={classes.textField}
                                value={this.state.itemID}
                                onChange={this.handleChange('itemID')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="配置权限"
                                margin="normal"
                            >
                                {items.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        &nbsp;&nbsp;{option.name}&nbsp;&nbsp;
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
                            确认
            </Button>
                    </List>
                </form>
            </div>
        );
    }
}

AccountEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountEdit);