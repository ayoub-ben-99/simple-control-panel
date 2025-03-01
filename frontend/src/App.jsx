import "./style/App.css";
import Sidebar from "./sidebar.jsx";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddUsers from "./addUses.jsx";
import ViewUsers from "./viewUsers.jsx";
import ViewInfoUser from "./view-info.jsx";
import { useLocation } from "react-router-dom";
import NotFound from "./NotFound.jsx";

function App() {
  const location = useLocation(); 
  return (
    <div className="app">
      <div className="continuer">
        <Sidebar activePage={location.pathname} />
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/users" element={<ViewUsers />} />
          <Route path="/users/add" element={<AddUsers />} />
          <Route path="/users/update/:id" element={<AddUsers />} />
          <Route path="/users/view/:id" element={<ViewInfoUser />} />
          <Route path="/users/delete/:id" element={<ViewUsers />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
