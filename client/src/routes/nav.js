import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';
import SubjectIcon from '@mui/icons-material/Subject';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import RedeemIcon from '@mui/icons-material/Redeem';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

 const   menuItems = [
     {
        "name": "Dashboard",
        "url": "dashboard",
        "icon": DashboardIcon
      },
     
      {
        "name": "Orders",
        "url": "all-orders",
        "icon": ShoppingCartIcon 
      },
      {
        "name": "Products",
        "url": "",
        "icon": StorefrontIcon,
        "children": [
          {
            "name": "All Products",
            "url": "all-products",
            "icon": StorefrontIcon
          },
          {
            "name": "Add Product",
            "url": "add-product",
            "icon": AddBusinessIcon
          },
          {
            "name": "Group Product",
            "url": "group-products",
            "icon": AddBusinessIcon
          },
          {
            "name": "Categories",
            "url": "all-categories",
            "icon": CategoryIcon
          },
          {
            "name": "Attribute",
            "url": "attributes",
            "icon": SubjectIcon
          }
        ]
      },
      {
        "name": "Customers",
        "url": "all-customers",
        "icon": SupervisedUserCircleIcon,
        "children": [
          {
            "name": "All Customer",
            "url": "all-customer",
            "icon": SupervisedUserCircleIcon
          },
          {
            "name": "Add Customer",
            "url": "add-customer",
            "icon":AddIcon 
          }
        ]
      },
      {
        "name": "Brands",
        "url": "all-brands",
        "icon": RedeemIcon ,
        "children": [
          {
            "name": "All Brands",
            "url": "all-brands",
            "icon":RedeemIcon 
          },
          {
            "name": "Add Brand",
            "url": "add-brand",
            "icon": AddIcon 
          }
        ]
      },
      {
        "name": "Coupons",
        "url": "all-coupons",
        "icon": NewReleasesIcon
      },
      {
        "name": "Tax",
        "url": "taxes",
        "icon": AttachMoneyIcon
      },
      {
        "name": "Shipping",
        "url": "shipping",
        "icon": LocalShippingIcon
      },
      {
        "name": "Reviews",
        "url": "reviews",
        "icon": StarIcon
      },
      // {
      //   "name": "Pages",
      //   "url": "all-pages",
      //   "icon": InsertDriveFileIcon ,
      //   "children": [
      //     {
      //       "name": "All Pages",
      //       "url": "all-pages",
      //       "icon": InsertDriveFileIcon},
      //     {
      //       "name": "Add Page",
      //       "url": "add-page",
      //       "icon": AddIcon 
      //     }
      //   ]
      // },
  
      // {
      //   "name": "Blogs",
      //   "url": "all-blogs",
      //   "icon": DescriptionIcon,
      //   "children": [
      //     {
      //       "name": "All Blogs",
      //       "url": "all-blogs",
      //       "icon": DescriptionIcon
      //     },
      //     {
      //       "name": "Add Blog",
      //       "url": "add-blog",
      //       "icon": AddIcon 
      //     },
      //     {
      //       "name": "Tags",
      //       "url": "tags",
      //       "icon": LibraryAddIcon
      //     }
      //   ]
      // },
      {
        "name": "Settings",
        "url": "settings",
        "icon": SettingsIcon
      },
      {
        "name": "Users",
        "icon": PersonIcon,
        "children": [
          {
            "name": "All Users",
            "url": "all-users",
            "icon":PersonIcon
          },
          {
            "name": "Add User",
            "url": "add-user",
            "icon": PersonAddIcon
          }
        ]
      }
    ]
  
    export default menuItems;