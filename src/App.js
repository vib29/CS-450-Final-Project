import React, { Component } from "react";
import * as d3 from "d3";
import "./App.css";
import heart from './heart.csv'
import Scatter from './Scatter'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        var self = this;
        d3.csv(heart, function (d) {
            return {
                RestingBP: parseFloat(d.RestingBP),
                Cholesterol: parseFloat(d.Cholesterol),
                ExerciseAngina: d.ExerciseAngina
            }
        }).then(function (csv_data) {
            self.setState({ data: csv_data }, function () {
                self.renderChart();
            });
        })
            .catch(function (err) {
                console.log(err)
            })
        this.renderChart();
    }

    aggregatePieChestPainTypes = (pieDataArray) => {
        const chestPainCounts = d3.rollups(
            pieDataArray,
            v => v.length,
            d => d.ChestPainType
        ).map(([type, count]) => ({ type, count }));
        return chestPainCounts;
    };



    renderChart = () => {

        // data for the line chart
        const male_data = [
            { age: 28, MaxHR: 185.000000 },
            { age: 29, MaxHR: 177.333333 },
            { age: 31, MaxHR: 153.000000 },
            { age: 32, MaxHR: 149.000000 },
            { age: 33, MaxHR: 185.000000 },
            { age: 34, MaxHR: 165.200000 },
            { age: 35, MaxHR: 153.875000 },
            { age: 36, MaxHR: 166.500000 },
            { age: 37, MaxHR: 150.857143 },
            { age: 38, MaxHR: 149.000000 },
            { age: 39, MaxHR: 145.916667 },
            { age: 40, MaxHR: 152.416667 },
            { age: 41, MaxHR: 150.529412 },
            { age: 42, MaxHR: 152.200000 },
            { age: 43, MaxHR: 142.866667 },
            { age: 44, MaxHR: 155.750000 },
            { age: 45, MaxHR: 142.500000 },
            { age: 46, MaxHR: 134.800000 },
            { age: 47, MaxHR: 140.600000 },
            { age: 48, MaxHR: 136.818182 },
            { age: 49, MaxHR: 142.600000 },
            { age: 50, MaxHR: 138.888889 },
            { age: 51, MaxHR: 134.083333 },
            { age: 52, MaxHR: 141.096774 },
            { age: 53, MaxHR: 130.555556 },
            { age: 54, MaxHR: 134.527778 },
            { age: 55, MaxHR: 130.294118 },
            { age: 56, MaxHR: 125.696970 },
            { age: 57, MaxHR: 132.343750 },
            { age: 58, MaxHR: 128.028571 },
            { age: 59, MaxHR: 134.812500 },
            { age: 60, MaxHR: 132.703704 },
            { age: 61, MaxHR: 118.370370 },
            { age: 62, MaxHR: 114.880000 },
            { age: 63, MaxHR: 122.000000 },
            { age: 64, MaxHR: 124.312500 },
            { age: 65, MaxHR: 122.000000 },
            { age: 66, MaxHR: 122.444444 },
            { age: 67, MaxHR: 125.666667 },
            { age: 68, MaxHR: 138.444444 },
            { age: 69, MaxHR: 119.916667 },
            { age: 70, MaxHR: 123.857143 },
            { age: 71, MaxHR: 111.500000 },
            { age: 72, MaxHR: 113.750000 },
            { age: 74, MaxHR: 115.166667 },
            { age: 75, MaxHR: 110.666667 },
            { age: 76, MaxHR: 120.000000 },
            { age: 77, MaxHR: 136.000000 }
        ];

        const female_data = [
            { age: 30, MaxHR: 170.0 },
            { age: 31, MaxHR: 150.0 },
            { age: 32, MaxHR: 165.0 },
            { age: 33, MaxHR: 150.0 },
            { age: 34, MaxHR: 191.0 },
            { age: 35, MaxHR: 172.333333 },
            { age: 37, MaxHR: 156.5 },
            { age: 38, MaxHR: 150.333333 },
            { age: 39, MaxHR: 170.333333 },
            { age: 40, MaxHR: 130.0 },
            { age: 41, MaxHR: 163.857143 },
            { age: 42, MaxHR: 144.0 },
            { age: 43, MaxHR: 156.222222 },
            { age: 44, MaxHR: 146.333333 },
            { age: 45, MaxHR: 159.833333 },
            { age: 46, MaxHR: 143.5 },
            { age: 47, MaxHR: 137.0 },
            { age: 48, MaxHR: 134.555556 },
            { age: 49, MaxHR: 156.666667 },
            { age: 50, MaxHR: 140.571429 },
            { age: 51, MaxHR: 139.363636 },
            { age: 52, MaxHR: 147.2 },
            { age: 53, MaxHR: 136.166667 },
            { age: 54, MaxHR: 143.933333 },
            { age: 55, MaxHR: 148.428571 },
            { age: 56, MaxHR: 150.0 },
            { age: 57, MaxHR: 140.5 },
            { age: 58, MaxHR: 142.142857 },
            { age: 59, MaxHR: 132.333333 },
            { age: 60, MaxHR: 149.0 },
            { age: 61, MaxHR: 138.75 },
            { age: 62, MaxHR: 136.4 },
            { age: 63, MaxHR: 156.666667 },
            { age: 64, MaxHR: 139.0 },
            { age: 65, MaxHR: 142.5 },
            { age: 66, MaxHR: 130.25 },
            { age: 67, MaxHR: 158.0 },
            { age: 68, MaxHR: 115.0 },
            { age: 69, MaxHR: 151.0 },
            { age: 71, MaxHR: 139.0 },
            { age: 73, MaxHR: 121.0 },
            { age: 74, MaxHR: 121.0 },
            { age: 76, MaxHR: 116.0 }
        ];

        // data for Pie Chart
        const pie_female_data = [
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "TA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "NAP" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ASY" },
            { Sex: "F", ChestPainType: "ATA" },
        ];

        const pie_male_data = [
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "NAP" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ATA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "TA" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "ASY" },
            { Sex: "M", ChestPainType: "NAP" },
        ];

        // Grouped Bar Chart Data
        const groupedData = [
            // LVH
            { RestingECG: "LVH", ST_Slope: "Down", Frequency: 0.7 },
            { RestingECG: "LVH", ST_Slope: "Flat", Frequency: 0.7 },
            { RestingECG: "LVH", ST_Slope: "Up", Frequency: 0.35 },

            // Normal
            { RestingECG: "Normal", ST_Slope: "Down", Frequency: 0.75 },
            { RestingECG: "Normal", ST_Slope: "Flat", Frequency: 0.8 },
            { RestingECG: "Normal", ST_Slope: "Up", Frequency: 0.15 },

            // ST
            { RestingECG: "ST", ST_Slope: "Down", Frequency: 0.88 },
            { RestingECG: "ST", ST_Slope: "Flat", Frequency: 0.9 },
            { RestingECG: "ST", ST_Slope: "Up", Frequency: 0.25 }
        ];

        // Histogram Data
    const histogramDataMap = {
        Oldpeak: {
            data: [0.0, 1.0, 0.0, 1.5, 0.0, 0.0, 0.0, 0.0, 1.5, 0.0, 0.0, 2.0, 0.0, 1.0,
                0.0, 1.5, 0.0, 0.0, 1.0, 3.0, 0.0, 1.0, 0.0, 3.0, 0.0, 0.0, 3.0, 0.0,
                0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 1.5, 0.0, 0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 2.0, 2.0, 0.0, 0.0, 1.5, 0.0,
                1.5, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 4.0, 0.0,
                1.0, 0.0, 0.0, 0.0, 1.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                1.0, 1.0, 2.0, 2.0, 0.0, 0.5, 0.0, 0.0, 0.0, 1.5, 0.0, 2.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 3.0,
                0.0, 0.0, 0.0, 1.0, 0.0, 1.5, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
                0.0, 2.0, 0.0, 1.5, 0.0, 0.0, 2.0, 1.5, 1.0, 0.0, 0.0, 2.0, 0.0, 2.0,
                2.5, 2.5, 3.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
                0.0, 3.0, 1.0, 0.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 5.0, 0.0,
                0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 1.5, 0.0, 0.0, 0.0, 2.0, 0.0,
                2.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0, 1.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 0.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 3.0, 0.0,
                2.0, 3.0, 0.0, 2.0, 2.0, 0.0, 1.0, 2.0, 1.5, 2.0, 1.0, 1.0, 0.0, 2.0,
                0.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
                1.0, 0.0, 1.0, 2.0, 0.0, 0.0, 3.0, 0.0, 0.0, 0.0, 2.0, 1.5, 0.8, 0.0,
                0.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 1.0, 0.0, 0.0,
                0.7, 1.5, 0.7, 1.4, 0.0, 2.1, 0.4, 0.2, 1.5, 1.7, 2.2, 1.5, 0.1, 0.7,
                0.5, 0.7, 1.0, 0.1, 1.6, 0.2, 2.0, 1.3, 0.3, 1.8, 2.5, 1.8, 2.6, -0.9,
                2.8, 2.5, 2.5, -2.6, - 1.5, - 0.1, 0.9, 0.8, 1.1, 2.4, - 1.0, - 1.1, 0.0 - 0.7, - 0.8, 1.6, 3.7, 2.0, 1.1, 1.5, 1.3, 1.4, 0.0, 0.0, 0.0,
                0.0, 0.0, 1.6, 1.0, 0.0, 0.5, - 1.0, 1.0, 0.3, 0.0, 1.5, 0.0, 0.0, 0.0,
                0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 0.0, 2.0, 2.0, 0.5, 2.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.2, 2.0, 0.0, 0.5, 0.5, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 0.0, 0.0, 0.7, 2.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0,
                0.7, 2.0, 0.0, 1.2, 0.0, 0.0, - 0.5, 0.0, 0.0, 2.0, 1.5, 1.0, 1.0, - 2.0,
                3.0, 0.0, 3.0, 0.0, 1.5, 2.5, 1.3, 1.3, - 0.5, 0.0, 1.5, 2.0, 0.5, 0.0,
                1.0, 0.5, 1.0, 1.0, 0.0, 2.5, 2.0, 1.5, 0.0, 1.0, 2.0, 0.0, 0.2, 3.0,
                1.0, 1.2, 0.5, 1.5, 1.6, 1.4, 2.0, 1.0, 1.5, 2.0, 1.0, 1.5, 2.0, 1.2,
                1.5, 0.0, 0.0, 1.5, 0.0, 1.9, 0.0, 1.3, 0.0, 2.0, 0.0, 2.5, 0.1, 1.6,
                2.0, 0.0, 3.0, 1.5, 1.7, 0.1, 0.0, 0.1, 2.0, 2.0, 2.5, 2.0, 2.5, 2.5,
                1.5, 1.1, 1.2, 0.4, 2.0, 0.3, 3.0, 1.0, 0.0, 3.0, 1.7, 2.5, 1.0, 1.0,
                3.0, 0.0, 1.0, 4.0, 2.0, 2.0, 0.2, 3.0, 1.2, 3.0, 0.0, 1.5, 0.0, 0.3,
                2.0, 2.0, - 0.1, 1.3, 0.5, 3.0, 0.0, 1.5, 1.0, 1.0, 0.5, 4.0, 1.0, 1.0,
                0.0, 0.1, 1.7, 0.3, 1.5, 1.4, 1.1, 1.8, 0.0, 2.0, 2.5, 1.0, 1.2, 4.0,
                2.0, 0.0, 1.2, 3.5, 1.5, 3.0, 0.0, 0.2, 0.0, 1.5, 1.5, 0.2, 2.0, 0.0,
                1.8, 1.8, 0.3, 0.0, 2.0, 1.8, 1.4, 4.0, 0.2, 0.1, 2.0, 1.1, 2.0, 1.7,
                1.5, 0.0, 1.5, 2.5, 2.0, 1.5, 0.5, 1.5, 1.5, 1.2, 3.0, 1.9, 3.0, 1.8,
                1.0, 1.5, 0.0, 0.3, 1.5, 0.8, 2.0, 1.2, 2.0, 0.0, 0.2, 0.0, 2.0, 0.0,
                1.0, 0.5, 0.0, 0.2, 1.7, 1.5, 1.0, 1.3, 0.0, 1.5, 0.0, 1.0, 3.0, 1.5,
                0.0, 0.0, 0.0, 0.2, 0.0, 0.3, 0.0, 2.4, 1.6, 0.3, 0.2, 0.2, 0.4, 0.6,
                1.2, 1.2, 4.0, 0.5, 0.0, 0.0, 2.6, 0.0, 1.6, 1.8, 3.1, 1.8, 1.4, 2.6,
                0.2, 1.2, 0.1, 0.0, 0.2, 0.0, 0.6, 2.5, 0.0, 0.4, 2.3, 0.0, 3.4, 0.9,
                0.0, 1.9, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4, 0.0, 2.2, 0.0, 0.8, 0.0, 0.0,
                1.0, 1.8, 0.0, 0.8, 0.0, 0.6, 0.0, 3.6, 0.0, 0.0, 1.4, 0.2, 1.2, 0.0,
                0.9, 2.3, 0.6, 0.0, 0.0, 0.3, 0.0, 3.6, 0.6, 0.0, 1.1, 0.3, 0.0, 3.0,
                0.0, 0.0, 0.8, 2.0, 1.6, 0.8, 2.0, 1.5, 0.8, 0.0, 4.2, 0.0, 2.6, 0.0,
                0.0, 2.2, 0.0, 1.0, 1.0, 0.4, 0.1, 0.2, 1.1, 0.6, 1.0, 0.0, 1.0, 1.4,
                0.5, 1.2, 2.6, 0.0, 0.0, 3.4, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 4.0, 2.6,
                1.6, 2.0, 3.2, 1.2, 0.8, 0.5, 0.0, 1.8, 0.1, 0.8, 1.4, 1.8, 0.1, 0.0,
                2.2, 1.6, 1.4, 0.0, 1.2, 0.7, 0.0, 2.0, 0.0, 0.6, 1.4, 0.0, 2.0, 0.0,
                2.0, 3.2, 0.0, 0.0, 1.6, 0.0, 2.0, 0.5, 0.0, 5.6, 0.0, 1.9, 1.0, 3.8,
                1.4, 0.0, 3.0, 0.0, 0.0, 0.0, 1.2, 0.2, 1.4, 0.1, 2.0, 0.9, 1.5, 0.0,
                1.9, 4.2, 3.6, 0.2, 0.0, 0.8, 1.9, 0.0, 0.6, 0.0, 1.9, 2.1, 0.1, 1.2,
                2.9, 1.2, 2.6, 0.0, 0.0, 0.0, 1.4, 1.0, 1.6, 1.8, 0.0, 1.0, 0.0, 2.8,
                1.6, 0.8, 1.2, 0.0, 0.6, 1.8, 3.5, 0.2, 2.4, 0.2, 2.2, 0.0, 1.4, 0.0,
                0.0, 0.4, 0.0, 2.8, 2.8, 1.6, 1.8, 1.4, 0.0, 1.2, 3.0, 1.0, 0.0, 1.0,
                1.2, 0.0, 0.0, 1.8, 6.2, 0.0, 2.5, 0.0, 0.2, 1.6, 0.0, 0.4, 3.6, 1.5,
                1.4, 0.6, 0.8, 3.0, 2.8, 1.4, 0.0, 0.0, 0.6, 1.6, 0.4, 1.0, 1.2, 0.0,
                1.5, 0.0, 2.4, 1.8, 0.6, 1.0, 0.5, 0.0, 1.3, 0.4, 1.5, 0.0, 0.0, 0.1,
                1.0, 0.8, 0.6, 0.0, 0.0, 0.0, 0.6, 3.0, 0.0, 2.0, 0.0, 0.0, 4.4, 2.8,
                0.4, 0.0, 0.0, 0.8, 1.2, 2.8, 4.0, 0.0, 0.0, 1.0, 0.2, 1.2, 3.4, 1.2,
                0.0, 0.0]
            ,
            label: "ST Depression (mm)",
            fmt: d3.format(".1f")
        },

        Age: {
            data: [40, 49, 37, 48, 54, 39, 45, 54, 37, 48, 37, 58, 39, 49, 42, 54, 38, 43, 60, 36, 43, 44, 49, 44
                , 40, 36, 53, 52, 53, 51, 53, 56, 54, 41, 43, 32, 65, 41, 48, 48, 54, 54, 35, 52, 43, 59, 37, 50
                , 36, 41, 50, 47, 45, 41, 52, 51, 31, 58, 54, 52, 49, 43, 45, 46, 50, 37, 45, 32, 52, 44, 57, 44
                , 52, 44, 55, 46, 32, 35, 52, 49, 55, 54, 63, 52, 56, 66, 65, 53, 43, 55, 49, 39, 52, 48, 39, 58
                , 43, 39, 56, 41, 65, 51, 40, 40, 46, 57, 48, 34, 50, 39, 59, 57, 47, 38, 49, 33, 38, 59, 35, 34
                , 47, 52, 46, 58, 58, 54, 34, 48, 54, 42, 38, 46, 56, 56, 61, 49, 43, 39, 54, 43, 52, 50, 47, 53
                , 56, 39, 42, 43, 50, 54, 39, 48, 40, 55, 41, 56, 38, 49, 44, 54, 59, 49, 47, 42, 52, 46, 50, 48
                , 58, 58, 29, 40, 53, 49, 52, 43, 54, 59, 37, 46, 52, 51, 52, 46, 54, 58, 58, 41, 50, 53, 46, 50
                , 48, 45, 41, 62, 49, 42, 53, 57, 47, 46, 42, 31, 56, 50, 35, 35, 28, 54, 48, 50, 56, 56, 47, 30
                , 39, 54, 55, 29, 46, 51, 48, 33, 55, 50, 53, 38, 41, 37, 37, 40, 38, 41, 54, 39, 41, 55, 48, 48
                , 55, 54, 55, 43, 48, 54, 54, 48, 45, 49, 44, 48, 61, 62, 55, 53, 55, 36, 51, 55, 46, 54, 46, 59
                , 47, 54, 52, 34, 54, 47, 45, 32, 55, 55, 45, 59, 51, 52, 57, 54, 60, 49, 51, 55, 42, 51, 59, 53
                , 48, 36, 48, 47, 53, 65, 32, 61, 50, 57, 51, 47, 60, 55, 53, 62, 51, 51, 55, 53, 58, 57, 65, 60
                , 41, 34, 53, 74, 57, 56, 61, 68, 59, 63, 38, 62, 46, 42, 45, 59, 52, 60, 60, 56, 38, 40, 51, 62
                , 72, 63, 63, 64, 43, 64, 61, 52, 51, 69, 59, 48, 69, 36, 53, 43, 56, 58, 55, 67, 46, 53, 38, 53
                , 62, 47, 56, 56, 56, 64, 61, 68, 57, 63, 60, 66, 63, 59, 61, 73, 47, 65, 70, 50, 60, 50, 43, 38
                , 54, 61, 42, 53, 55, 61, 51, 70, 61, 38, 57, 38, 62, 58, 52, 61, 50, 51, 65, 52, 47, 35, 57, 62
                , 59, 53, 62, 54, 56, 56, 54, 66, 63, 44, 60, 55, 66, 66, 65, 60, 60, 60, 56, 59, 62, 63, 57, 62
                , 63, 46, 63, 60, 58, 64, 63, 74, 52, 69, 51, 60, 56, 55, 54, 77, 63, 55, 52, 64, 60, 60, 58, 59
                , 61, 40, 61, 41, 57, 63, 59, 51, 59, 42, 55, 63, 62, 56, 53, 68, 53, 60, 62, 59, 51, 61, 57, 56
                , 58, 69, 67, 58, 65, 63, 55, 57, 65, 54, 72, 75, 49, 51, 60, 64, 58, 61, 67, 62, 65, 63, 69, 51
                , 62, 55, 75, 40, 67, 58, 60, 63, 35, 62, 43, 63, 68, 65, 48, 63, 64, 61, 50, 59, 55, 45, 65, 61
                , 49, 72, 50, 64, 55, 63, 59, 56, 62, 74, 54, 57, 62, 76, 54, 70, 61, 48, 48, 61, 66, 68, 55, 62
                , 71, 74, 53, 58, 75, 56, 58, 64, 54, 54, 59, 55, 57, 61, 41, 71, 38, 55, 56, 69, 64, 72, 69, 56
                , 62, 67, 57, 69, 51, 48, 69, 69, 64, 57, 53, 37, 67, 74, 63, 58, 61, 64, 58, 60, 57, 55, 55, 56
                , 57, 61, 61, 74, 68, 51, 62, 53, 62, 46, 54, 62, 55, 58, 62, 70, 67, 57, 64, 74, 65, 56, 59, 60
                , 63, 59, 53, 44, 61, 57, 71, 46, 53, 64, 40, 67, 48, 43, 47, 54, 48, 46, 51, 58, 71, 57, 66, 37
                , 59, 50, 48, 61, 59, 42, 48, 40, 62, 44, 46, 59, 58, 49, 44, 66, 65, 42, 52, 65, 63, 45, 41, 61
                , 60, 59, 62, 57, 51, 44, 60, 63, 57, 51, 58, 44, 47, 61, 57, 70, 76, 67, 45, 45, 39, 42, 56, 58
                , 35, 58, 41, 57, 42, 62, 59, 41, 50, 59, 61, 54, 54, 52, 47, 66, 58, 64, 50, 44, 67, 49, 57, 63
                , 48, 51, 60, 59, 45, 55, 41, 60, 54, 42, 49, 46, 56, 66, 56, 49, 54, 57, 65, 54, 54, 62, 52, 52
                , 60, 63, 66, 42, 64, 54, 46, 67, 56, 34, 57, 64, 59, 50, 51, 54, 53, 52, 40, 58, 41, 41, 50, 54
                , 64, 51, 46, 55, 45, 56, 66, 38, 62, 55, 58, 43, 64, 50, 53, 45, 65, 69, 69, 67, 68, 34, 62, 51
                , 46, 67, 50, 42, 56, 41, 42, 53, 43, 56, 52, 62, 70, 54, 70, 54, 35, 48, 55, 58, 54, 69, 77, 68
                , 58, 60, 51, 55, 52, 60, 58, 64, 37, 59, 51, 43, 58, 29, 41, 63, 51, 54, 44, 54, 65, 57, 63, 35
                , 41, 62, 43, 58, 52, 61, 39, 45, 52, 62, 62, 53, 43, 47, 52, 68, 39, 53, 62, 51, 60, 65, 65, 60
                , 60, 54, 44, 44, 51, 59, 71, 61, 55, 64, 43, 58, 60, 58, 49, 48, 52, 44, 56, 57, 67, 53, 52, 43
                , 52, 59, 64, 66, 39, 57, 58, 57, 47, 55, 35, 61, 58, 58, 58, 56, 56, 67, 55, 44, 63, 63, 41, 59
                , 57, 45, 68, 57, 57, 38]
            ,
            label: "Age (years)",
            fmt: d3.format("d")
        },

        MaxHR: {
            data: [172, 156, 98, 108, 122, 170, 170, 142, 130, 120, 142, 99, 145, 140, 137, 150, 166, 165, 125, 160, 142, 142, 164, 150, 138, 178, 112, 118, 127, 145, 130, 114, 122, 130, 154, 155, 87, 142, 148, 130, 130, 100, 168, 170, 120, 120, 168, 170, 184, 170, 121, 98, 122, 150, 140, 170, 153, 140, 134, 96, 174, 175, 144, 125, 145, 130, 144, 184, 82, 170, 145, 135, 150, 115, 128, 116, 130, 150, 138, 170, 160, 154, 115, 165, 125, 94, 112, 142, 155, 110, 160, 140, 148, 92, 180, 140, 138, 160, 140, 144, 115, 100, 130, 152, 124, 140, 110, 168, 135, 106, 124, 92, 125, 150, 135, 150, 170, 130, 185, 180, 170, 139, 140, 110, 150, 110, 190, 175, 140, 152, 130, 150, 122, 124, 120, 175, 175, 146, 118, 130, 94, 125, 158, 155, 150, 132, 155, 176, 160, 125, 120, 100, 150, 140, 160, 150, 150, 130, 100, 130, 119, 96, 174, 150, 140, 175, 140, 118, 100, 160, 160, 188, 162, 172, 134, 135, 105, 150, 150, 90, 120, 150, 124, 140, 130, 92, 110, 138, 110, 120, 120, 116, 160, 110, 180, 116, 132, 136, 116, 98, 150, 150, 146, 150, 100, 140, 180, 140, 185, 140, 110, 140, 128, 164, 98, 170, 150, 137, 150, 170, 112, 150, 125, 185, 137, 150, 140, 134, 170, 184, 158, 167, 129, 142, 140, 160, 118, 136, 99, 102, 155, 142, 143, 118, 103, 137, 150, 150, 130, 120, 135, 115, 115, 152, 96, 130, 150, 172, 120, 155, 165, 138, 115, 125, 145, 175, 110, 150, 91, 145, 140, 165, 130, 134, 180, 100, 150, 126, 126, 155, 135, 122, 160, 160, 170, 120, 140, 132, 156, 180, 138, 135, 148, 93, 127, 110, 139, 131, 92, 149, 149, 150, 120, 123, 126, 127, 155, 120, 138, 182, 154, 110, 176, 154, 141, 123, 148, 121, 77, 136, 175, 109, 166, 128, 133, 128, 138, 119, 82, 130, 143, 82, 179, 144, 170, 134, 114, 154, 149, 145, 122, 114, 113, 120, 104, 130, 115, 128, 104, 125, 120, 140, 100, 100, 92, 125, 113, 95, 128, 115, 72, 124, 99, 148, 97, 140, 117, 120, 120, 86, 63, 108, 98, 115, 105, 121, 118, 122, 157, 156, 99, 120, 145, 156, 155, 105, 99, 135, 83, 145, 60, 92, 115, 120, 98, 150, 143, 105, 122, 70, 110, 163, 67, 128, 120, 130, 100, 72, 94, 122, 78, 150, 103, 98, 110, 90, 112, 127, 140, 149, 99, 120, 105, 140, 141, 157, 140, 117, 120, 120, 148, 86, 84, 125, 120, 118, 124, 106, 111, 116, 180, 129, 125, 140, 120, 124, 117, 110, 105, 155, 110, 122, 118, 133, 123, 131, 80, 165, 86, 111, 118, 84, 117, 107, 128, 160, 125, 130, 97, 161, 106, 130, 140, 122, 130, 120, 139, 108, 148, 123, 110, 118, 125, 106, 112, 128, 180, 144, 135, 140, 102, 108, 145, 127, 110, 140, 69, 148, 130, 130, 140, 138, 140, 138, 112, 131, 112, 80, 150, 110, 126, 88, 153, 150, 120, 160, 132, 120, 110, 121, 128, 135, 120, 117, 150, 144, 113, 135, 127, 109, 128, 115, 102, 140, 135, 122, 119, 130, 112, 100, 122, 120, 105, 129, 120, 139, 162, 100, 140, 135, 73, 86, 108, 116, 160, 118, 112, 122, 124, 102, 137, 141, 154, 126, 160, 115, 128, 115, 105, 110, 119, 109, 135, 130, 112, 126, 120, 110, 119, 110, 130, 159, 84, 126, 116, 120, 122, 165, 122, 94, 133, 110, 150, 130, 113, 140, 100, 136, 127, 98, 96, 123, 98, 112, 151, 96, 108, 128, 138, 126, 154, 137, 100, 135, 93, 109, 160, 141, 105, 121, 140, 142, 142, 170, 154, 161, 111, 180, 145, 159, 125, 120, 155, 144, 178, 129, 180, 181, 143, 159, 139, 152, 157, 165, 130, 150, 138, 170, 140, 126, 150, 138, 125, 150, 186, 181, 163, 179, 156, 134, 165, 126, 177, 120, 114, 125, 184, 157, 179, 175, 168, 125, 96, 143, 103, 173, 142, 169, 171, 150, 112, 186, 152, 149, 152, 140, 163, 143, 116, 142, 147, 148, 179, 173, 178, 105, 130, 111, 168, 126, 178, 140, 145, 163, 128, 164, 169, 109, 108, 168, 118, 151, 156, 133, 162, 175, 71, 163, 124, 147, 166, 143, 157, 162, 138, 117, 153, 161, 170, 162, 162, 144, 133, 114, 103, 139, 116, 88, 151, 152, 163, 99, 169, 158, 160, 169, 132, 178, 96, 165, 160, 172, 144, 192, 168, 132, 182, 163, 125, 195, 95, 160, 114, 173, 172, 179, 158, 167, 122, 149, 172, 111, 170, 162, 165, 182, 154, 155, 130, 161, 154, 159, 152, 152, 174, 131, 146, 125, 115, 174, 106, 122, 147, 163, 163, 194, 150, 158, 122, 173, 162, 105, 147, 157, 112, 160, 125, 156, 156, 175, 161, 122, 158, 151, 162, 151, 171, 141, 173, 145, 178, 160, 154, 131, 187, 159, 166, 165, 131, 202, 172, 172, 154, 147, 170, 126, 127, 174, 132, 182, 132, 97, 136, 162, 190, 146, 140, 185, 161, 146, 145, 160, 120, 156, 172, 150, 182, 143, 160, 142, 144, 158, 148, 155, 142, 113, 188, 153, 123, 157, 162, 137, 132, 158, 171, 172, 132, 160, 171, 168, 162, 173, 153, 148, 108, 115, 169, 143, 156, 162, 155, 152, 152, 164, 131, 143, 179, 130, 174, 161, 140, 146, 144, 163, 169, 150, 166, 144, 144, 136, 182, 90, 123, 132, 141, 115, 174, 173],
   
        label: "Maximum Heart Rate (bpm)",
        fmt: d3.format("d")
    },

        Cholesterol: {
            data: [289, 180, 283, 214, 195, 339, 237, 208, 207, 284, 211, 164, 204, 234, 211, 273, 196, 201, 248, 267, 223, 184, 201, 288, 215, 209, 260, 284, 468, 188, 518, 167, 224, 172, 186, 254, 306, 250, 177, 227, 230, 294, 264, 259, 175, 318, 223, 216, 340, 289, 233, 205, 224, 245, 180, 194, 270, 213, 365, 342, 253, 254, 224, 277, 202, 260, 297, 225, 246, 412, 265, 215, 182, 218, 268, 163, 529, 167, 100, 206, 277, 238, 223, 196, 213, 139, 263, 216, 291, 229, 208, 307, 210, 329, 182, 263, 207, 147, 85, 269, 275, 179, 392, 466, 186, 260, 254, 214, 129, 241, 188, 255, 276, 297, 207, 246, 282, 338, 160, 156, 248, 272, 240, 393, 230, 246, 161, 163, 230, 228, 292, 202, 388, 230, 294, 265, 215, 241, 166, 247, 331, 341, 291, 243, 279, 273, 198, 249, 168, 603, 215, 159, 275, 270, 291, 342, 190, 185, 290, 195, 264, 212, 263, 196, 225, 272, 231, 238, 222, 179, 243, 235, 320, 187, 266, 288, 216, 287, 194, 238, 225, 224, 404, 238, 312, 211, 251, 237, 328, 285, 280, 209, 245, 192, 184, 193, 297, 268, 246, 308, 249, 230, 147, 219, 184, 215, 308, 257, 132, 216, 263, 288, 276, 219, 226, 237, 280, 217, 196, 263, 222, 303, 195, 298, 256, 264, 195, 117, 295, 173, 315, 281, 275, 250, 309, 200, 336, 295, 355, 193, 326, 198, 292, 266, 268, 171, 237, 275, 219, 341, 491, 260, 292, 271, 248, 274, 394, 160, 200, 320, 275, 221, 231, 126, 193, 305, 298, 220, 242, 235, 225, 198, 201, 220, 295, 213, 160, 223, 347, 253, 246, 222, 220, 344, 358, 190, 169, 181, 308, 166, 211, 257, 182, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 260, 209, 218, 228, 213, 0, 236, 0, 0, 267, 166, 0, 0, 0, 0, 220, 177, 236, 0, 0, 0, 0, 0, 0, 0, 0, 0, 186, 100, 228, 0, 171, 230, 0, 0, 0, 281, 0, 203, 0, 0, 0, 0, 0, 277, 0, 233, 0, 0, 240, 0, 0, 153, 224, 0, 0, 0, 316, 0, 0, 218, 0, 311, 0, 0, 0, 270, 0, 0, 217, 214, 214, 252, 220, 214, 203, 0, 339, 216, 276, 458, 241, 384, 297, 248, 308, 208, 227, 210, 245, 225, 240, 0, 198, 195, 267, 161, 258, 0, 0, 195, 235, 0, 305, 223, 282, 349, 160, 160, 236, 312, 283, 142, 211, 218, 306, 186, 252, 222, 0, 0, 258, 202, 197, 204, 113, 274, 192, 298, 272, 220, 200, 261, 181, 260, 220, 221, 216, 175, 219, 310, 208, 232, 273, 203, 182, 274, 204, 270, 292, 171, 221, 289, 217, 223, 110, 193, 123, 210, 282, 170, 369, 173, 289, 152, 208, 216, 271, 244, 285, 243, 240, 219, 237, 165, 213, 287, 258, 256, 186, 264, 185, 226, 203, 207, 284, 337, 310, 254, 258, 254, 300, 170, 310, 333, 139, 223, 385, 254, 322, 564, 261, 263, 269, 177, 256, 239, 293, 407, 234, 226, 235, 234, 303, 149, 311, 203, 211, 199, 229, 245, 303, 204, 288, 275, 243, 295, 230, 265, 229, 228, 215, 326, 200, 256, 207, 273, 180, 222, 223, 209, 233, 197, 218, 211, 149, 197, 246, 225, 315, 205, 417, 195, 234, 198, 166, 178, 249, 281, 126, 305, 226, 240, 233, 276, 261, 319, 242, 243, 260, 354, 245, 197, 223, 309, 208, 199, 209, 236, 218, 198, 270, 214, 201, 244, 208, 270, 306, 243, 221, 330, 266, 206, 212, 275, 302, 234, 313, 244, 141, 237, 269, 289, 254, 274, 222, 258, 177, 160, 327, 235, 305, 304, 295, 271, 249, 288, 226, 283, 188, 286, 274, 360, 273, 201, 267, 196, 201, 230, 269, 212, 226, 246, 232, 177, 277, 249, 210, 207, 212, 271, 233, 213, 283, 282, 230, 167, 224, 268, 250, 219, 267, 303, 256, 204, 217, 308, 193, 228, 231, 244, 262, 259, 211, 325, 254, 197, 236, 282, 234, 254, 299, 211, 182, 294, 298, 231, 254, 196, 240, 409, 172, 265, 246, 315, 184, 233, 394, 269, 239, 174, 309, 282, 255, 250, 248, 214, 239, 304, 277, 300, 258, 299, 289, 298, 318, 240, 309, 250, 288, 245, 213, 216, 204, 204, 252, 227, 258, 220, 239, 254, 168, 330, 183, 203, 263, 341, 283, 186, 307, 219, 260, 255, 231, 164, 234, 177, 257, 325, 274, 321, 264, 268, 308, 253, 248, 269, 185, 282, 188, 219, 290, 175, 212, 302, 243, 353, 335, 247, 340, 206, 284, 266, 229, 199, 263, 294, 192, 286, 216, 223, 247, 204, 204, 227, 278, 220, 232, 197, 335, 253, 205, 192, 203, 318, 225, 220, 221, 240, 212, 342, 169, 187, 197, 157, 176, 241, 264, 193, 131, 236, 175],
            label: "Cholesterol (mg/dL)",
            fmt: d3.format("d")
        },

        RestingBP: {
            data: [140, 160, 130, 138, 150, 120, 130, 110, 140, 120, 130, 136, 120, 140, 115, 120, 110, 120, 100, 120, 100, 120, 124, 150, 130, 130, 124, 120, 113, 125, 145, 130, 125, 130, 150, 125, 140, 110, 120, 150, 150, 130, 150, 140, 120, 130, 120, 140, 112, 110, 130, 120, 140, 130, 130, 160, 120, 130, 150, 112, 100, 150, 140, 120, 110, 120, 132, 110, 160, 150, 140, 130, 120, 120, 140, 150, 118, 140, 140, 130, 110, 120, 150, 160, 150, 140, 170, 140, 120, 140, 110, 130, 120, 160, 110, 130, 142, 160, 120, 125, 130, 130, 150, 120, 118, 140, 120, 150, 140, 190, 130, 150, 140, 140, 130, 100, 120, 130, 120, 140, 135, 125, 110, 180, 130, 120, 130, 108, 120, 120, 145, 110, 170, 150, 130, 115, 120, 120, 140, 150, 160, 140, 160, 140, 120, 110, 120, 120, 120, 130, 130, 100, 130, 120, 120, 155, 110, 140, 130, 160, 140, 128, 160, 120, 140, 140, 140, 140, 135, 140, 120, 140, 140, 140, 140, 140, 140, 140, 130, 130, 130, 130, 140, 110, 160, 160, 130, 120, 120, 180, 180, 170, 130, 135, 125, 160, 120, 150, 120, 130, 110, 120, 160, 100, 130, 150, 120, 110, 130, 125, 106, 140, 130, 130, 150, 170, 110, 120, 140, 140, 130, 160, 120, 120, 120, 145, 120, , 92, 120, 130, 130, 130, 120, 112, 140, 120, 120, 140, 160, 160, 145, 200, 160, 120, 160, 120, 120, 122, 130, 130, 135, 120, 125, 140, 145, 120, 130, 150, 150, 122, 140, 120, 120, 130, 140, 160, 130, , 98, 130, 130, 120, 105, 140, 120, 180, 180, 135, 170, 180, 130, 120, 150, 130, 110, 140, 110, 140, 120, 133, 120, 110, 140, 130, 115, , 95, 105, 145, 110, 110, 110, 160, 140, 125, 120, , 95, 120, 115, 130, 115, , 95, 155, 125, 125, 115, , 80, 145, 105, 140, 130, 145, 125, 100, 105, 115, 100, 105, 110, 125, , 95, 130, 115, 115, 100, , 95, 130, 120, 160, 150, 140, , 95, 100, 110, 110, 130, 120, 135, 120, 115, 137, 110, 120, 140, 120, 130, 120, 145, 115, 120, 115, 105, 160, 160, 155, 120, 120, 200, 150, 135, 140, 150, 135, 150, 185, 135, 125, 160, 155, 160, 140, 120, 160, 115, 115, 110, 120, 150, 145, 130, 140, 160, 140, 115, 130, 150, 160, 135, 140, 170, 165, 200, 160, 130, 145, 135, 110, 120, 140, 115, 110, 160, 150, 180, 125, 125, 130, 155, 140, 130, 132, 142, 110, 120, 150, 180, 120, 160, 126, 140, 110, 133, 128, 120, 170, 110, 126, 152, 116, 120, 130, 138, 128, 130, 128, 130, 120, 136, 130, 124, 160, 0, 122, 144, 140, 120, 136, 154, 120, 125, 134, 104, 139, 136, 122, 128, 131, 134, 120, 132, 152, 124, 126, 138, 154, 141, 131, 178, 132, 110, 130, 170, 126, 140, 142, 120, 134, 139, 110, 140, 140, 136, 120, 170, 130, 137, 142, 142, 132, 146, 160, 135, 136, 130, 140, 132, 158, 136, 136, 106, 120, 110, 136, 160, 123, 112, 122, 130, 150, 150, 102, , 96, 130, 120, 144, 124, 150, 130, 144, 139, 131, 143, 133, 143, 116, 110, 125, 130, 133, 150, 130, 110, 138, 104, 138, 170, 140, 132, 132, 142, 112, 139, 172, 120, 144, 145, 155, 150, 160, 137, 137, 134, 133, 132, 140, 135, 144, 141, 150, 130, 110, 158, 128, 140, 150, 160, 142, 137, 139, 146, 156, 145, 131, 140, 122, 142, 141, 180, 124, 118, 140, 140, 136, 100, 190, 130, 160, 130, 122, 133, 120, 130, 130, 140, 120, 155, 134, 114, 160, 144, 158, 134, 127, 135, 122, 140, 120, 130, 115, 124, 128, 120, 120, 130, 110, 140, 150, 135, 142, 140, 134, 128, 112, 140, 140, 110, 140, 120, 130, 115, 112, 132, 130, 138, 120, 112, 110, 128, 160, 120, 170, 144, 130, 140, 160, 130, 122, 152, 124, 130, 101, 126, 140, 118, 110, 160, 150, 136, 128, 140, 140, 130, 105, 138, 120, 174, 120, 150, 130, 120, 150, 145, 150, 140, 136, 118, 108, 120, 120, 156, 140, 106, 142, 104, , 94, 120, 120, 146, 120, 150, 130, 110, 148, 128, 178, 126, 150, 140, 130, 124, 110, 125, 110, 120, 100, 140, 120, 108, 120, 130, 165, 130, 124, 100, 150, 140, 112, 180, 110, 158, 135, 120, 134, 120, 200, 150, 130, 120, 122, 152, 160, 125, 160, 120, 136, 134, 117, 108, 112, 140, 120, 150, 142, 152, 125, 118, 132, 145, 138, 140, 125, 192, 123, 112, 110, 132, 112, 112, 120, 108, 130, 130, 105, 140, 128, 120, 178, 120, 150, 130, 128, 110, 180, 110, 130, 138, 138, 160, 140, 100, 120, 118, 138, 140, 150, 125, 129, 120, 134, 110, 102, 130, 130, 132, 108, 140, 160, 140, 145, 108, 126, 124, 135, 100, 110, 140, 125, 118, 125, 125, 140, 160, 152, 102, 105, 125, 130, 170, 125, 122, 128, 130, 130, 135, , 94, 120, 120, 110, 135, 150, 130, 138, 135, 130, 132, 150, 118, 145, 118, 115, 128, 130, 160, 138, 120, 138, 120, 180, 140, 130, 140, 140, 130, 110, 155, 140, 145, 120, 130, 112, 110, 150, 160, 150, 132, 140, 150, 120, 130, 120, 130, 110, 172, 120, 140, 140, 160, 128, 138, 132, 128, 134, 170, 146, 138, 154, 130, 110, 130, 128, 122, 148, 114, 170, 125, 130, 120, 152, 132, 120, 140, 124, 120, 164, 140, 110, 144, 130, 130, 138]
            ,
            label: "Resting BP (mm Hg)",
            fmt: d3.format("d")
        }
};




        // These are the dimensions of the total dashboard
        const margin = { top: 60, right: 0, bottom: 20, left: 80 },
            width = 2000,
            height = 1000,
            innerWidth = 500 - margin.left - margin.right,
            innerHeight = 300 - margin.top - margin.bottom;

        // Creating the line chart
        // Create the SVG container for the lineChart, recommend to use another name for other charts
        const svg = d3.select('#mysvg').attr('width', width).attr('height', height).select('.lineChart').attr('transform', `translate(${margin.left},${margin.top})`);

        // Set the scales for the axes
        const xScale = d3.scaleLinear().domain([d3.min(male_data, d => d.age), d3.max(male_data, d => d.age)]).range([0, innerWidth]);
        const yScale = d3.scaleLinear().domain([100, d3.max(male_data, d => d.MaxHR)]).range([innerHeight, 0]);

        // Create the line generator
        const lineGenerator = d3.line().x(male_data => xScale(male_data.age)).y(male_data => yScale(male_data.MaxHR)).curve(d3.curveCardinal);
        const lineGenerator2 = d3.line().x(female_data => xScale(female_data.age)).y(female_data => yScale(female_data.MaxHR)).curve(d3.curveCardinal);
        // Generate the path data
        const pathData = lineGenerator(male_data);
        const pathData2 = lineGenerator2(female_data)

        // Use join to handle the enter, update, and exit of the line path
        svg.selectAll('.line').data([null]).join('path').attr('class', 'line').attr('d', pathData).attr("fill", "none").attr('stroke', 'blue')
            .attr("stroke-width", 2);

        svg.selectAll('.line2').data([null]).join('path').attr('class', 'line').attr('d', pathData2).attr("fill", "none").attr('stroke', 'hotpink')
            .attr("stroke-width", 2);

        // Creating the x-axis and y-axis for the line chart
        svg.selectAll('.xaxis').data([null]).join('g').attr('class', 'xaxis').attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));


        svg.selectAll('.yaxis').data([null]).join('g').attr('class', 'yaxis').call(d3.axisLeft(yScale));

        // Titles for the line chart
        svg.append("text").attr("class", "title").attr("x", innerWidth - 350)
            .attr("y", -margin.top / 2).style("font-size", "20px")
            .style("font-weight", "bold").style("font-family", "sans-serif").text("Maximum Heart Rate by Age")

        svg.append("text").attr("transform", "rotate(-90)").attr("y", 20 - margin.left)
            .attr("x", 400 - (height / 2)).attr("dy", "1em").style("text-anchor", "middle")
            .style("font-size", "15px").style("font-family", "sans-serif").text("Maximum Heart Rate")

        svg.append("text").attr("x", innerWidth / 2).attr("y", innerHeight + margin.bottom + 20)
            .style("font-size", "15px").style("font-family", "sans-serif").style("text-anchor", "middle")
            .text("Age")

        // Legend for the line chart
        const line_legend = svg.append("g")
            .attr("transform", `translate(${innerWidth + 20}, ${margin.top - 50})`)

        line_legend.append("rect")
            .attr("width", 20)
            .attr("height", 10)
            .attr("fill", "blue");

        line_legend.append("text")
            .attr("x", 30)
            .attr("y", 10)
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .text("Male");

        line_legend.append("rect")
            .attr("width", 20)
            .attr("height", 10)
            .attr("fill", "hotpink")
            .attr("y", 30);

        line_legend.append("text")
            .attr("x", 30)
            .attr("y", 39)
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .text("Female");


        // Data for the bar chart
        var data = [
            { disease: "No Heart Disease", No_FastingBS: 366, FastingBS: 44 },
            { disease: "Heart Disease", No_FastingBS: 338, FastingBS: 170 }

        ];

        const xScale_bar = d3.scaleBand()
            .domain(data.map(d => d.disease))
            .range([0, innerWidth])
            .padding(0.2);

        const yScale_bar = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.No_FastingBS + d.FastingBS)])
            .range([innerHeight, 0]);

        const colorScale = d3.scaleOrdinal()
            .domain(["No_FastingBS", "FastingBS"])
            .range(["#FF6961", "#90EE90"]);


        const stackGen = d3.stack().keys(["FastingBS", "No_FastingBS"]);
        const stackedSeries = stackGen(data);


        const barChartGroup = svg.append('g')
            .attr('transform', `translate(${margin.left - 80}, ${innerHeight + margin.top + 100})`);


        barChartGroup.selectAll('g')
            .data(stackedSeries)
            .join('g')
            .attr("fill", d => colorScale(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", d => xScale_bar(d.data.disease))
            .attr("y", d => yScale_bar(d[1]))
            .attr("height", d => yScale_bar(d[0]) - yScale_bar(d[1]))
            .attr("width", xScale_bar.bandwidth());





        // Titles for the bar chart
        barChartGroup.append("text").attr("transform", "rotate(-90)").attr("y", 20 - margin.left)
            .attr("x", 400 - (height / 2)).attr("dy", "1em").style("text-anchor", "middle")
            .style("font-size", "15px").text("Number of patients")

        barChartGroup.append("text").attr("class", "title").attr("x", innerWidth - 400)
            .attr("y", -margin.top / 2).style("font-size", "20px").style("font-type", "sans-serif")
            .style("font-weight", "bold").text("Fasting Blood Sugar vs Heart-Disease Status")

        barChartGroup.append("text").attr("x", innerWidth / 2).attr("y", innerHeight + margin.bottom + 20)
            .style("font-size", "15px").style("text-anchor", "middle")
            .text("Heart Disease Status")



        // Interactive component of the bar chart
        const tooltip = d3.select("body").selectAll(".tooltip").data([0]).join("div").attr("class", "tooltip")
            .style("opacity", 0).style("background-color", "white").style("position", "absolute")
            .style("border", "1px solid gray").style("border-radius", "5px").style("padding", "5px")


        barChartGroup.selectAll("g")
            .data(stackedSeries)
            .join("g")
            .attr("fill", d => colorScale(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", d => xScale_bar(d.data.disease))
            .attr("y", d => yScale_bar(d[1]))
            .attr("height", d => yScale_bar(d[0]) - yScale_bar(d[1]))
            .attr("width", xScale_bar.bandwidth())
            .on("mouseover", () => tooltip.style("opacity", 1))
            .on("mousemove", (event, d) => {
                const total_patients = d.data.No_FastingBS + d.data.FastingBS;
                tooltip.style("opacity", 1)
                    .html(`
             Percentage: ${parseFloat((d[1] - d[0]) / total_patients, 2).toFixed(2)}
          `)
                    .style("left", `${event.pageX}px`)
                    .style("top", `${event.pageY - 35}px`);

            })
            .on("mouseleave", () => tooltip.style("opacity", 0));



        barChartGroup.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale_bar)).style("font-size", "12px");


        barChartGroup.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale_bar).ticks(5));

        const bar_legend = barChartGroup.append("g")
            .attr("transform", `translate(${innerWidth + 20}, ${margin.top - 50})`)



        //Legends for the bar chart
        bar_legend.append("rect")
            .attr("width", 20)
            .attr("height", 10)
            .attr("fill", "#90EE90");

        bar_legend.append("text")
            .attr("x", 30)
            .attr("y", 10)
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .text("Fasting Blood Sugar");

        bar_legend.append("rect")
            .attr("width", 20)
            .attr("height", 10)
            .attr("fill", "#FF6961")
            .attr("y", 30);

        bar_legend.append("text")
            .attr("x", 30)
            .attr("y", 39)
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .text("No Fasting Blood Sugar");



        const pieDataProcessed = {
            F: this.aggregatePieChestPainTypes(pie_female_data),
            M: this.aggregatePieChestPainTypes(pie_male_data)
        };

        const svg_pie = d3.select("#piesvg")
            .attr("width", 500)
            .attr("height", 400)
            .append("g")
            .attr("transform", "translate(150,150)");

        const g_pie = d3.select("#piesvg").select("g")
            .attr("transform", "translate(200,170)");

        const updatePie = (gender) => {
            const data_p = pieDataProcessed[gender];
            const pieGen = d3.pie().value(d => d.count);
            const arcData = pieGen(data_p);
            const arcGen = d3.arc().innerRadius(50).outerRadius(130).padAngle(0.01);







            g_pie.selectAll("path")
                .data(arcData)
                .join("path")
                .attr("d", arcGen)
                .attr("fill", d => colorPie(d.data.type))
                .on("mouseover", function (event, d) {
                    const total = d3.sum(data_p, d => d.count);
                    const percent = ((d.data.count / total) * 100).toFixed(1);
                    pieToolTip
                        .html(`${d.data.type}: ${percent}%`)
                        .style("opacity", 1)
                        .style("left", `${event.pageX + 10}px`)
                        .style("top", `${event.pageY - 28}px`);
                })
                .on("mousemove", function (event) {
                    pieToolTip
                        .style("left", `${event.pageX + 10}px`)
                        .style("top", `${event.pageY - 28}px`);
                })
                .on("mouseleave", function () {
                    pieToolTip.style("opacity", 0);
                });

            g_pie.selectAll("text")
                .data(arcData)
                .join("text")
                .attr("x", d => arcGen.centroid(d)[0])
                .attr("y", d => arcGen.centroid(d)[1])
                .attr("text-anchor", "middle")
                .attr("font-size", 10)
                .attr("fill", "white")
                .text(d => d.data.type);
        };

        const pieToolTip = d3.select("body").selectAll(".pie-tooltip")
            .data([0])
            .join("div")
            .attr("class", "pie-tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "1px solid gray")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .style("pointer-events", "none");

        const colorPie = d3.scaleOrdinal()
            .domain(["ASY", "NAP", "ATA", "TA"])
            .range(["#0000FF", "#FF4D4D", "#008000", "#f1c40f"]);
        const groupedSvg = d3.select("#mysvg")
            .select(".groupedBarChart")
            .attr("transform", `translate(${margin.left + 1200}, ${margin.top + 30})`);

        const ecgTypes = ["LVH", "Normal", "ST"];
        const slopeTypes = ["Down", "Flat", "Up"];

        const x0 = d3.scaleBand().domain(ecgTypes).range([0, 350]);
        const x1 = d3.scaleBand().domain(slopeTypes).range([0, x0.bandwidth()]);
        const y = d3.scaleLinear().domain([0, 1]).range([200, 0]);
        const color = d3.scaleOrdinal().domain(slopeTypes).range(d3.schemeSet2);

        groupedSvg.append("g")
            .selectAll("g")
            .data(d3.group(groupedData, d => d.RestingECG))
            .join("g")
            .attr("transform", d => `translate(${x0(d[0])},0)`)
            .selectAll("rect")
            .data(d => d[1])
            .join("rect")
            .attr("x", d => x1(d.ST_Slope))
            .attr("y", d => y(d.Frequency))
            .attr("width", x1.bandwidth())
            .attr("height", d => 200 - y(d.Frequency))
            .attr("fill", d => color(d.ST_Slope));


        updatePie("F");

        // Axes
        groupedSvg.append("g")
            .attr("transform", `translate(0,200)`)
            .call(d3.axisBottom(x0));

        groupedSvg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        // Titles
        groupedSvg.append("text")
            .attr("x", 0)
            .attr("y", -30)
            .text("Heart Disease Frequency by RestingECG and ST_Slope")
            .style("font-weight", "bold")
            .style("font-size", "20px")
            .style("font-type", "sans-serif");

        groupedSvg.append("text").attr("transform", "rotate(-90)").attr("y", 20 - margin.left)
            .attr("x", 400 - (height / 2)).attr("dy", "1em").style("text-anchor", "middle")
            .style("font-size", "15px").text("Heart Disease Frequency")

        groupedSvg.append("text").attr("x", innerWidth / 2 -35).attr("y", innerHeight + margin.bottom+5)
            .style("font-size", "15px").style("text-anchor", "middle")
            .text("Resting ECG & ST Slope")


        // Legend
        const legend = groupedSvg.append("g").attr("transform", "translate(300,-25)");
        slopeTypes.forEach((key, i) => {
            legend.append("rect")
                .attr("x", 80)
                .attr("y", (i + 1) * 18)
                .attr("width", 12)
                .attr("height", 12)
                .attr("fill", color(key));
            legend.append("text")
                .attr("x", 100)
                .attr("y", (i + 1) * 18 +9)
                .text(key)
                .style("font-size", "12px");

            const legend_p = d3.select("#piesvg")
                .append("g")
                .attr("transform", "translate(400, 60)");

            const labels_p = ["ASY", "NAP", "ATA", "TA"];

            labels_p.forEach((label, i) => {
                const legendRow_p = legend_p.append("g").attr("transform", `translate(0, ${i * 20})`);

                legendRow_p.append("rect")
                    .attr("width", 15)
                    .attr("height", 15)
                    .attr("fill", colorPie(label));

                legendRow_p.append("text")
                    .attr("x", 20)
                    .attr("y", 12)
                    .style("font-size", "12px")
                    .style("font-family", "sans-serif")
                    .text(label);
            });

            function drawHistogram(column) {
                const { data, label, fmt } = histogramDataMap[column];
                const histogramSvg = d3.select("#mysvg").select(".histogramChart");
                histogramSvg.attr("transform", `translate(${margin.left + 600}, ${innerHeight + margin.top + 130})`);
                histogramSvg.selectAll("*").remove();

                const marginHist = { top: 40, right: 20, bottom: 60, left: 50 },
                    widthHist = 400 - marginHist.left - marginHist.right,
                    heightHist = 300 - marginHist.top - marginHist.bottom;

                const x = d3.scaleLinear()
                    .domain(d3.extent(data))
                    .nice()
                    .range([0, widthHist]);

                const bins = d3.histogram()
                    .domain(x.domain())
                    .thresholds(x.ticks(15))(data);

                const y = d3.scaleLinear()
                    .domain([0, d3.max(bins, d => d.length)])
                    .range([heightHist, 0]);

                const chart = histogramSvg.append("g")
                    .attr("transform", `translate(${marginHist.left}, ${marginHist.top})`);


                chart.selectAll("rect")
                    .data(bins)
                    .join("rect")
                    .attr("x", d => x(d.x0))
                    .attr("y", d => y(d.length))
                    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
                    .attr("height", d => heightHist - y(d.length))
                    .attr("fill", "#00CED1");

                chart.append("g")
                    .attr("transform", `translate(0,${heightHist})`)
                    .call(d3.axisBottom(x).tickFormat(fmt));

                chart.append("g")
                    .call(d3.axisLeft(y).ticks(5));


                chart.append("text")
                    .attr("x", widthHist / 2)
                    .attr("y", heightHist + 45)
                    .attr("text-anchor", "middle")
                    .style("font-size", "13px")
                    .text(label);

                chart.append("text")
                    .attr("x", widthHist / 2)
                    .attr("y", -10)
                    .attr("text-anchor", "middle")
                    .style("font-weight", "bold")
                    .style("font-size", "16px")
                    .text(`Frequency of Heart Disease Patients for ${column}`);

                 
                    chart.append("text").attr("transform", "rotate(-90)").attr("y", 35- margin.left)
                    .attr("x", 400 - (height / 2)).attr("dy", "1em").style("text-anchor", "middle")
                    .style("font-size", "13px").text("Number of patients")
                    
                  

                    svg.append("text").attr("transform", "rotate(-90)").attr("y", 20 - margin.left)
            .attr("x", 400 - (height / 2)).attr("dy", "1em").style("text-anchor", "middle")
            .style("font-size", "15px").style("font-family", "sans-serif").text("Maximum Heart Rate")


            }

            drawHistogram("Oldpeak");

            // dropdown for histogram
            d3.select("#histogramDropdown").on("change", function () {
                const choice = d3.select(this).property("value");
                drawHistogram(choice);
            });

            d3.select("#GenderDropdown").on("change", function () {
                const selected_p = d3.select(this).property("value");
                updatePie(selected_p);
            });

        });
    };





        render() {
            return (
                <div className="parent" style={{ position: "relative" }}>
                    <svg id="mysvg" width="2000" height="2000">
                        <g className="lineChart"></g>
                        <g className="barChart"></g>
                        <g className="groupedBarChart"></g>
                        <g className="histogramChart"></g>
                    </svg>

                    <div id="pie-container"
                        style={{
                            position: "absolute",
                            left: "700px",
                            top: "20px",
                            width: "500px"
                        }}>
                        <div>
                            <h2 style={{
                                position: "absolute",
                                top: "-30px",
                                left: "200px",
                                transform: "translateX(-50%)",
                                fontSize: "20px",
                                fontFamily: "sans-serif",
                                fontWeight: "",
                            }}>
                                Chest Pain Types by Gender
                            </h2>

                            <div style={{ position: "absolute", left: "210px", transform: "translateX(-50%)", top: "12px", right: "20px", textAlign: "center" }}>
                                <label htmlFor="genderSelect">Select Gender: </label>
                                <select id="GenderDropdown">
                                    <option value="F">Female</option>
                                    <option value="M">Male</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ position: "absolute", top: "390px", left: "400px", zIndex: 10, padding: "2px", borderRadius: "5px" }}>
                            <label htmlFor="histogramDropdown" style={{ marginRight: "10px", fontSize: "14px", fontWeight: "bold" }}>Pick Attribute:</label>
                            <select id="histogramDropdown" style={{ fontSize: "14px", height: "25px", width: "80px" }}>
                                <option value="Oldpeak">Oldpeak</option>
                                <option value="Age">Age</option>
                                <option value="MaxHR">MaxHR</option>
                                <option value="Cholesterol">Cholesterol</option>
                                <option value="RestingBP">RestingBP</option>
                            </select>
                        </div>


                        <svg id="piesvg" width="500" height="100">
                            <g></g>
                        </svg>
                    </div>

                    <div className="Scatter" style={{ position: "absolute", left: "1200px", top: "400px" }}>

                        <Scatter data1={this.state.data}></Scatter>
                    </div>

                </div>




            );
        }
    }

export default App;