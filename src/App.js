// Import from react libraries
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// Import component and store
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import Profiles from "./pages/profiles/profile";
import SignIn from "./pages/signIn/signIn";
import Details from "./pages/details/details";
import Page404 from "./components/errorPage/errorPage";
import store from "./redux/store";
import { authSelector } from "./redux/reducers/authReducer";

function App() {
  // PrivateRoute ensures that certain routes are accessible only to logged-in admin
  const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useSelector(authSelector);

    // If the admin is not logged in, redirect them to the home page
    if (!isLoggedIn) {
      return <Navigate to="/" replace={true} />;
    }
    return children; // If logged in, render the protected content
  };

  // Defining the browser router with different routes in the application
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Home /> },
        { path: "signin", element: <SignIn /> },
        {
          path: "addProfile",
          element: (
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          ),
        },
        {
          path: "editProfile/:profileId",
          element: (
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          ),
        },
        {
          path: "profiles",
          element: <Profiles />,
        },
      ],
    },
  ]);

  return (
    // Provides the Redux store to all child components
    <Provider store={store}>
      <RouterProvider router={browserRouter} /> {/* Manages route navigation */}
      <ToastContainer />
    </Provider>
  );
}

export default App;
