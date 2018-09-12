import React, {Component, Fragment} from "react";
import Chart from "chart.js";
import API from "../../API/api";
import Loader from "../loader/Loader";



class ProductChart extends Component {
    state = {
        productNames : [],
        productSales : [],
        loading : true
    }

    componentDidMount(){
        API.productSale()
            .then((results)=>{
                let tempNames = [], tempSales = [];
                results.data.forEach((el)=>{
                    tempNames.push(el.Product.name)
                    tempSales.push(Math.round(el.productTotal*100)/100)
                })
                this.setState({
                    loading : false,
                    productNames : tempNames,
                    productSales : tempSales
                })
                console.log(this.state)
                this.buildChart()
            })
    }
    
    buildChart = ()=>{

        let chartOptions = {
            type: 'bar',
            data: {
                labels: this.state.productNames,
                datasets: [{
                    label: 'Yearly Sales per product',
                    data: this.state.productSales,
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

        let ctx = this.refs.prodChart
        let myChart = new Chart(ctx, chartOptions)

    }
    render(){
        return (
            <Fragment>
                {this.state.loading? <Loader/>:
            <canvas id="myChart" width="800" height="400" ref="prodChart"></canvas>
                }
            </Fragment>
        )
    }
}

export default ProductChart;
