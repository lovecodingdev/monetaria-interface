import { useState, useEffect, Fragment } from 'react';
import CanvasJSReact from 'src/libs/canvasjs/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ data }) => {
  const [items, setItems] = useState([]);
  const [percentageTotal, setPercentageTotal] = useState(0);

  useEffect(() => {
    const _percentageTotal = data.map((item) => item.percentage).reduce((a, b) => a + b);
    setPercentageTotal(_percentageTotal);
    let _defaultItems = [];
    if (_percentageTotal < 100 && _percentageTotal >= 0)
      _defaultItems.push({ label: '', y: 100 - _percentageTotal });
    const _items = data.map((item) => {
      return {
        label: `${item.name} ${item.address && `(${item.address}) `}(${item.percentage}%)`,
        y: item.percentage,
      };
    });
    setItems([..._defaultItems, ..._items]);
  }, [data]);

  if (percentageTotal > 100 || percentageTotal < 0) return <Fragment />;
  return (
    <div>
      <CanvasJSChart
        options={{
          data: [
            {
              type: 'pie',
              dataPoints: items,
            },
          ],
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default PieChart;
