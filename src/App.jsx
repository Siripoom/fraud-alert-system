import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Donation from "./pages/Donation";
import EmergencyContacts from "./pages/EmergencyContacts";
import CreateReport from "./pages/CreateReport";
import ReportList from "./pages/ReportList";
import TrustedShopForm from "./pages/TrustedShopForm";
import TrustedShops from "./pages/TrustedShops";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
        <Route path="/admin/reports" element={<ReportList />} />
        <Route path="/admin/trusted-shops" element={<TrustedShopForm />} />
        <Route path="trusted-shops" element={<TrustedShops />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
