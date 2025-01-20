import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "./detailsStyle.css";
import {
  asyncAddProfileToDB,
  asyncEditProfileData,
  profileSelector,
} from "../../redux/reducers/profileReducer";

function Details() {
  // Local state variables for profile details
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [dob, setDob] = useState();
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [profileImg, setProfileImg] = useState(
    "https://i.pinimg.com/736x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
  );
  const [description, setDescription] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [achievements, setAchievements] = useState("");

  // Retrieve profileId from route params to determine add/edit functionality
  const { profileId } = useParams();
  const [updateForm, setUpdateForm] = useState(false); // Determines if the form is in update mode

  // Access profiles from the Redux store
  const { profiles } = useSelector(profileSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a profileId exists, indicating update mode
    if (profileId) {
      setUpdateForm(true);

      const index = profiles.findIndex((profile) => profile.id === profileId);
      if (index !== -1) {
        // Populate state variables with existing profile data
        setId(profiles[index].id);
        setName(profiles[index].name);
        setAge(profiles[index].age);
        setGender(profiles[index].gender);
        setEmail(profiles[index].email);
        setContact(profiles[index].contact);
        setDob(profiles[index].dob);
        setStatus(profiles[index].status);
        setLocation(profiles[index].location);
        setLatitude(profiles[index].latitude);
        setLongitude(profiles[index].longitude);
        setProfileImg(profiles[index].profileImg);
        setDescription(profiles[index].description);
        setHobbies(profiles[index].hobbies);
        setAchievements(profiles[index].achievements);
      }
    }
  }, [profileId, profiles]); // Dependencies ensure this runs when profileId or profiles change

  // Handles adding a new profile to the database
  const handleSubmit = async () => {
    try {
      const profileData = {
        name,
        age,
        gender,
        email,
        contact,
        dob,
        status,
        location,
        latitude,
        longitude,
        profileImg,
        description,
        hobbies,
        achievements,
      };
      await dispatch(asyncAddProfileToDB(profileData)); // Dispatch add profile action
      console.log("Data Added.");
      toast.success("Profile added successfully!");
      navigate("/profiles"); // Navigate to profiles page after successful addition
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Handles editing an existing profile
  const handleEditProfileData = async () => {
    try {
      const profileData = {
        id,
        name,
        age,
        gender,
        email,
        contact,
        dob,
        status,
        location,
        latitude,
        longitude,
        profileImg,
        description,
        hobbies,
        achievements,
      };
      await dispatch(asyncEditProfileData(profileData)); // Dispatch edit profile action
      console.log("Data Edited.");
      toast.success("Profile updated successfully!");
      navigate("/profiles"); // Navigate to profiles page after successful edit
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Clears input fields in the form
  const clearInput = () => {
    setName("");
    setAge(0);
    setEmail("");
    setContact(0);
    setDob(0);
    setStatus("");
    setLocation("");
    setLatitude(0);
    setLongitude(0);
    setProfileImg(
      "https://i.pinimg.com/736x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
    );
    setDescription("");
    setHobbies("");
    setAchievements("");
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-heading">
        {updateForm ? "Update" : "Add new"} profile
      </h2>
      <hr />
      {/* Form to add or update a profile */}
      <form
        className="form-container"
        onSubmit={
          updateForm
            ? (e) => {
                e.preventDefault();
                handleEditProfileData();
              }
            : (e) => {
                e.preventDefault();
                handleSubmit();
              }
        }
      >
        {/* Input for Name */}
        <div className="form-field-wrapper">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Input for Age and Email */}
        <div className="form-field-wrapper">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Input for Contact Number and Date of Birth */}
        <div className="form-field-wrapper">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            placeholder="Enter your contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        {/* Input for Marital Status and Gender */}
        <div className="form-field-wrapper">
          <label htmlFor="marital-status">Marital Status</label>
          <select
            id="marital-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Nan">Select your status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>

          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="Nan">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Input for Location Details */}
        <div className="form-field-wrapper">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Enter your current location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            id="latitude"
            placeholder="Enter location's latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />

          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            id="longitude"
            placeholder="Enter location's longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>

        {/* Input for Profile Image */}
        <div className="form-field-wrapper">
          <label htmlFor="profile-img">Profile Image</label>
          <input
            type="url"
            id="profile-img"
            placeholder="Enter your profile image url"
            onChange={(e) => setProfileImg(e.target.value)}
          />
        </div>

        {/* Input for Description */}
        <div className="form-field-wrapper description-wrapper">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="3"
            placeholder="Describe candidate in a few sentences"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Input for Hobbies */}
        <div className="form-field-wrapper">
          <label htmlFor="hobbies">Hobbies</label>
          <input
            type="text"
            id="hobbies"
            placeholder="Enter your hobbies (comma-separated)"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            required
          />
        </div>

        {/* Input for Achievements */}
        <div className="form-field-wrapper achievements-wrapper">
          <label htmlFor="achievements">Achievements</label>
          <textarea
            id="achievements"
            rows="3"
            placeholder="List your achievements (if any)"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Form Action Buttons */}
        <div className="btn-wrapper">
          <button type="submit" className="btn add-btn">
            {updateForm ? "Update Profile" : "Add Profile"}
          </button>
          <button type="reset" className="btn reset-btn" onClick={clearInput}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default Details;
