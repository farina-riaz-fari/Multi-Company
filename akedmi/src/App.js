import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Company from "./pages/Company";
import ChartOfAccount from "./pages/ChartOfAccount";
import Employee from "./pages/Employee";
import InventoryItem from "./pages/InventoryItem";
import Payroll from "./pages/Payroll";
import Project from "./pages/Project";
import Users from "./pages/Users/Users";
import NewCompany from "./pages/Company/NewCompany";
import AddEmployee from "./pages/Employee/AddEmployee";
import Partner from "./pages/Partner/Partner";
import PartnerForm from "./pages/Partner/partnerform";
import UserForm from "./pages/Users/Userform";
import SignupAndLogin from "./pages/SignupAndLogin";
import Settings from "./pages/Settings";
import ProductCategory from "./pages/ProductCategory";

import { AuthProvider, AuthContext } from "./store/signupAndLoginContext";
import { CompanyProvider } from "./store/CompanyContext";
import { EmployeeProvider } from "./store/EmployeeContext";
import { PartnerProvider } from "./store/PartnerContext";
import { UserProvider } from "./store/UserContext";

const AppContent = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<SignupAndLogin />} />
        ) : (
          <Route
            path="/*"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-1 bg-[#F3F4FF] w-full overflow-y-auto h-screen">
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/addCompany" element={<NewCompany />} />
                    <Route path="/partner" element={<Partner />} />
                    <Route path="/add-partner" element={<PartnerForm />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/addEmployee" element={<AddEmployee />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/add-user" element={<UserForm />} />
                    <Route path="/product-category" element={<ProductCategory />} />
                    <Route path="/products" element={<InventoryItem />} />
                    <Route path="/chart" element={<ChartOfAccount />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <PartnerProvider>
        <EmployeeProvider>
          <UserProvider>
            <CompanyProvider>
              <AppContent />
            </CompanyProvider>
          </UserProvider>
        </EmployeeProvider>
      </PartnerProvider>
    </AuthProvider>
  );
}

export default App;
