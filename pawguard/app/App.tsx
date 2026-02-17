import { useState, useEffect } from 'react';
import { Activity, Bell, Settings, Shield } from 'lucide-react';
import { RoomCard } from './components/RoomCard';
import { TemperatureChart } from './components/TemperatureChart';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { 
  getInitialRoomData, 
  updateRoomData, 
  generateHistoricalData,
  type RoomData,
  type ChartDataPoint 
} from './utils/mockData';

export default function App() {
  const [roomData, setRoomData] = useState<RoomData[]>(getInitialRoomData());
  const [chartData] = useState<ChartDataPoint[]>(generateHistoricalData());
  const [alertCount, setAlertCount] = useState(1);

  // Simulate real-time sensor updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoomData(currentData => {
        const updated = updateRoomData(currentData);
        
        // Count critical/warning rooms for alert badge
        const criticalCount = updated.filter(room => {
          const tempCritical = room.temperature < 18 || room.temperature > 28;
          const humidCritical = room.humidity < 35 || room.humidity > 65;
          return tempCritical || humidCritical;
        }).length;
        
        setAlertCount(criticalCount);
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                  <Shield className="size-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">PawGuard</h1>
                  <p className="text-sm text-gray-600">City Veterinary Climate Monitoring</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                <Activity className="size-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">System Active</span>
              </div>
              
              <Button variant="outline" size="icon" className="relative">
                <Bell className="size-5" />
                {alertCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs"
                  >
                    {alertCount}
                  </Badge>
                )}
              </Button>

              <Button variant="outline" size="icon">
                <Settings className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Room Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomData.map((room) => (
              <RoomCard
                key={room.id}
                roomName={room.name}
                temperature={room.temperature}
                humidity={room.humidity}
                lastUpdated={room.lastUpdated}
              />
            ))}
          </div>
        </div>

        {/* Temperature Trend Chart */}
        <div className="mb-8">
          <TemperatureChart data={chartData} />
        </div>

        {/* Safe Range Reference */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Safe Range Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">🌡️</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Temperature</p>
                <p className="text-sm text-gray-600">Safe: 20°C - 26°C</p>
                <p className="text-xs text-yellow-600 mt-1">Warning: 18-20°C or 26-28°C</p>
                <p className="text-xs text-red-600">Critical: &lt;18°C or &gt;28°C</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-50 rounded-lg">
                <span className="text-2xl">💧</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Humidity</p>
                <p className="text-sm text-gray-600">Safe: 40% - 60%</p>
                <p className="text-xs text-yellow-600 mt-1">Warning: 35-40% or 60-65%</p>
                <p className="text-xs text-red-600">Critical: &lt;35% or &gt;65%</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2026 PawGuard - IoT Climate Monitoring System</p>
            <p>Sensor data updates every 30-60 seconds</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
