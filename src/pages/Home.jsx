import React from 'react';
import { DatePicker } from 'antd';
import {chartAccount} from '../api'
import Button from '@material-ui/core/Button';
import { notification } from 'antd';
import G2 from '@antv/g2';
const { RangePicker } = DatePicker;


class Home extends React.Component {
    state={
        data:[],
        isReload:false
    }
    setlocalStorage = () => {
    //     const {chart}=this.state
    //     console.log(this.state)
    //     let newData=[]
    //     Object.keys(res).forEach(function(key,index){
    //         console.log(index)
    //         newData.push({
    //             index:index,
    //             item:key,
    //             count:parseInt(res[key].money),
    //             type:res[key].type
    //         })
    //    });
    //    let sum=0
    //    newData.map((cur,index)=>{
    //        sum+=cur.count
    //    })
    //    newData=newData.map(v=>{
    //        return {
    //            ...v,
    //            percent:Math.round(v.count/sum*120)/100
    //        }
    //    })
    //     chart.source(newData, {
    //       percent: {
    //         formatter: function formatter(val) {
    //           val = val * 100 + '%';
    //           return val;
    //         }
    //       }
    //     });
    //     chart.render();
    }
    getlocalStorage = () => {
        const res = localStorage.getItem('loginState');
        console.log(res)
    }
    removelocalStorage = () => {
        const res = localStorage.removeItem('loginState');
        console.log(res)
    }
    onChange = (date, dateString)=>{
        const form={
            from:dateString[0],
            to:dateString[1]
        }
        chartAccount(form,(res)=>{
            const {data}=res
            const chat=data.data
            console.log(chat)
            if(chat){
                this.setState({
                    data:chat,
                    isReload:true
                })
                this.renderChart(chat)
            }else{
                notification.error({
                    message: '错误',
                    description: '可能是没有数据',
                });
            }
        })
    }
    componentDidMount(){
        const date = new Date()
            const month=date.getMonth()
            const year=date.getFullYear()
            const day=date.getDate()
            const lastYear=month==0? year-1:year
            const lastMonth=month==0? 11:month
            const lastDay=1
        const form={
            from:`${lastYear}-${lastMonth+1}-${lastDay}`,
            to:`${year}-${month+1}-${day}`
        }
        chartAccount(form,(res)=>{
            const {data}=res
            this.setState({
                data:data.data
            })
            this.renderChart(data.data)
        })
    }
    renderChart(res){
        document.getElementById('mountNode').innerHTML=''
        let newData=[]
        Object.keys(res).forEach(function(key,index){
            console.log(index)
            newData.push({
                index:index,
                item:key,
                count:parseInt(res[key].money),
                type:res[key].type
            })
       });
       let sum=0
       newData.map((cur,index)=>{
           sum+=cur.count
       })
       newData=newData.map(v=>{
           return {
               ...v,
               percent:Math.round(v.count/sum*100)/100
           }
       })
       var chart = new G2.Chart({
        container: 'mountNode',
        forceFit: true,
        height: window.innerHeight
      });
      this.setState({chart})
      chart.source(newData, {
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + '%';
            return val;
          }
        }
      });
      chart.coord('theta', {
        radius: 0.75
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      chart.intervalStack().position('percent').color('item').label('percent', {
        formatter: function formatter(val, item) {
          return item.item + ': ' + val;
        }
      }).tooltip('item*percent', function(item, percent) {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent
        };
      }).style({
        lineWidth: 1,
        stroke: '#fff'
      });
      chart.render();
    }
    render() {
        const {data}=this.state
        console.log(this.state)
        return (
            <div style={{width:'960px'}}>
                <h2 style={{color:'#ffffff'}}>主页</h2>
                <RangePicker onChange={this.onChange} />
                <div style={{height:'20px'}}/>
                <div id="mountNode" style={{background:'#ffffff'}}></div>
                {/* <Link to='/login'>gotoLogin</Link>
                <button onClick={this.setlocalStorage}>SetLoginLocalStorage</button>
                <button onClick={this.getlocalStorage}>getlocalStorage</button>
                <button onClick={this.removelocalStorage}>removelocalStorage</button> */}
            </div>
        );
    }
}

export default Home;


