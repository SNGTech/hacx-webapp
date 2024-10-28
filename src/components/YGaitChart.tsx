import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const YGaitChart = (props: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis type="number" domain={[-20, 20]} />
        <Tooltip />
        <Legend />
        <Line 
          type="linear" strokeLinejoin="round" dot={false} dataKey="y_gait_left" isAnimationActive={false} stroke="#7292ECFF"
        />
        <Line 
          type="linear" strokeLinejoin="round" dot={false} dataKey="y_gait_right" isAnimationActive={false} stroke="#A172ECFF"
        />
        <ReferenceLine y={0} stroke="#99A3A5FF" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default YGaitChart