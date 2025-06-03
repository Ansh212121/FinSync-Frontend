import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { useDispatch } from 'react-redux';
import { setDashboardData } from '../Slices/DashboardDataSlice';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Wallet, DollarSign, CreditCard, TrendingUp, Calendar, Activity, RefreshCw } from 'lucide-react';


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  const dispatch = useDispatch();
  
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      console.log("Dashboard data response:", response.data);
      
      const dashboardData = response.data;
      
      if (dashboardData) {
        dispatch(setDashboardData(dashboardData));
        setData(dashboardData);
      } else {
        console.error("No dashboard data found in the response.");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Example data transformation for charts
  const prepareTransactionData = () => {
    if (!data || !data.recentTransactions) return [];
    
    return data.recentTransactions.map(transaction => ({
      name: transaction.source || transaction.category || 'Other',
      amount: transaction.amount,
      type: transaction.source ? 'Income' : 'Expense'
    }));
  };

  // Finance summary cards with glassmorphism effect
  const FinanceSummaryCard = ({ title, value, icon, color }) => {
    const Icon = icon;
    return (
      <div className="bg-white dark:bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-10 rounded-xl shadow-lg border border-white/20 dark:border-white/10 p-4 flex items-center transition-all duration-300 hover:shadow-xl">
        <div className={`p-3 rounded-full mr-4`} style={{ backgroundColor: `${color}30` }}>
          <Icon size={24} color={color} />
        </div>
        <div>
          <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold dark:text-white">₹{Number(value).toLocaleString()}</p>
        </div>
      </div>
    );
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <p className="ml-4 text-lg font-medium text-blue-500 dark:text-blue-400">Loading dashboard data...</p>
    </div>
  );

  if (loading) {
    return (
      <div className="p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">Failed to load dashboard data</div>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center mx-auto"
          onClick={fetchDashboardData}
        >
          <RefreshCw size={18} className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  const transactionData = prepareTransactionData();
  
  // Calculate percentages for the income vs expenses pie chart
  const totalIncome = data.totalIncome || 0;
  const totalExpenses = data.totalExpenses || 0;
  const incomeVsExpensesData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses }
  ];

  // Custom gradient colors for charts
  const getBarGradient = () => {
    return (
      <>
        <linearGradient id="incomeBarGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10B981" stopOpacity={0.9} />
          <stop offset="95%" stopColor="#059669" stopOpacity={0.4} />
        </linearGradient>
        <linearGradient id="expenseBarGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.9} />
          <stop offset="95%" stopColor="#DC2626" stopOpacity={0.4} />
        </linearGradient>
      </>
    );
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Financial Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Your financial overview as of {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>

      {/* Finance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FinanceSummaryCard 
          title="Total Balance" 
          value={data.totalBalance || 0} 
          icon={Wallet} 
          color="#3B82F6" 
        />
        <FinanceSummaryCard 
          title="Total Income" 
          value={data.totalIncome || 0} 
          icon={DollarSign} 
          color="#10B981" 
        />
        <FinanceSummaryCard 
          title="Total Expenses" 
          value={data.totalExpenses || 0} 
          icon={CreditCard} 
          color="#EF4444" 
        />
        <FinanceSummaryCard 
          title="Net Savings" 
          value={(data.totalIncome || 0) - (data.totalExpenses || 0)} 
          icon={TrendingUp} 
          color="#8B5CF6" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Income vs Expenses Chart */}
        <div className="bg-white dark:bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-10 rounded-xl shadow-lg border border-white/20 dark:border-white/10 p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Income vs Expenses</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={1} />
                    <stop offset="100%" stopColor="#DC2626" stopOpacity={0.8} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <Pie
                  data={incomeVsExpensesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  cornerRadius={8}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  filter="url(#glow)"
                >
                  {incomeVsExpensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "url(#incomeGradient)" : "url(#expenseGradient)"} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₹${value}`} 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '10px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions Chart */}
        <div className="bg-white dark:bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-10 rounded-xl shadow-lg border border-white/20 dark:border-white/10 p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Transactions</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transactionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  {getBarGradient()}
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.15} />
                <XAxis dataKey="name" tick={{ fill: 'currentColor' }} />
                <YAxis tick={{ fill: 'currentColor' }} />
                <Tooltip 
                  formatter={(value) => `₹${value}`} 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '10px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="amount" 
                  radius={[8, 8, 0, 0]} 
                  barSize={30}
                  filter="url(#shadow)"
                  fill="url(#incomeBarGradient)"
                  name="Transaction Amount"
                >
                  {transactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.type === 'Income' ? "url(#incomeBarGradient)" : "url(#expenseBarGradient)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-10 rounded-xl shadow-lg border border-white/20 dark:border-white/10 mb-6 transition-all duration-300 hover:shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700/30">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700/30">
            <thead className="bg-gray-50 dark:bg-slate-800/30">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Source/Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700/30">
              {data.recentTransactions && data.recentTransactions.map((transaction, index) => (
                <tr key={transaction.id || index} 
                    className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-150 ${
                      transaction.source 
                        ? 'bg-green-50/30 dark:bg-green-900/10' 
                        : 'bg-red-50/30 dark:bg-red-900/10'
                    }`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {transaction.source ? (
                        <span className="text-sm font-medium text-green-800 dark:text-green-300">{transaction.source}</span>
                      ) : transaction.category ? (
                        <span className="text-sm font-medium text-red-800 dark:text-red-300">{transaction.category}</span>
                      ) : (
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Unknown</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      transaction.source 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>₹{transaction.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.source 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                    }`}>
                      {transaction.source ? 'Income' : 'Expense'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Last updated info */}
      <div className="text-right text-sm text-gray-500 dark:text-gray-400">
        <p className="flex items-center justify-end">
          <Calendar size={14} className="mr-1" />
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;