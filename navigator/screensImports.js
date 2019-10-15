import Home from '../screens/Home'
import Cart from '../screens/Cart'
import CategoryMoviesList from '../screens/CategoryMoviesList'
import History from '../screens/History'
import Inbox from '../screens/Inbox'
import MovieDetails from '../screens/MovieDetails'
import OpenInbox from '../screens/OpenInbox'
import Points from '../screens/Points'
import Profile from '../screens/Profile'
import Search from '../screens/Search'
import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'


const SCREENROUTES = {
    HomePage: Home,
    CartPage: Cart,
    MovieCategoryListingPage: CategoryMoviesList,
    HistoryPage: History,
    InboxPage: Inbox,
    // MovieDetailsPage: MovieDetails,
    OpenInboxPage: OpenInbox,
    PointsPage: Points,
    ProfilePage: Profile,
    SearchPage: Search
}


export default SCREENROUTES;