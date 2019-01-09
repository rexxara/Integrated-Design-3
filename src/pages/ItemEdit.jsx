import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { getItemDetail,addItem,updateItem } from '../api'
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


class ItemEdit extends React.Component {

    state = {
        name: '',
        owner: 1,
        type: 1,
        description:'无'
    };
    componentWillMount(){
    }
    componentDidMount() {
        let loginState=localStorage.getItem('loginState')
        try {
          loginState=JSON.parse(loginState)
        } catch (error) {
          
        }
        console.log(loginState)
        const { match: { params } } = this.props
        if (params.id !== 'new') {
            getItemDetail(params.id, (res) => {
                console.log(res)
                const { data: { code,data,msg } } = res
                console.log(data)
                if(code===67673){
                    notification.error({
                        message: '不能操作',
                        description: msg,
                    });
                    this.props.history.goBack()
                }else{
                this.setState({
                    id: data.id,
                    name: data.name,
                    owner: data.owner,
                    type: data.type,
                    description:data.description||'无'
                })
                }
            })
        } else {
            console.log('new')
            this.setState({
                owner: loginState.id,
            })
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
        console.log(this.state)
        const { name, owner, type, description } = this.state
        const { match: { params: { id } } } = this.props
        if (id === 'new') {
            const data = {
                name: name,
                owner: owner,
                type: type,
                description: description
            }
            addItem(data, (res) => {
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
                name: name,
                owner: owner,
                type: type,
                description: description,
                id: id
            }
            updateItem(data, (res) => {
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
                <h2 className={classes.header} >{id === 'new' ? '新建' : '编辑'}账户条目</h2>
                <br />
                <form noValidate autoComplete="off">
                    <List component="nav" className={classes.root}>
                        <ListItem >
                            <TextField
                                required
                                id="name"
                                label="条目名称"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <TextField
                                required
                                id="owner"
                                label="创建者ID"
                                className={classes.textField}
                                value={this.state.owner}
                                onChange={this.handleChange('owner')}
                                margin="normal"
                                variant="outlined"
                            /> */}
                        {/* </ListItem>
                        <ListItem > */}
                            <TextField
                                required
                                id="description"
                                label="说明"
                                className={classes.textField}
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="type"
                                select
                                label="收/支"
                                className={classes.textField}
                                value={this.state.type}
                                onChange={this.handleChange('type')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="收入或支出"
                                margin="normal"
                            >
                                {[{ label: '支出', value: 1 }, { label: '收入', value: 0 }].map(option => (
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
                            确认
            </Button>
                    </List>
                </form>
            </div>
        );
    }
}

ItemEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemEdit);