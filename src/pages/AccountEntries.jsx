import React from 'react';
import { getItemBypage } from '../api'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
        rows:[]
    };
    componentDidMount() {
        this.getData(1)
    }
    getData(page){
        getItemBypage(page, (data) => {
            let res = data.data
            console.log(res.data)
            this.setState({
                rows: res.data
            })
        })

    }
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
        const {page,rows}=this.state;
        return (
            <div>
                <div>账户条目</div>
                <br />

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">条目ID</TableCell>
                                <TableCell align="right">收入/支出</TableCell>
                                <TableCell align="right">发起者</TableCell>
                                <TableCell align="right">名称</TableCell>
                                <TableCell>备注</TableCell>
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
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>

                <Button disabled={page===1} onClick={()=>{this.nextAndPre('pre')}} variant="contained" color="primary" className={classes.button}>
                    上一页
                </Button>
                <Button disabled={rows.length<2} onClick={()=>{this.nextAndPre('next')}} variant="contained" color="primary" className={classes.button}>
                    下一页
                </Button>
            </div>
        );
    }
}

AccountEntries.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AccountEntries);