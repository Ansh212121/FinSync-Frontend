import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBar } from '../Slices/SideBarSlice';  // Import the Redux action
import SideBarData from '../utils/SideBarData'; // Import your sidebar data
import AddIcon from '@mui/icons-material/Add';

//  

const SideBar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isSideBarOpen);

  // Function to toggle sidebar when clicking the toggle button
  const handleToggleSideBar = () => {
    dispatch(toggleSideBar());
  };

  // const open_Add_Transaction_Bar = ()=>{
  //   dispatch(openTransactionBar());
  // }

  // Function to handle item click separately
  const handleItemClick = (event) => {
    event.stopPropagation(); // Prevents triggering sidebar toggle when clicking icons
  };

  return (
    <div 
      className={`bg-slate-300 h-full ${isOpen ? 'w-[20vw]' : 'w-[5vw]'} h-full dark:bg-slate-900 min-w-[70px] transition-all duration-300`}
    >
      {/* Sidebar Toggle Button */}
      <button 
        onClick={handleToggleSideBar} 
        className="p-3 text-black dark:text-white"
      >
       {isOpen ? '←' : '→'}
      </button>

      <div className="p-4  ">
        <div>
        {SideBarData.map((item) => (
          <a 
            key={item.index} 
            href={item.path} 
            onClick={handleItemClick} 
            className="flex items-center gap-4 p-3 hover:bg-slate-400 dark:hover:bg-slate-700 dark:text-white rounded-md transition"
          >
            <div>{<item.icon />}</div>
            <div className={`${isOpen ? 'md:block hidden' : 'hidden'} `}>{item.title}</div>
          </a>
        ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
