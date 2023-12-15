import WrapperMultiColumnChart from '~/kendo/charts/column/WrapperColumnChart'
import WrapperPieChart from  '~/kendo/charts/pie/WrapperPieChart'
import WrapperDonutChart from '~/kendo/charts/donut/WrapperDonutChart'
import WrapperMultiStackColChart from '~/kendo/charts/stackcol/WrapperStackColChart'
import WrapperWaterfallChart from '~/kendo/charts/waterfall/WrapperWaterfallChart'

import {overallData,consumptionCategories_m,consumptionTrendSeries_m,invCategories_m,invSeries_m,capCategories_m,
  capSeries_m, consuCategories_m, consuSeries_m } from '~/kendo/rawData/optimize/inputOpti'


export const reviewTabs = [
  { name: 'Month', href: '#', current: true },
  { name: 'Quarter', href: '#', current: false },
  { name: 'Year', href: '#', current: false },
]

export const meetingTabs = [
  { name: 'Daily', href: '#', current: true },
  { name: 'Weekly', href: '#', current: false },
  
]


export const kpiService_m = [
  {
    Name: 'Overall KPIs',
    container: <WrapperDonutChart series={overallData} />,
  },
  {
    Name: 'Consumption Efficiency by Width',
    container: <WrapperMultiStackColChart category={consumptionCategories_m} series={consumptionTrendSeries_m} />, 

  },

]

export const kpiCost_m = [
  
    {
        Name: 'Inventory Efficiency by width',
        container: <WrapperMultiColumnChart category={invCategories_m} series={invSeries_m} /> ,
        
      },
      {
        Name:'Capacity Utilization by Width',
        container: <WrapperMultiColumnChart category={capCategories_m} series={capSeries_m} />,
      },
      {
        Name:'Consumption Inefficiency by width',
        container: <WrapperMultiColumnChart category={consuCategories_m} series={consuSeries_m} />,
      },
]


