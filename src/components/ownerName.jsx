import React from 'react';
import {getUserNameByuserID} from '../api'
class Owner extends React.Component {
    state={
    }
    componentDidMount(){
        const {owner}=this.props
        getUserNameByuserID(owner,(res)=>{
            const {data}=res
            this.setState({...data.data})
        })
    }
    render() {
        const {nickName}=this.state
        return (
            <div>
                {nickName}
            </div>
        );
    }
}

export default Owner;
