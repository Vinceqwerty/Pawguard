import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Bell, Settings, Activity, Thermometer, Droplets, LayoutDashboard, History, ShieldCheck } from 'lucide-react';
import './App.css';

const data = [
  { time: '22:00', RoomA: 22, RoomB: 25, RoomC: 20, RoomD: 23 },
  { time: '00:00', RoomA: 24, RoomB: 27, RoomC: 21, RoomD: 25 },
  { time: '02:00', RoomA: 23, RoomB: 26, RoomC: 22, RoomD: 24 },
  { time: '04:00', RoomA: 25, RoomB: 28, RoomC: 23, RoomD: 26 },
  { time: '06:00', RoomA: 24, RoomB: 27, RoomC: 22, RoomD: 25 },
  { time: '08:00', RoomA: 22, RoomB: 26, RoomC: 21, RoomD: 24 },
  { time: '10:00', RoomA: 23, RoomB: 25, RoomC: 20, RoomD: 23 },
];

const StatCard = ({ title, subtitle, temp, humidity, status }) => {
  const statusStyles = {
    SAFE: "border-emerald-500/20 bg-emerald-50/50 text-emerald-600",
    WARNING: "border-amber-500/20 bg-amber-50/50 text-amber-600",
    CRITICAL: "border-rose-500/30 bg-rose-50/50 text-rose-600 animate-pulse"
  };

  return (
    <div className={`p-5 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${statusStyles[status].split(' ')[0]}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{subtitle}</p>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${statusStyles[status]}`}>
          <span className="w-2 h-2 rounded-full bg-current"></span> {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-1 text-slate-400">
            <Thermometer size={14} />
            <span className="text-[10px] font-bold uppercase">Temp</span>
          </div>
          <p className="text-2xl font-black text-slate-800">{temp}°C</p>
        </div>
        <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-1 text-slate-400">
            <Droplets size={14} />
            <span className="text-[10px] font-bold uppercase">Humidity</span>
          </div>
          <p className="text-2xl font-black text-slate-800">{humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-slate-900 text-slate-400 p-6 flex flex-col gap-8 border-r border-slate-800">
        <div className="flex items-center gap-3 text-white px-2">
          <div className="bg-blue-600 p-2 rounded-lg"><ShieldCheck size={24} /></div>
          <span className="font-bold text-xl hidden lg:block">PawGuard</span>
        </div>
        <nav className="flex flex-col gap-2">
          <div className="bg-blue-600/10 text-blue-500 p-3 rounded-xl flex items-center gap-3"><LayoutDashboard size={20} /><span className="hidden lg:block font-medium">Dashboard</span></div>
          <div className="hover:bg-slate-800 p-3 rounded-xl flex items-center gap-3 transition-colors cursor-pointer"><Activity size={20} /><span className="hidden lg:block font-medium">Live Feed</span></div>
          <div className="hover:bg-slate-800 p-3 rounded-xl flex items-center gap-3 transition-colors cursor-pointer"><History size={20} /><span className="hidden lg:block font-medium">Analytics</span></div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Climate Overview</h1>
            <p className="text-slate-500 text-sm">Last system sync: 10:38 PM</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full border border-emerald-500/20 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> SYSTEM ACTIVE
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 relative"><Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span></button>
            <button className="p-2 text-slate-400 hover:text-slate-600"><Settings size={20} /></button>
          </div>
        </header>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Room A" subtitle="Small Animals" temp="24.7" humidity="53" status="SAFE" />
          <StatCard title="Room B" subtitle="Recovery Ward" temp="28.4" humidity="67" status="CRITICAL" />
          <StatCard title="Room C" subtitle="Cats Only" temp="22.8" humidity="55" status="SAFE" />
          <StatCard title="Room D" subtitle="Large Dogs" temp="25.3" humidity="60" status="WARNING" />
        </div>

        {/* Charts Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Temperature Trends (24h)</h3>
            <div className="flex gap-2 text-xs font-bold text-slate-400 uppercase">
              <span className="flex items-center gap-1"><span className="w-3 h-1 bg-blue-500 rounded"></span> Room A</span>
              <span className="flex items-center gap-1"><span className="w-3 h-1 bg-rose-500 rounded"></span> Room B</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F43F5E" stopOpacity={0.1}/><stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="RoomA" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorA)" />
                <Area type="monotone" dataKey="RoomB" stroke="#F43F5E" strokeWidth={3} fillOpacity={1} fill="url(#colorB)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}