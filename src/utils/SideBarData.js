import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const SideBarData = [
    {   index:1,
        title:"Dashboard",
        path:"/dashboard",
        icon:AssessmentIcon,
    },
    {
        index:2,
        title:"Income",
        path:"/income",
        icon:TrendingUpIcon,
    },
    {
        index:3,
        title:"Expense",
        path:"/expense",
        icon:TrendingDownIcon,
    },
    {
        index:4,
        title:"Profile",
        path:"/profile",
        icon:PersonIcon,
    },
    {
        index:5,
        title:"Logout",
        path:"/logout",
        icon:LogoutIcon,
    },
];

export default SideBarData;