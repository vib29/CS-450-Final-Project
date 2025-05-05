import React, { Component } from 'react';
import * as d3 from "d3";

class Scatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_data: [],
    };
    this.colors = {"Y":"blue", "N":"red"};
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data1 !== this.props.data1) {
      this.draw();
    }
    this.renderCounter();
    console.log(this.props.data1[0]);
  }

  componentDidMount() {
    if (this.props.data1.length === 0) {
      this.draw();
      this.renderLegend();
      this.renderCounter();
    }
  }

  draw(){
    const margin = { top: 40, right: 50, bottom: 50, left: 50 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const data = this.props.data1;

    const svg = d3.select(".scatter_container").attr("width", width).attr("height", height);

    // Create the Inner Chart Group
    const innerChart = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "innerChart");

    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.RestingBP)]).range([0, innerWidth]);

    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.Cholesterol)]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

  
    innerChart.selectAll(".x-axis").data([null]) 
      .join("g").attr('class','x-axis') 
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart.selectAll(".y-axis").data([null]) 
      .join("g").attr('class','y-axis')
      .call(yAxis);

    // Add the circles (data points) to the inner chart
    innerChart.selectAll("circle")
      .data(data).join("circle").attr("r", 3)
      .attr("fill", data => {
        return this.colors[data.ExerciseAngina];
        })
      .attr("cx", data => xScale(data.RestingBP)).attr("cy", data => yScale(data.Cholesterol))

    // Add the brush for selecting data
    const brush = d3.brush().on('start brush', (e) => {
      const selection = e.selection;

      var [[x0, y0], [x1, y1]] = selection;
      var filter_data = data.filter(item=>{
        const y = yScale(item["Cholesterol"]);
        const x = xScale(item["RestingBP"]);
        console.log(x0,x1, y0, y1);
        return x >= x0 && x <= x1 && y >= y0 && y <= y1;
      });
      this.setState({ filter_data: filter_data });

      console.log(this.state.filter_data);

    });  
    d3.select('.scatter_container .innerChart').call(brush);

    svg.append("text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", margin.top-20)
      .style("font-family", "sans-serif") 
      .style("font-weight", "bold")
      .style("font-size", "18px")
      .text("Resting BP vs Cholesterol (colored by Exercise Angina)");

    svg.append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 40)
      .style("font-family", "Times New Roman") 
      .style("font-size", "18px")
      .text("Resting BP");

    svg.append("text")  
      .attr("class", "y-axis-label")
      .attr("text-anchor", "begin")
      .attr("transform", "rotate(-90)")
      .style("font-family", "Times New Roman") 
      .style("font-size", "18px")
      .attr("x", -height / 2 - 30)
      .attr("y", margin.left - 30)
      .text("Cholesterol");
  }

  renderLegend = () =>{
    const svg = d3.select(".scatter_container")
    const legend = svg.append("g").attr("class", "legend")
    .attr("transform", `translate(${100}, ${90})`);

    const legendData = Object.entries(this.colors);

    const legend_x = [-20, 110]; // Relative X position of the legend vertices
    const legend_y = [-40, 40]; // Relative Y position of the legend vertices

    legend.append("rect")
      .attr("width", legend_x[1] - legend_x[0])
      .attr("height", legend_y[1] - legend_y[0])
      .attr("x", legend_x[0])
      .attr("y", legend_y[0]) 
      .attr("fill", "#FAFAFA")
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    legend.append("text")
        .attr("x", 0)
        .attr("y", -20) 
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text("Exercise Angina"); 

    legend.selectAll("circle")
      .data(legendData)
      .join("circle")
      .attr("r", 5)
      .attr("cx", 0)
      .attr("cy", (d, i) => i * 20)
      .attr("fill", d => d[1]);

    legend.selectAll("text.color-label")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", (d, i) => i * 20 + 2.5)
      .text(d => d[0]);
  }

  renderCounter = () =>{
    const svg = d3.select(".scatter_container")
    svg.selectAll(".counter").remove();
    const legend = svg.append("g").attr("class", "counter")
    .attr("transform", `translate(${90}, ${190})`);

    const legendData = Object.entries(this.colors);

    const legend_x = [-20, 130]; // Relative X position of the legend vertices
    const legend_y = [-20, 40]; // Relative Y position of the legend vertices
    console.log(legend.selectAll(".counter").nodes())

    const color_list=["blue", "red"];


    legend.append("rect")
      .attr("width", legend_x[1] - legend_x[0])
      .attr("height", legend_y[1] - legend_y[0])
      .attr("x", legend_x[0])
      .attr("y", legend_y[0]) 
      .attr("fill", "#EEEEEE")
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    // legend.append("text")
    //     .attr("x", 0)
    //     .attr("y", -20) 
    //     .attr("font-size", "14px")
    //     .attr("font-weight", "bold")
    //     .text("Exercise Angina"); 

    legend.selectAll("circle")
      .data(legendData)
      .join("circle")
      .attr("r", 5)
      .attr("cx", 0)
      .attr("cy", (d, i) => i * 20)
      .attr("fill", d => d[1]);

    legend.selectAll("text.color-label")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 10)
      .attr("y", (d, i) => i * 20 + 2.5)
      .attr("font-size", "14px")
      .text((d,i) => `Number of ${color_list[i]}: ${this.state.filter_data.filter(item => item.ExerciseAngina === d[0]).length}`);
  }

  render() {
    return (
      <svg className="scatter_container" width="600" height="400">
      </svg>
    );
  }
}

export default Scatter;