import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import UserDataDisplay from './UserDataDisplay';

interface UserData {
  address?: string;
  createdAt: string;
};

interface DeletedUserData {
  userId: string;
  deletedAt: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const ProfileTrendsDashboard = () => {
  const [profileData, setProfileData] = useState<UserData[]>([]);
  const [addressStats, setAddressStats] = useState([]);
  const [timeStats, setTimeStats] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '[]');
    setProfileData(userData);

    // Address statistics calculation
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

    // Time statistics calculation
    const dateMap = new Map();

    // Process created users
    userData.forEach(entry => {
      const date = new Date(entry.createdAt).toLocaleDateString();
      if (!dateMap.has(date)) {
        dateMap.set(date, { date, creations: 0, deletions: 0 });
      }
      dateMap.get(date).creations += 1;
    });

    // Process deleted users
    deletedUsers.forEach((entry: DeletedUserData) => {
      const date = new Date(entry.deletedAt).toLocaleDateString();
      if (!dateMap.has(date)) {
        dateMap.set(date, { date, creations: 0, deletions: 0 });
      }
      dateMap.get(date).deletions += 1;
    });

    // Convert to array and sort by date
    const timeData = Array.from(dateMap.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setTimeStats(timeData);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile Analytics Dashboard</h2>
      <div>
        <UserDataDisplay />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Profile Updates Over Time</h3>
          <LineChart width={500} height={300} data={timeStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="creations" 
              stroke="#8884d8" 
              name="New Users"
            />
            <Line 
              type="monotone" 
              dataKey="deletions" 
              stroke="#ff0000" 
              name="Deleted Users"
            />
          </LineChart>
        </div>

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
        </div>
      </div>
    </div>
  );
};

export default ProfileTrendsDashboard;