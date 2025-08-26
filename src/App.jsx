import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import DashboardPage from "./pages/main/dashboard/Dashboard.page"
import HomePage from "./pages/home/HomePage"
import MainLayout from "./layouts/MainLayout"
import RegularPayrunPage from "./pages/main/payrun/Regular/RegularPayrunPage"
import SpecialPayrunPage from "./pages/main/payrun/Special/SpecialPayrunPage"
import LastPayrunPage from "./pages/main/payrun/Last/LastPayrunPage"
import PayrunPage from "./pages/main/payrun/payrun/PayrunPage"
import AttendancePage from "./pages/main/attendance/attendance/AttendancePage"
import AbsencePage from "./pages/main/attendance/absence/AbsencePage"
import LeavePage from "./pages/main/attendance/leave/LeavePage"
import OvertimePage from "./pages/main/attendance/overtime/OvertimePage"
import RestdayPage from "./pages/main/attendance/restday/RestdayPage"
import EmployeePage from "./pages/main/employee/EmployeePage"
import CompanyPage from "./pages/main/company/CompanyPage"
import { UserProvider } from "./contexts/UserProvider"
import { CompanyProvider } from "./contexts/CompanyProvider"
import { ToastProvider } from "./contexts/ToastProvider"

function App() {

  return (
    <BrowserRouter>
      <ToastProvider>
        <UserProvider >
          <CompanyProvider >
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/login" element={<LoginPage />} />

              {/* Protected routes with MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="/payrun" element={<PayrunPage />} />
                <Route path="/payrun/regular" element={<RegularPayrunPage />} />
                <Route path="/payrun/special" element={<SpecialPayrunPage />} />
                <Route path="/payrun/last" element={<LastPayrunPage />} />

                <Route path="/employee" element={<EmployeePage />} />

                <Route path="/company" element={<CompanyPage />} />

                <Route path="/attendance" element={<AttendancePage />} />
                <Route path="/attendance/absence" element={<AbsencePage />} />
                <Route path="/attendance/leave" element={<LeavePage />} />
                <Route path="/attendance/overtime" element={<OvertimePage />} />
                <Route path="/attendance/restday" element={<RestdayPage />} />
              </Route>
            </Routes>
          </CompanyProvider>
        </UserProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
