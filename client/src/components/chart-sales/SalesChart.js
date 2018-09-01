import React, {Component, Fragment} from "react";
import Chart from "chart.js";
import API from "../../API/api";

let chartOptions = {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 58, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}


class SalesChart extends Component {
    componentDidMount(){
        this.buildChart()
        this.YearlySales()
    }

    YearlySales = ()=>{
        API.sales("2018", "year")
            .then((sales)=>{
                console.log(sales.data)
            })
    }
    
    buildChart = ()=>{
        let ctx = this.refs.prodChart
        let myChart = new Chart(ctx, chartOptions)
    }
    render(){
        return (
            <Fragment>
            <canvas id="myChart" width="800" height="400" ref="prodChart"></canvas>
            </Fragment>
        )
    }
}

export default SalesChart;
