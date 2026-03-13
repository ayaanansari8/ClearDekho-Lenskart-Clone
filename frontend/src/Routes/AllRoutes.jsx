import EyeglassesList from '../Pages/EyeglassesList';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../Pages/AdminDashboard';
import Home from '../Pages/Homepage/Home';
import SinglePage from '../Components/Products/SingleCArd';
import { Product } from '../Pages/Product';
import AdminProducts from '../Pages/AdminProducts';
import AdminProductEdit from '../Pages/AdminProductEdit';
import AllUsers from '../AdminPage/AllUsers';
import Payment from '../Components/Products/Payment';
import Cart from '../Components/Products/cart';
import AdminLogin from '../Pages/AdminLogin';
import AdminSignup from '../Pages/AdminSignup';
import AdminOrders from '../Pages/AdminOrders';
import Login from '../Pages/login/Login';
import Signup from '../Pages/Signup/Signup';
import MyOrders from '../Pages/MyOrders';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/admindashboard' element={<AdminDashboard/>}/>
            <Route path="/eyeglasses/:id" element={<Product />} />
            <Route path='/eyeglasses' element={<EyeglassesList />} />
            <Route path='/adminproducts' element={<AdminProducts />} />
            <Route path="/allusers" element={<AllUsers/>}/>
            <Route path='/adminproducts/update/:id' element={<AdminProductEdit />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/adminlogin' element={<AdminLogin/>}/>
            <Route path='/adminsignup' element={<AdminSignup/>}/>
            <Route path='/adminorders' element={<AdminOrders/>}/>
            <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
    )
};

export default AllRoutes;