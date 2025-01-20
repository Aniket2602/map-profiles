import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./navbarStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "../../redux/reducers/authReducer";

function Navbar() {
  const dispatch = useDispatch(); // Redux dispatch to trigger actions
  const navigate = useNavigate(); // Navigation hook for route redirection

  const { isLoggedIn } = useSelector(authSelector);

  // Function to handle sign-out
  const handleSignOut = () => {
    try {
      dispatch(authActions.logOutAdmin());
      navigate("/");
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  };

  return (
    <>
      <div className="nav-container">
        {/* Logo and name of the application */}
        <div className="nav-logo-container">
          <div className="img-wrapper">
            <img
              src="https://i.pinimg.com/736x/7d/17/a0/7d17a0e7f85305ae68d940c13ef8152a.jpg"
              alt="MapProfile Logo"
            />
          </div>
          <h1 className="nav-heading">MapProfiles</h1> {/* Application name */}
          {/* Welcome message displayed for logged-in admin */}
          {isLoggedIn && <span className="wel-msg">Welcome! Admin</span>}
        </div>

        {/* Navigation Links */}
        <div className="nav-list-conatiner">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            {/* View Profiles Link */}
            <li>
              <NavLink to="/profiles" className="nav-link">
                View Profiles
              </NavLink>
            </li>

            {/* Add Profile Link - Visible only when logged in */}
            {isLoggedIn && (
              <li>
                <NavLink to="/addProfile" className="nav-link">
                  Add Profile
                </NavLink>
              </li>
            )}

            {/* Sign In/Sign Out based on login status */}
            {isLoggedIn ? (
              <li onClick={handleSignOut}>Sign Out</li>
            ) : (
              <li>
                <NavLink to="/signin" className="nav-link">
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Renders child routes */}
      <Outlet />
    </>
  );
}

export default Navbar;
