import { Thermometer, Droplets, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface RoomCardProps {
  roomName: string;
  temperature: number;
  humidity: number;
  lastUpdated: Date;
}

type Status = 'safe' | 'warning' | 'critical';

function getStatus(temperature: number, humidity: number): Status {
  // Safe ranges: Temperature 20-26°C, Humidity 40-60%
  const tempCritical = temperature < 18 || temperature > 28;
  const tempWarning = (temperature >= 18 && temperature < 20) || (temperature > 26 && temperature <= 28);
  const humidCritical = humidity < 35 || humidity > 65;
  const humidWarning = (humidity >= 35 && humidity < 40) || (humidity > 60 && humidity <= 65);

  if (tempCritical || humidCritical) return 'critical';
  if (tempWarning || humidWarning) return 'warning';
  return 'safe';
}

function getStatusColor(status: Status): string {
  switch (status) {
    case 'safe':
      return 'bg-green-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'critical':
      return 'bg-red-500';
  }
}

function getStatusBadgeVariant(status: Status): 'default' | 'secondary' | 'destructive' {
  switch (status) {
    case 'safe':
      return 'default';
    case 'warning':
      return 'secondary';
    case 'critical':
      return 'destructive';
  }
}

export function RoomCard({ roomName, temperature, humidity, lastUpdated }: RoomCardProps) {
  const status = getStatus(temperature, humidity);
  const statusColor = getStatusColor(status);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 ${statusColor}`}></div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{roomName}</CardTitle>
          <Badge 
            variant={getStatusBadgeVariant(status)}
            className="uppercase text-xs"
          >
            {status === 'safe' && '🟢 Safe'}
            {status === 'warning' && '🟡 Warning'}
            {status === 'critical' && '🔴 Critical'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Temperature */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <Thermometer className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-semibold text-blue-700">
                {temperature.toFixed(1)}°C
              </p>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
            <div className="p-2 bg-cyan-100 rounded-full">
              <Droplets className="size-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-2xl font-semibold text-cyan-700">
                {humidity.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t">
          <Clock className="size-4" />
          <span>Last updated: {formatTime(lastUpdated)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
