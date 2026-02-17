import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DataPoint {
  time: string;
  roomA: number;
  roomB: number;
  roomC: number;
  roomD: number;
}

interface TemperatureChartProps {
  data: DataPoint[];
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Trend - Last 24 Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis 
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
              stroke="#666"
              domain={[15, 32]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="roomA" 
              stroke="#3b82f6" 
              name="Room A"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="roomB" 
              stroke="#ef4444" 
              name="Room B"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="roomC" 
              stroke="#10b981" 
              name="Room C"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="roomD" 
              stroke="#f59e0b" 
              name="Room D"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}