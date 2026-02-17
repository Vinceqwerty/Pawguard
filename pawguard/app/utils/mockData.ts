export interface RoomData {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  lastUpdated: Date;
}

export interface ChartDataPoint {
  time: string;
  roomA: number;
  roomB: number;
  roomC: number;
  roomD: number;
}

// Generate mock historical data for 24 hours
export function generateHistoricalData(): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    // Simulate temperature fluctuations throughout the day
    const baseTemp = 23;
    const dailyVariation = Math.sin((hour / 24) * Math.PI * 2) * 2;
    
    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      roomA: baseTemp + dailyVariation + (Math.random() - 0.5) * 1.5,
      roomB: baseTemp + dailyVariation + 3 + (Math.random() - 0.5) * 2, // Room B runs hotter
      roomC: baseTemp + dailyVariation - 1 + (Math.random() - 0.5) * 1.2,
      roomD: baseTemp + dailyVariation + 1 + (Math.random() - 0.5) * 1.8,
    });
  }
  
  return data;
}

// Initial room data
export function getInitialRoomData(): RoomData[] {
  return [
    {
      id: 'room-a',
      name: 'Room A - Small Animals',
      temperature: 24.5,
      humidity: 55,
      lastUpdated: new Date(),
    },
    {
      id: 'room-b',
      name: 'Room B - Recovery Ward',
      temperature: 28.2,
      humidity: 68,
      lastUpdated: new Date(),
    },
    {
      id: 'room-c',
      name: 'Room C - Cats Only',
      temperature: 22.8,
      humidity: 52,
      lastUpdated: new Date(),
    },
    {
      id: 'room-d',
      name: 'Room D - Large Dogs',
      temperature: 25.1,
      humidity: 58,
      lastUpdated: new Date(),
    },
  ];
}

// Simulate sensor updates
export function updateRoomData(currentData: RoomData[]): RoomData[] {
  return currentData.map(room => {
    // Small random fluctuations to simulate real sensor readings
    const tempChange = (Math.random() - 0.5) * 0.3;
    const humidChange = (Math.random() - 0.5) * 2;
    
    let newTemp = room.temperature + tempChange;
    let newHumid = room.humidity + humidChange;
    
    // Keep within realistic bounds
    newTemp = Math.max(18, Math.min(32, newTemp));
    newHumid = Math.max(30, Math.min(80, newHumid));
    
    return {
      ...room,
      temperature: newTemp,
      humidity: newHumid,
      lastUpdated: new Date(),
    };
  });
}
