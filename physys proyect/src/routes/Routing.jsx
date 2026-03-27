import UserP from "../pages/UserP";
import Home from "../pages/Home";
import AdminD from "../pages/AdminD";
import FeedbackP from "../pages/FeedbackP";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function Routing() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home/>}/>
        <Route path="User" element={<UserP/>} />
        <Route path="Admin" element={<AdminD/>} />
        <Route path="Feedback" element={<FeedbackP/>} />
        



      </Routes>
    </Router>
  );
}

export default Routing;