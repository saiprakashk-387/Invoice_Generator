import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as Rotate } from "./assets/icons/Rotate.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/Login";
import DrawerLayout from "./components/DrawerLayout";
import AuthRoute from "./routes/AuthRoute";
import UnAuthRoute from "./routes/UnAuthRoute";
import Register from "./screens/Register";
import SignIn from "./screens/SignIn";
import Forgot from "./screens/Forgot";
import LoadingScreen from "./components/LoadingScreen";
import Invoice from "./screens/Invoice";
import ViewInvoice from "./screens/ViewInvoice";
import InvoiceList from "./screens/InvoiceList";

const App = () => {
  const { loading } = useSelector((state) => state.common);
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen w-screen hidden lg:flex xs:landscape:flex flex-col items-center justify-center bg-white">
        <Rotate className="flex-shrink-0 h-32 w-36" />
        <p className="mt-6 w-72 text-darkgray text-lg text-center">
          Please rotate your phone to access the application.
        </p>
      </div>
      <ToastContainer />
      {loading && <LoadingScreen />}
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <UnAuthRoute>
                  <Login />
                </UnAuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <UnAuthRoute>
                  <Register />
                </UnAuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <UnAuthRoute>
                  <SignIn />
                </UnAuthRoute>
              }
            />
            <Route
              path="/forgot"
              element={
                <UnAuthRoute>
                  <Forgot />
                </UnAuthRoute>
              }
            />
            <Route element={<DrawerLayout />}>
              <Route
                path="/dashboard"
                element={
                  <AuthRoute>
                    <Invoice />
                  </AuthRoute>
                }
              />
            </Route>

            <Route
              path="/invoice-list"
              element={
                <AuthRoute>
                  <InvoiceList />
                </AuthRoute>
              }
            />
            <Route
              path="/invoice/:id"
              element={
                <AuthRoute>
                  <ViewInvoice />
                </AuthRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
