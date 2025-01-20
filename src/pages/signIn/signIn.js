import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./signInStyle.css";
import {
  asyncGetUserDetails,
  asyncSignIn,
  authSelector,
} from "../../redux/reducers/authReducer";

function SignIn() {
  // State variables for email, password, and form submission status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Navigation hook for route redirection
  const dispatch = useDispatch(); // Redux dispatch for triggering actions

  const { isLoggedIn } = useSelector(authSelector); // Access auth state from Redux

  useEffect(() => {
    // Fetch user details if the user is logged in
    if (isLoggedIn) dispatch(asyncGetUserDetails());
  }, [dispatch, isLoggedIn]);

  // Handler for sign-in logic
  const handleSignIn = async () => {
    // Check if email or password is empty
    if (!email || !password) {
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await dispatch(asyncSignIn({ email, password })).unwrap();
      console.log("Signin successful!", result);
      toast.success("Signin successful!");
      navigate("/profiles");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sign-wrapper">
      <div className="sign-container">
        <h1 className="sign-header-container">Sign In</h1>
        <div className="warning-container">
          {/* Display a note to users about restricted access */}
          <span>Note : - For Admin Access Only</span>
        </div>
        {/* Sign In Form Section  */}
        <form
          className="sign-form-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
        >
          {/* Email Input Field */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input Field */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
