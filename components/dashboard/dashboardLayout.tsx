import React from 'react'
import DashboardStats from './cardData/DashboardStats'
import ChartData from './chartData/chartData'
import TableData from './tableData/tableData'
const dashboardLayout = () => {
  return (
    <>
    <DashboardStats/>
    <ChartData/>
    <TableData/>
    </>
  )
}

export default dashboardLayout