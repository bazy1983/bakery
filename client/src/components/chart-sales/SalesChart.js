import React, { Component, Fragment } from "react";
import Chart from "chart.js";
import API from "../../API/api";
import months from "../../API/months.json"

//components
import Loader from "../loader/Loader";

class SalesChart extends Component {
    state = {
        loading : true,
        month : [],
        sale : []

    }
    componentDidMount() {
        this.YearlySales()
    }

    YearlySales = () => {
        API.sales(new Date().getFullYear(), "year")
            .then((sales) => {
                // console.log(sales.data)
                let monthNames = [], monthlySale =[];
                let dataset = sales.data.forEach((monthSale) => {
                        monthNames.push(months[monthSale.month -1].short);  //name of the month
                        monthlySale.push(Math.round(monthSale.grandTotal * 100) / 100);
                })
                this.setState({
                    loading : false,
                    month : monthNames,
                    sale : monthlySale
                })
                this.buildChart(monthNames, monthlySale)
            })
    }

    buildChart = (monthNames, monthlySale) => {
        let ctx = this.refs.prodChart
        let chartOptions = {
            type: 'line',
            data: {
                labels: monthNames,
                datasets: [{
                    label: 'Monthy Sales: ' + new Date().getFullYear(),
                    data: monthlySale,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }

        let myChart = new Chart(ctx, chartOptions)
    }

    render() {



        return (
            <Fragment>
                {this.state.loading ?
                    <Loader />
                :
                    <canvas id="myChart" width="800" height="400" ref="prodChart"></canvas>
                }
            </Fragment>
        )
    }
}

export default SalesChart;
