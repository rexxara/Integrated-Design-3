import React from 'react';
import { getAccountById } from '../api'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        rows: []
    };

    componentDidMount() {
        const {id}=this.props.loginState
        getAccountById(id, (data) => {
            let res=data.data
            this.setState({rows:res.data||[]})
        })
    }
    render() {
        const {rows}=this.state
        const { classes } = this.props;
        console.log(rows)
        return (
            <div>
            <div>账单</div>
                <br/>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">账单ID</TableCell>
                                <TableCell align="right">花费</TableCell>
                                <TableCell align="right">描述</TableCell>
                                <TableCell align="right">日期</TableCell>
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
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);