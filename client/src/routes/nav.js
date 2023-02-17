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

const menuItems = [
  {
    "name": "Dashboard",
    "url": "dashboard",
    "icon": DashboardIcon,
    "role": ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
  },

  {
    "name": "Orders",
    "url": "all-orders",
    "icon": ShoppingCartIcon,
    "role": ['USER']
  },
  {
    "name": "Products",
    "url": "",
    "icon": StorefrontIcon,
    "role": ['USER'],
    "children": [
      {
        "name": "All Products",
        "url": "all-products",
        "icon": StorefrontIcon,
        "role": ['USER']
      },
      {
        "name": "Add Product",
        "url": "add-product",
        "icon": AddBusinessIcon,
        "role": ['USER']
      },
      {
        "name": "Categories",
        "url": "all-categories",
        "icon": CategoryIcon,
        "role": ['USER']
      },
      {
        "name": "Attribute",
        "url": "attributes",
        "icon": SubjectIcon,
        "role": ['USER']
      }
    ]
  },
  {
    "name": "Customers",
    "url": "all-customers",
    "icon": SupervisedUserCircleIcon,
    "role": ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER'],
    "children": [
      {
        "name": "All Customer",
        "url": "all-customer",
        "icon": SupervisedUserCircleIcon,
        "role": ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
      },
      {
        "name": "Add Customer",
        "url": "add-customer",
        "icon": AddIcon,
        "role": ['MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR', 'USER']
      }
    ]
  },
  {
    "name": "Brands",
    "url": "all-brands",
    "icon": RedeemIcon,
    "role": ['USER'],
    "children": [
      {
        "name": "All Brands",
        "url": "all-brands",
        "icon": RedeemIcon,
        "role": ['USER']
      },
      {
        "name": "Add Brand",
        "url": "add-brand",
        "icon": AddIcon,
        "role": ['USER']
      }
    ]
  },
  {
    "name": "Coupons",
    "url": "all-coupons",
    "icon": NewReleasesIcon,
    "role": ['USER',]
  },
  {
    "name": "Tax",
    "url": "taxes",
    "icon": AttachMoneyIcon,
    "role": ['USER', 'MANAGER', 'SUBSCRIBER', 'EDITOR', 'AUTHOR',]
  },
  {
    "name": "Shipping",
    "url": "shipping",
    "icon": LocalShippingIcon,
    role: ['USER']
  },
  {
    "name": "Reviews",
    "url": "reviews",
    "icon": StarIcon,
    role: ['USER']
  },
  {
    "name": "Pages",
    "url": "all-pages",
    "icon": InsertDriveFileIcon,
    "role": ['USER'],
    "children": [
      {
        "name": "All Pages",
        "url": "all-pages",
        "icon": InsertDriveFileIcon,
        "role": ['USER']
      },
      {
        "name": "Add Page",
        "url": "add-page",
        "icon": AddIcon,
        role: ['USER']
      }
    ]
  },

  {
    "name": "Blogs",
    "url": "all-blogs",
    "icon": DescriptionIcon,
    role: ['MANAGER', 'SUBSCRIBER', 'USER'],
    "children": [
      {
        "name": "All Blogs",
        "url": "all-blogs",
        "icon": DescriptionIcon,
        "role": ['MANAGER', 'SUBSCRIBER', 'USER']
      },
      {
        "name": "Add Blog",
        "url": "add-blog",
        "icon": AddIcon,
        "role": ['MANAGER', 'SUBSCRIBER', 'USER']
      },
      {
        "name": "Tags",
        "url": "tags",
        "icon": LibraryAddIcon,
        "role": ['MANAGER', 'SUBSCRIBER', 'USER']
      }
    ]
  },
  {
    "name": "Settings",
    "url": "settings",
    "icon": SettingsIcon,
    "role": ['USER']
  },
  {
    "name": "Users",
    "icon": PersonIcon,
    "role": ['USER'],
    "children": [
      {
        "name": "All Users",
        "url": "all-users",
        "icon": PersonIcon,
        "role": ['USER'],
      },
      {
        "name": "Add User",
        "url": "add-user",
        "icon": PersonAddIcon,
        "role": ['USER'],
      }
    ]
  }
]

export default menuItems;