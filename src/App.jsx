import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Donation from "./pages/Donation";

import CreateReport from "./pages/CreateReport";
import ReportList from "./pages/ReportList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
        <Route path="/reports" element={<ReportList />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/donate" element={<Donation />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
