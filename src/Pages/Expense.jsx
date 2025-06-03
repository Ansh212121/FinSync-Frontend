import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { useDispatch } from 'react-redux';
import { setDashboardData } from '../Slices/DashboardDataSlice';
import { useForm } from 'react-hook-form';
import { 
  PieChart, Pie, Cell, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  DollarSign, Calendar, Activity, RefreshCw, Plus, X, Trash2, Filter, 
  TrendingDown, Edit, Download, ChevronDown
} from 'lucide-react';

const Expense = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const dispatch = useDispatch();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    }
  });

  const exportData = async () => {
  try {
  const response = await axiosInstance.get(
    API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
    {
      responseType: "blob",
    }
  );
  // Create a URL for the blob
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "expense_details.xlsx");
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
} catch (error) {
  console.error("Error downloading expense details:", error);
}
  }
  
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch dashboard data
      const dashboardResponse = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      console.log("Dashboard data response:", dashboardResponse.data);
      
      const dashboardData = dashboardResponse.data;
      
      if (dashboardData) {
        dispatch(setDashboardData(dashboardData));
        setData(dashboardData);
      } else {
        console.error("No dashboard data found in the response.");
      }
      
      // Fetch all expense transactions
      const expenseResponse = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      console.log("Expense data response:", expenseResponse.data);
      
      if (expenseResponse.data) {
        setExpenseData(expenseResponse.data);
      } else {
        console.error("No expense data found in the response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Get only expense transactions
  const getExpenseTransactions = () => {
    // Use the dedicated expense data if available, otherwise fall back to dashboard data
    if (expenseData && expenseData.length > 0) {
      return expenseData;
    }
    
    if (!data || !data.recentTransactions) return [];
    
    return data.recentTransactions.filter(transaction => transaction.category);
  };

  // Calculate total expenses (all time)
  const calculateTotalExpense = () => {
    const transactions = getExpenseTransactions();
    if (!transactions || transactions.length === 0) return 0;
    
    // Sum up all expense amounts
    return transactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  };

  // Calculate current month's expenses
  const calculateCurrentMonthExpense = () => {
    const transactions = getExpenseTransactions();
    if (!transactions || transactions.length === 0) return 0;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.date);
      if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  // Prepare data for category distribution chart
  const prepareCategoryDistributionData = () => {
    const transactions = getExpenseTransactions();
    if (!transactions || transactions.length === 0) return [];
    
    const categoryMap = {};
    
    transactions.forEach(transaction => {
      const category = transaction.category || 'Other';
      if (categoryMap[category]) {
        categoryMap[category] += transaction.amount;
      } else {
        categoryMap[category] = transaction.amount;
      }
    });
    
    return Object.keys(categoryMap).map(category => ({
      name: category,
      value: categoryMap[category]
    }));
  };

  // Prepare data for daily expense chart
  const prepareDailyExpenseData = () => {
    const transactions = getExpenseTransactions();
    if (!transactions || transactions.length === 0) return [];
    
    // Group by date
    const dateMap = {};
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!date) return;
      
      if (dateMap[date]) {
        dateMap[date] += transaction.amount;
      } else {
        dateMap[date] = transaction.amount;
      }
    });
    
    // Convert to array and sort by date
    return Object.keys(dateMap)
      .map(date => ({ date, expense: dateMap[date] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Handle form submission for adding new expense
  const onSubmit = async (formData) => {
    console.log("Form submitted:", formData);
    
    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, formData);
      console.log("Add expense response:", response.data);
      
      // Refresh data after successful addition
      fetchDashboardData();
      
      // Close the form and reset it
      setShowAddExpenseForm(false);
      reset();
      
    } catch (error) {
      console.error("Error adding expense:", error);
      // Handle error (could add state for error messages)
    }
  };

  // Handle delete confirmation
  const confirmDelete = (expense) => {
    setExpenseToDelete(expense);
    setShowDeleteConfirm(true);
  };

  // Handle actual deletion
  const handleDelete = async () => {
    if (!expenseToDelete) return;
    
    console.log("Deleting expense:", expenseToDelete);
    
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(expenseToDelete._id));
      
      // Refresh data after successful deletion
      fetchDashboardData();
      
    } catch (error) {
      console.error("Error deleting expense:", error);
      // Handle error (could add state for error messages)
    } finally {
      setShowDeleteConfirm(false);
      setExpenseToDelete(null);
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <p className="ml-4 text-lg font-medium text-blue-500 dark:text-blue-400">Loading expense data...</p>
    </div>
  );

  // Modal for confirmation
  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full shadow-xl">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete this expense entry of ₹{expenseToDelete?.amount.toLocaleString()} for {expenseToDelete?.category}?
        </p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  // Form for adding new expense
  const AddExpenseForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Expense</h3>
          <button 
            onClick={() => setShowAddExpenseForm(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="E.g. Food, Rent, Utilities, etc."
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { 
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be positive" }
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Additional details..."
            ></textarea>
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowAddExpenseForm(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Expense summary card with glassmorphism effect
  const ExpenseSummaryCard = ({ title, value, icon, color, subtitle }) => {
    const Icon = icon;
    return (
      <div className="bg-white dark:bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-10 rounded-xl shadow-lg border border-white/20 dark:border-white/10 p-4 flex items-center transition-all duration-300 hover:shadow-xl">
        <div className={`p-3 rounded-full mr-4`} style={{ backgroundColor: `${color}30` }}>
          <Icon size={24} color={color} />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold dark:text-white">₹{Number(value).toLocaleString()}</p>
          {subtitle && <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>
    );
  };

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
        <div className="text-red-500 mb-4">Failed to load expense data</div>
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

  const expenseTransactions = getExpenseTransactions();
  const categoryDistributionData = prepareCategoryDistributionData();
  const dailyExpenseData = prepareDailyExpenseData();
  const currentMonthExpense = calculateCurrentMonthExpense();
  const totalExpense = calculateTotalExpense();
  
  // Color scale for charts
  const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899', '#0EA5E9', '#6366F1', '#14B8A6'];

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Expense Overview</h1>
          <p className="text-gray-600 dark:text-gray-300">Track and manage your expenses</p>
        </div>
        <button 
          onClick={() => setShowAddExpenseForm(true)}
          className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center shadow-lg transition-all duration-300"
        >
          <Plus size={18} className="mr-2" />
          Add Expense
        </button>
      </div>

      {/* Expense Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <ExpenseSummaryCard 
          title="Total Expenses" 
          value={totalExpense} 
          icon={DollarSign} 
          color="#EF4444" 
          subtitle="All time"
        />
        <ExpenseSummaryCard 
          title="Total Expenses This Month" 
          value={currentMonthExpense} 
          icon={TrendingDown} 
          color="#F59E0B" 
          subtitle={`${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}
        />
        <ExpenseSummaryCard 
          title="Expense Categories" 
          value={categoryDistributionData.length} 
          icon={Activity} 
          color="#3B82F6" 
          subtitle="Active expense categories"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Expense Chart */}
        <div className="bg-white dark:bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-10 rounded-xl shadow-lg border border-white/20 dark:border-white/10 p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Date-wise Expenses</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailyExpenseData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.15} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: 'currentColor' }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }}
                />
                <YAxis tick={{ fill: 'currentColor' }} />
                <Tooltip 
                  formatter={(value) => `₹${value}`}
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    });
                  }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '10px'
                  }}
                />
                <Line 
                  type="monotone"
                  dataKey="expense" 
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#EF4444", stroke: "#EF4444" }}
                  activeDot={{ r: 6, fill: "#EF4444", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Categories Distribution */}
        <div className="bg-white dark:bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-10 rounded-xl shadow-lg border border-white/20 dark:border-white/10 p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Expense Categories Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  cornerRadius={8}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
      </div>

      {/* Expense List */}
      <div className="bg-white dark:bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-10 rounded-xl shadow-lg border border-white/20 dark:border-white/10 mb-6 transition-all duration-300 hover:shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700/30 flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Expense Transactions</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg text-sm flex items-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                <Filter size={14} className="mr-1" />
                Filter
                <ChevronDown size={14} className="ml-1" />
              </button>
            </div>
            <button 
              className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg text-sm flex items-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              onClick={exportData}
            >
              <Download size={14} className="mr-1" 
              />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {expenseTransactions.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700/30">
              <thead className="bg-gray-50 dark:bg-slate-800/30">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700/30">
                {expenseTransactions.map((transaction, index) => (
                  <tr key={transaction.id || index} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{transaction.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {transaction.date ? new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-red-600 dark:text-red-400">₹{transaction.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                        {transaction.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => confirmDelete(transaction)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No expense transactions found</p>
              <button 
                onClick={() => setShowAddExpenseForm(true)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg inline-flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Your First Expense
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Last updated info */}
      <div className="text-right text-sm text-gray-500 dark:text-gray-400 flex items-center justify-end">
        <Calendar size={14} className="mr-1" />
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
        <button 
          onClick={fetchDashboardData}
          className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          title="Refresh data"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Add Expense Form Modal */}
      {showAddExpenseForm && <AddExpenseForm />}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && <DeleteConfirmationModal />}
    </div>
  );
};

export default Expense;