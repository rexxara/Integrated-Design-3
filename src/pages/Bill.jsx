import React from 'react';
import { getAccountById,getAccountDetail,deleteAccount } from '../api'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { notification } from 'antd';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button:{
        marginLeft:'40px',
        marginRight:'40px'
    }
});

class Home extends React.Component {
    state = {
        open: false,
        rows: [],
        currentDelete:{}
    };

    handleClickOpen = (row) => {
        this.setState({ open: true, currentDelete: row });
    };
    componentDidMount() {
        const {id}=this.props.loginState
        getAccountById(id, (data) => {
            let res=data.data
            console.log(res.data)
            const items = res.data.filter(el => el.userId === id)
            this.setState({rows:items||[]})
        })
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    deleteUser=()=>{
        const {id}=this.state.currentDelete
        const {rows}=this.state
        deleteAccount(id,(res)=>{
            const {data}=res
            if(data.code===0){
                notification.success({
                    message: '删除成功！',
                    description: data.msg,
                });
                const newRows=rows.filter(el=> el.id!==id)
                this.setState({rows:newRows})
            }
        })
        this.handleClose()
    }
    render() {
        const {rows,currentDelete}=this.state
        const { classes } = this.props;
        return (
            <div>
            <div>账单</div>
                <br/>
                <Link to='/main/account/Edit/new'>
                    <Fab color="secondary" aria-label="Add" className={classes.margin}>
                        <AddIcon />
                    </Fab>
                </Link>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">账单ID</TableCell>
                                <TableCell align="right">花费</TableCell>
                                <TableCell align="right">描述</TableCell>
                                <TableCell align="right">日期</TableCell>
                                <TableCell align="center">操作</TableCell>
                                {/* <TableCell>账单条目ID</TableCell>
                                <TableCell>用户ID</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell align="right">{row.id}</TableCell>
                                        <TableCell align="right">{row.money}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        {/* <TableCell align="right">{row.itemId}</TableCell>
                                        <TableCell align="right">{row.userId}</TableCell> */}
                                        <TableCell align="right">
                                            {/* <Link to={`/main/account/Edit/${row.id}`}><Button color="primary">编辑</Button></Link> */}
                                            <Button color="secondary" onClick={() => { this.handleClickOpen(row) }} >删除</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`确定要删除这条记录吗？`}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="primary">
                            取消
            </Button>
                        <Button variant="contained" onClick={this.deleteUser} color="secondary" autoFocus>
                            删除
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);