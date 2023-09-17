import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHeader from './pages/MainHeader';
import Shop from './pages/Shop/Shop';
import ContactUs from './pages/ContactUs/ContactUs';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<MainHeader/>}>
          <Route index element={<Home/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='contactUs' element={<ContactUs/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
