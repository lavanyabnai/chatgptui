import { Chart, ChartLegend, ChartSeries, ChartSeriesItem,ChartSeriesLabels, ChartTitle,ChartValueAxis,ChartValueAxisItem } from '@progress/kendo-react-charts';
import 'hammerjs';

function pointColor(point){
  let summary = point.dataItem.summary;
  if (summary) {
    return summary === "total" ? "#2196f3" : "gray";
  }
  if (point.value > 0) {
    return "green";
  } else {
    return "red";
  }
};

export default function WaterfallChartContainer({data, field, category, summary, format="C0", position="insideEnd"}){
  return (
  <Chart  style={{height: 250}}>
    {/* <ChartTitle text="Cash flow" /> */}
    <ChartSeries>
      <ChartSeriesItem
        type="waterfall"
        data={data}
        color={pointColor}
        field='field'
        categoryField='category'
        summaryField='summary'>
        <ChartSeriesLabels format={format}/>
      </ChartSeriesItem>
    </ChartSeries>
    <ChartValueAxis>
      <ChartValueAxisItem />
    </ChartValueAxis>
  </Chart>
  );
}
