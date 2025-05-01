import React, { Component } from "react";
import * as d3 from "d3";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.renderChart();
  }

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
    
    

   

    // These are the dimensions of the total dashboard
    const margin = { top: 60, right: 0, bottom: 20, left: 80 },
      width = 1000,
      height = 1000,
      innerWidth = 500 - margin.left - margin.right,
      innerHeight = 300 - margin.top - margin.bottom;

    // Creating the line chart
    // Create the SVG container for the lineChart, recommend to use another name for other charts
    const svg = d3.select('#mysvg').attr('width', width).attr('height', height).select('.lineChart').attr('transform', `translate(${margin.left},${margin.top})`);

    // Set the scales for the axes
    const xScale = d3.scaleLinear().domain([d3.min(male_data, d=>d.age), d3.max(male_data, d=>d.age)]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([100, d3.max(male_data, d => d.MaxHR)]).range([innerHeight, 0]);

    // Create the line generator
    const lineGenerator = d3.line().x(male_data => xScale(male_data.age)).y(male_data => yScale(male_data.MaxHR)).curve(d3.curveCardinal);
    const lineGenerator2 = d3.line().x(female_data => xScale(female_data.age)).y(female_data => yScale(female_data.MaxHR)).curve(d3.curveCardinal);
    // Generate the path data
    const pathData = lineGenerator(male_data);
    const pathData2 = lineGenerator2(female_data)

    // Use join to handle the enter, update, and exit of the line path
    svg.selectAll('.line').data([null]).join('path').attr('class', 'line').attr('d', pathData).attr("fill", "none").attr('stroke', 'blue')
    .attr("stroke-width",2);

    svg.selectAll('.line2').data([null]).join('path').attr('class', 'line').attr('d', pathData2).attr("fill", "none").attr('stroke', 'hotpink')
    .attr("stroke-width",2);

    // Creating the x-axis and y-axis for the line chart
    svg.selectAll('.xaxis').data([null]).join('g').attr('class', 'xaxis').attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    
    svg.selectAll('.yaxis').data([null]).join('g').attr('class', 'yaxis').call(d3.axisLeft(yScale));

    // Titles for the line chart
    svg.append("text").attr("class", "title").attr("x", innerWidth-350)
    .attr("y", -margin.top/2).style("font-size","20px")
    .style("font-weight", "bold").style("font-family", "sans-serif").text("Maximum Heart Rate by Age")

    svg.append("text").attr("transform", "rotate(-90)").attr("y", 20-margin.left)
    .attr("x", 400-(height/2)).attr("dy", "1em").style("text-anchor", "middle")
    .style("font-size", "15px").style("font-family", "sans-serif").text("Maximum Heart Rate")

    svg.append("text").attr("x", innerWidth/2).attr("y", innerHeight + margin.bottom+20)
    .style("font-size", "15px").style("font-family", "sans-serif").style("text-anchor", "middle")
    .text("Age")

  // Legend for the line chart
  const line_legend = svg.append("g")
  .attr("transform", `translate(${innerWidth + 20}, ${margin.top-50})`)

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
    { disease: "No Heart Disease", No_FastingBS: 366, FastingBS:44},
    { disease: "Heart Disease", No_FastingBS: 338, FastingBS:170}
   
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
.attr('transform', `translate(${margin.left-80}, ${innerHeight + margin.top + 100})`); 


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
barChartGroup.append("text").attr("transform", "rotate(-90)").attr("y", 20-margin.left)
    .attr("x", 400-(height/2)).attr("dy", "1em").style("text-anchor", "middle")
    .style("font-size", "15px").text("Number of patients")

barChartGroup.append("text").attr("class", "title").attr("x", innerWidth-400)
    .attr("y", -margin.top/2).style("font-size","18px")
    .style("font-weight", "bold").text("Fasting Blood Sugar vs Heart-Disease Status")

barChartGroup.append("text").attr("x", innerWidth/2).attr("y", innerHeight + margin.bottom+20)
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
        .on("mouseover", ()=>tooltip.style("opacity",1))
        .on("mousemove", (event, d) => {
          const total_patients = d.data.No_FastingBS + d.data.FastingBS;
          tooltip.style("opacity", 1)
          .html(`
             Percentage: ${parseFloat((d[1] - d[0])/total_patients,2).toFixed(2)}
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
        .attr("transform", `translate(${innerWidth + 20}, ${margin.top-50})`)



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
  };


  render() {
    return (
      <div className="parent">
        <svg id="mysvg" width="2000" height="1500">
        <g className="lineChart"></g>
        <g className="barChart"></g>
        </svg>
      </div>

    

      
    );
  }
}

export default App;