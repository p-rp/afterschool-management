import { useEffect, useState } from 'react';
import { Users, UserCheck, UserPlus, Shield } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { api, apiEndpoints } from '../api/client';

interface Stats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalAdmins: number;
}

interface Activity {
  id: number;
  action: string;
  details?: string;
  createdAt: string;
  user?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        api.get<{ stats: Stats }>(apiEndpoints.dashboard.stats),
        api.get<{ activity: Activity[] }>(apiEndpoints.dashboard.recentActivity(5)),
      ]);

      setStats(statsData.stats);
      setActivity(activityData.activity);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: UserCheck,
      color: 'green',
    },
    {
      title: 'New This Month',
      value: stats?.newUsersThisMonth || 0,
      icon: UserPlus,
      color: 'purple',
    },
    {
      title: 'Admins',
      value: stats?.totalAdmins || 0,
      icon: Shield,
      color: 'orange',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {loading ? '...' : stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg bg-${stat.color}-100`}
                    style={{
                      backgroundColor:
                        stat.color === 'blue'
                          ? 'hsl(210, 100%, 95%)'
                          : stat.color === 'green'
                          ? 'hsl(142, 76%, 95%)'
                          : stat.color === 'purple'
                          ? 'hsl(270, 100%, 95%)'
                          : 'hsl(30, 100%, 95%)',
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{
                        color:
                          stat.color === 'blue'
                            ? 'hsl(210, 100%, 50%)'
                            : stat.color === 'green'
                            ? 'hsl(142, 76%, 36%)'
                            : stat.color === 'purple'
                            ? 'hsl(270, 100%, 50%)'
                            : 'hsl(30, 100%, 50%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading...</div>
            ) : activity.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No recent activity</div>
            ) : (
              activity.map((item) => (
                <div key={item.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.action}
                      </p>
                      {item.details && (
                        <p className="text-sm text-gray-500">{item.details}</p>
                      )}
                    </div>
                    <div className="text-right">
                      {item.user && (
                        <p className="text-sm text-gray-600">
                          {item.user.firstName} {item.user.lastName}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
