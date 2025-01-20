import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

// Initial state for the profile slice
const initialStateProfile = {
  profiles: [],
  filterProfiles: [],
  searchTerm: "",
  isLoading: false,
};

// Async thunk to fetch profile data from Firestore
export const asyncGetProfileDataFromDB = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    const querySnapshot = await getDocs(collection(db, "profiles"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  }
);

// Async thunk to Add profile data
export const asyncAddProfileToDB = createAsyncThunk(
  "profiles/addProfiles",
  async (profileData, thunkAPI) => {
    console.log(profileData);
    const docRef = await addDoc(collection(db, "profiles"), profileData);
    thunkAPI.dispatch(
      profileActions.addProfile({ id: docRef.id, ...profileData })
    );
  }
);

// Async thunk to Edit profile data
export const asyncEditProfileData = createAsyncThunk(
  "profiles/editProfiles",
  async (profileData, thunkAPI) => {
    await setDoc(doc(db, "profiles", profileData.id), profileData);
    thunkAPI.dispatch(profileActions.editProfile(profileData));
  }
);

// Async thunk to Delete profile
export const asyncDeleteProfileData = createAsyncThunk(
  "profiles/deleteProfiles",
  async (productId, thunkAPI) => {
    await deleteDoc(doc(db, "profiles", productId));
    thunkAPI.dispatch(profileActions.deleteProfile(productId));
  }
);

// Slice to manage profile and filtering
const profileSlice = createSlice({
  name: "profiles",
  initialState: initialStateProfile,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterSearch: (state) => {
      if (state.searchTerm.trim() === "") {
        state.filterProfiles = state.profiles; // If search term is empty, show all profiles
      } else {
        state.filterProfiles = state.profiles.filter((profile) =>
          profile.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
    },
    addProfile: (state, action) => {
      state.profiles = [...state.profiles, action.payload];
    },
    editProfile: (state, action) => {
      const index = state.profiles.findIndex(
        (profile) => profile.id === action.payload.id
      );
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
    deleteProfile: (state, action) => {
      const deletedProfileId = action.payload;
      // Update the profiles state by filtering out the deleted profile
      state.profiles = state.profiles.filter(
        (profile) => profile.id !== deletedProfileId
      );
      // Update the filterProfiles state to reflect the removal of the profile
      state.filterProfiles = state.filterProfiles.filter(
        (profile) => profile.id !== deletedProfileId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetProfileDataFromDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncGetProfileDataFromDB.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.filterProfiles = action.payload;
        state.isLoading = false;
      })
      .addCase(asyncGetProfileDataFromDB.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export the reducer and action from the slice
export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;

// Selector to access the profile state in component
export const profileSelector = (state) => state.profileReducer;
