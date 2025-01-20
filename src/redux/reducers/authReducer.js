import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";

// Initial state for authentication, fetched from localStorage if available
const initialStateAuth = JSON.parse(localStorage.getItem("authState")) || {
  admin: { id: "", email: "" },
  isLoggedIn: false,
};

// Async thunk for signing in a admin
export const asyncSignIn = createAsyncThunk(
  "authentication/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user; // Return user details for further processing
    } catch (error) {
      return rejectWithValue("Invalid email or password"); // Reject with an error message
    }
  }
);

// Async thrunk for getting current admin details
export const asyncGetUserDetails = createAsyncThunk(
  "authentication/userDetails",
  (_, thunkAPI) => {
    const admin = auth.currentUser;
    if (admin) {
      thunkAPI.dispatch(authActions.setUserDetails(admin));
    }
  }
);

// Creating the slice for authentication-related actions and state
const authSlice = createSlice({
  name: "authentication",
  initialState: initialStateAuth,
  reducers: {
    setUserDetails: (state, action) => {
      const { uid, email } = action.payload;
      state.admin.id = uid;
      state.admin.email = email;
      state.isLoggedIn = true;
      localStorage.setItem("authState", JSON.stringify(state));
      console.log(state);
    },
    logOutAdmin: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("authState");
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSignIn.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(asyncSignIn.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(asyncSignIn.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = authSlice.reducer; // Export the reducer function to use in the store
export const authActions = authSlice.actions; // Export the actions to use in components

// Selector to access authentication state
export const authSelector = (state) => state.authReducer;
