import UserP from "../pages/UserP";
import Home from "../pages/Home";
import AdminD from "../pages/AdminD";


function Routing() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/"  element={<App />} />
        <Route path="/" element={<Home/>}/>
        <Route path="User" element={<UserP/>} />
        <Route path="Admin" element={<AdminD/>} />
        



      </Routes>
    </Router>
  );
}

export default Routing;