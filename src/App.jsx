import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import DashboardPage from "./pages/main/dashboard/Dashboard.page"
import HomePage from "./pages/home/HomePage"
import MainLayout from "./layouts/MainLayout"
import RegularPayrunPage from "./pages/main/payrun/Regular/RegularPayrunPage"
import SpecialPayrunPage from "./pages/main/payrun/Special/SpecialPayrunPage"
import LastPayrunPage from "./pages/main/payrun/Last/LastPayrunPage"
import PayrunPage from "./pages/main/payrun/payrun/PayrunPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />

        <Route path="/dashboard" element=
          {
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />

        <Route path="/payrun" element=
          {
            <MainLayout>
              <PayrunPage />
            </MainLayout>
          }
        />

        <Route path="/payrun/regular" element=
          {
            <MainLayout>
              <RegularPayrunPage />
            </MainLayout>
          }
        />
        <Route path="/payrun/special" element=
          {
            <MainLayout>
              < SpecialPayrunPage />
            </MainLayout>
          }
        />
        <Route path="/payrun/last" element=
          {
            <MainLayout>
              <LastPayrunPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
