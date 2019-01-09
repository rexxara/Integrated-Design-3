import React from 'react';
import { getItemBypage,deleteItem } from '../api'

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

class AccountEntries extends React.Component {
    state = {
        page: 1,
        currentDelete:{},
        rows:[],
        open:false
    };
    componentDidMount() {
        this.getData(1)
    }
    getData(page){
        getItemBypage(page, (data) => {
            let res = data.data
            this.setState({
                rows: res.data
            })
        })

    }
    handleClickOpen = (row) => {
        this.setState({ open: true, currentDelete: row });
    };
    deleteUser=()=>{
        const {id}=this.state.currentDelete
        const {rows}=this.state
        deleteItem(id,(res)=>{
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
    handleClose = () => {
        this.setState({ open: false });
    };
    nextAndPre=(type)=>{
        const {page}=this.state
        if(type==='next'){
            this.getData(page+1)
            this.setState({page:this.state.page+1})
        }else{
            this.getData(page-1)
            this.setState({page:this.state.page-1})
        }
    }
    render() {
        const { classes } = this.props;
        const {page,rows,currentDelete}=this.state;
        console.log(rows)
        return (
            <div>
                <div>账户条目</div>
                <br />
                <Link to='/main/item/Edit/new'>
                    <Fab color="secondary" aria-label="Add" className={classes.margin}>
                        <AddIcon />
                    </Fab>
                </Link>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">条目ID</TableCell>
                                <TableCell align="right">收入/支出</TableCell>
                                <TableCell align="right">发起者</TableCell>
                                <TableCell align="right">名称</TableCell>
                                <TableCell>备注</TableCell>
                                <TableCell align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell align="right">{row.id}</TableCell>
                                        <TableCell align="right">{row.type==='1'?'支出':'收入'}</TableCell>
                                        <TableCell align="right">{row.owner}</TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/main/item/Edit/${row.id}`}><Button color="primary">编辑</Button></Link>
                                            <Button color="secondary" onClick={() => { this.handleClickOpen(row) }} >删除</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>

                <Button disabled={page===1} onClick={()=>{this.nextAndPre('pre')}} variant="contained" color="primary" className={classes.button}>
                    上一页
                </Button>
                <Button disabled={rows.length<1} onClick={()=>{this.nextAndPre('next')}} variant="contained" color="primary" className={classes.button}>
                    下一页
                </Button>
                
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`确定要删除ID为${currentDelete.id}的条目吗？`}</DialogTitle>
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

AccountEntries.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AccountEntries);