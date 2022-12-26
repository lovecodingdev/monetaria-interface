import React, { Component } from 'react';
import CanvasJSReact from 'src/libs/chart_libs/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: false,
      theme: 'light1', // "light1", "dark1", "dark2"
      title: {
        text: '',
      },
      data: [
        {
          type: 'pie',
          indexLabel: '{label}: {y}%',
          startAngle: -90,
          dataPoints: [
            { y: 20, label: 'Airfare' },
            { y: 24, label: 'Food & Drinks' },
            { y: 20, label: 'Accomodation' },
            { y: 14, label: 'Transportation' },
            { y: 12, label: 'Activities' },
            { y: 10, label: 'Misc' },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

module.exports = PieChart;
