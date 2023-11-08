import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHeader from "./pages/MainHeader";
import Shop from "./pages/Shop/Shop";
import ContactUs from "./pages/ContactUs/ContactUs";
import Accounts from "./pages/Accounts/Accounts";
import PGSharp from "./pages/PGSharp/PGSharp";
import CardDetail from "./pages/CardDetail/CardDetail";
import Profile from "./pages/Profile/Profile";
import Favourites from "./components/Favourites/Favourites";
import BuyCredits from "./pages/BuyCredits/BuyCredits";
import Login from "./pages/Login/Login";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import BoughtCards from "./pages/BoughtCards/BoughtCards";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainHeader />}>
            <Route index element={<Home />} />
            <Route path="shop/" element={<Shop />}>
              <Route index path="accounts" element={<Accounts />} />
              <Route path="pg-sharps" element={<PGSharp />} />
            </Route>
            <Route path="shop/accounts/:id" element={<CardDetail />} />
            {/* <Route path='shop/pg-sharps/:id' element={<CardDetail/>}/> */}
            <Route path="contactUs" element={<ContactUs />} />
            <Route path="profile/" element={<Profile />}>
              <Route index element={<Favourites title={"FAVOURITES"} />} />
              <Route path="buy_credits" element={<BuyCredits />} />
              <Route path="your_pokemons" element={<BoughtCards />} />
            </Route>
            <Route path="profile/your_pokemons/:id" element={<CardDetail />} />
            <Route path="profile/accounts/:id" element={<CardDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Login />} />
            <Route path="callback/google" element={<LoadingSpinner />} />
            <Route path="callback/facebook" element={<LoadingSpinner />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
