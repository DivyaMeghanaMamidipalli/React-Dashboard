import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const ProfileTrendsDashboard = () => {
  const [profileData, setProfileData] = useState([]);
  const [addressStats, setAddressStats] = useState([]);
  const [timeStats, setTimeStats] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    setProfileData(userData);

    const addressCounts = userData.reduce((acc, entry) => {
      const address = entry.address || 'Unknown';
      acc[address] = (acc[address] || 0) + 1;
      return acc;
    }, {});

    const addressData = Object.entries(addressCounts).map(([address, count]) => ({
      address,
      count
    }));
    setAddressStats(addressData);

    const timeData = userData.map(entry => ({
      date: new Date(entry.createdAt).toLocaleDateString(),
      entries: 1
    }));

    const aggregatedTimeData = timeData.reduce((acc, curr) => {
      const existing = acc.find(item => item.date === curr.date);
      if (existing) {
        existing.entries += curr.entries;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    setTimeStats(aggregatedTimeData);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Time Trend Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Profile Updates Over Time</h3>
          <LineChart width={500} height={300} data={timeStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="entries" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Address Distribution Chart
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Address Distribution</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={addressStats}
              dataKey="count"
              nameKey="address"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {addressStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div> */}

        {/* Profile Completion Stats
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
          <BarChart width={500} height={300} data={profileData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="address" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="phone" fill="#82ca9d" />
          </BarChart>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileTrendsDashboard;