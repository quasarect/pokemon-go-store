import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHeader from './pages/MainHeader';
import Shop from './pages/Shop/Shop';
import ContactUs from './pages/ContactUs/ContactUs';
import Accounts from './pages/Accounts/Accounts';
import PGSharp from './pages/PGSharp/PGSharp';
import CardDetail from './pages/CardDetail/CardDetail';
import Profile from './pages/Profile/Profile';
import Favourites from './components/Favourites/Favourites';
import BuyCredits from './pages/BuyCredits/BuyCredits';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<MainHeader/>}>
          <Route index element={<Home/>}/>
          <Route path='shop/' element={<Shop/>}>
            <Route index path='accounts' element={<Accounts/>}/>
            <Route path='pg-sharps' element={<PGSharp/>}/>
          </Route>
          <Route path='shop/accounts/:id' element={<CardDetail/>}/>
          <Route path='contactUs' element={<ContactUs/>}/>
          <Route path='profile/' element={<Profile/>}>
            <Route index element={<Favourites/>}/>
            <Route path='buy_credits' element={<BuyCredits/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
