import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import DashboardPage from "./pages/main/dashboard/Dashboard.page"
import HomePage from "./pages/home/HomePage"
import MainLayout from "./layouts/MainLayout"
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
import ProtectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"
import { EmployeeProvider } from "./contexts/EmployeeProvider"
import { AttendanceProvider } from "./contexts/AttendanceProvider"
import { OvertimeProvider } from "./contexts/OvertimeProvider"
import { LeaveProvider } from "./contexts/LeaveProvider"
import { AbsenceProvider } from "./contexts/AbsenceProvider"
import { RestdayProvider } from "./contexts/RestdayProvider"
import HolidayPage from "./pages/main/attendance/holiday/HolidayPage"
import { HolidayProvider } from "./contexts/HolidayProvider"
import LastPayrunPage from "./pages/main/payrun/last/LastPayrunPage"
import SpecialPayrunPage from "./pages/main/payrun/special/SpecialPayrunPage"
import RegularPayrunPage from "./pages/main/payrun/Regular/RegularPayrunPage"
import { PayitemProvider } from "./contexts/PayitemProvider"

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <UserProvider >
          <CompanyProvider >
            <EmployeeProvider>
              <AttendanceProvider >
                <OvertimeProvider >
                  <LeaveProvider >
                    <AbsenceProvider >
                      <RestdayProvider>
                        <HolidayProvider>
                          <PayitemProvider >
                            <Routes>
                              {/* Public routes */}
                              <Route path="/" element={<HomePage />} />
                              {/* Navitate to Dasboard if there's token */}
                              <Route element={<PublicRoute />}>
                                <Route path="/auth/login" element={<LoginPage />} />
                              </Route>

                              {/* Protected routes with MainLayout */}
                              <Route element={<MainLayout />}>
                                <Route element={<ProtectedRoute />} >
                                  <Route path="/dashboard" element={<DashboardPage />} />

                                  <Route path="/payrun" element={<PayrunPage />} />
                                  <Route path="/payrun/regular" element={< RegularPayrunPage />} />
                                  <Route path="/payrun/special" element={<SpecialPayrunPage />} />
                                  <Route path="/payrun/last" element={<LastPayrunPage />} />

                                  <Route path="/employee" element={<EmployeePage />} />

                                  <Route path="/company" element={<CompanyPage />} />

                                  <Route path="/attendance" element={<AttendancePage />} />
                                  <Route path="/attendance/absence" element={<AbsencePage />} />
                                  <Route path="/attendance/leave" element={<LeavePage />} />
                                  <Route path="/attendance/overtime" element={<OvertimePage />} />
                                  <Route path="/attendance/restday" element={<RestdayPage />} />
                                  <Route path="/attendance/holiday" element={<HolidayPage />} />
                                </Route>
                              </Route>
                            </Routes>
                          </PayitemProvider>
                        </HolidayProvider>
                      </RestdayProvider>
                    </AbsenceProvider>
                  </LeaveProvider>
                </OvertimeProvider>
              </AttendanceProvider>
            </EmployeeProvider>
          </CompanyProvider>
        </UserProvider>
      </ToastProvider>
    </BrowserRouter >
  )
}

export default App
