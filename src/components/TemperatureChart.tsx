import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const TemperatureChart = (props: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" dataKey="head_temperature" isAnimationActive={false} stroke="#ECAB72"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default TemperatureChart