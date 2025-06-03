import React from 'react';
import { ChevronRight, PieChart, BarChart3, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import NavBar from './NavBar';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <NavBar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium text-sm">
                  Smart Finance Management
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent">
                  Take Control of Your Finances
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
                  Track, analyze, and optimize your income and expenses with FinSync's powerful yet simple financial dashboard.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a href="/signup" className="w-full sm:w-auto px-8 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-300 flex items-center justify-center">
                    Get Started <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                  <a href="/login" className="w-full sm:w-auto px-8 py-3 text-lg font-medium border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300 flex items-center justify-center">
                    Login
                  </a>
                </div>
              </div>
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative z-10 rounded-lg shadow-xl overflow-hidden">
                  <img 
                    src="/assets/dashboard preview.png" 
                    alt="FinSync Dashboard" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <p className="font-medium">Your financial insights at a glance</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-400 dark:bg-teal-500 rounded-full blur-2xl opacity-50"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600 dark:bg-blue-500 rounded-full blur-3xl opacity-30"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Your Finances</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                FinSync provides all the tools you need to manage your money effectively
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Track and categorize your spending to understand where your money goes.
                </p>
              </div>
              
              {/* Feature Card 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Income Management</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor your income sources and analyze your earning patterns over time.
                </p>
              </div>
              
              {/* Feature Card 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get insights through beautiful charts and graphs to make better financial decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Money, Visualized</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See your financial data come to life with our intuitive dashboard
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preview 1 - Expense Dashboard */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">Expense Overview</h3>
                </div>
                <div className="relative">
                  <img 
                    src="/assets/expense preview.png" 
                    alt="Expense Dashboard" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <p className="font-medium">Track where your money is going</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Preview 2 - Income Dashboard */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 bg-teal-50 dark:bg-teal-900/30 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">Income Overview</h3>
                </div>
                <div className="relative">
                  <img 
                    src="/assets/income preview.png" 
                    alt="Income Dashboard" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <p className="font-medium">Monitor your income sources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Join thousands of satisfied users who have transformed their financial lives
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">RP</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Rahul P.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Freelancer</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "FinSync has made tracking my multiple income streams so much easier. The visual analytics helped me identify which projects are truly worth my time."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-teal-600 dark:text-teal-400 font-medium">SM</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Shreya M.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "As a student, I need to be careful with my scholarship money. FinSync helped me budget properly and avoid unnecessary expenses."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 dark:text-purple-400 font-medium">AK</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Arjun K.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Software Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "I've tried many finance apps but FinSync stands out with its clean interface and comprehensive features. It's become an essential tool for my financial planning."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-700 dark:to-teal-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financial Life?</h2>
              <p className="text-xl mb-8 text-blue-100 dark:text-blue-50">
                Join FinSync today and start your journey toward financial clarity and control.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/signup" className="w-full sm:w-auto px-8 py-3 text-lg font-medium text-blue-600 bg-white hover:bg-blue-50 dark:text-blue-800 dark:hover:bg-blue-100 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="/login" className="w-full sm:w-auto px-8 py-3 text-lg font-medium border-2 border-white text-white hover:bg-white/10 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  Login to Your Account
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Navigation Component


// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">FinSync</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              The smarter way to track your finances. FinSync provides powerful tools to manage your income and expenses effectively.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
            © {new Date().getFullYear()} FinSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomePage;