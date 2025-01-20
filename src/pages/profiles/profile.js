import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "react-spinner-material";
import { toast } from "react-toastify";

import "./profileStyle.css";
import { authSelector } from "../../redux/reducers/authReducer";
import MapComponent from "../../components/mapComponent/mapComponent";
import {
  asyncDeleteProfileData,
  asyncGetProfileDataFromDB,
  profileActions,
  profileSelector,
} from "../../redux/reducers/profileReducer";
import ProfileInfo from "../../components/profileInfo/profileInfo";

function Profiles() {
  // States to manage
  const [visibleMapId, setVisibleMapId] = useState(null);
  const [profileData, setProfileData] = useState("");
  const [profileInfo, setProfileInfo] = useState(false);
  const { isLoggedIn } = useSelector(authSelector);
  const { isLoading, filterProfiles } = useSelector(profileSelector);

  const dispatch = useDispatch(); // Dispatch Redux actions
  const navigate = useNavigate(); // Navigation for routing

  // Fetch profiles from the database when the component mounts or when `filterProfiles` changes
  useEffect(() => {
    dispatch(asyncGetProfileDataFromDB());
  }, [dispatch]);

  // Toggle the visibility of the map for a specific profile
  const toggleMap = (id) => {
    setVisibleMapId((prevId) => (prevId === id ? null : id));
  };

  // Navigate to the edit profile page for a specific profile
  const handleEditButton = (id) => {
    try {
      navigate(`/editProfile/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // Dispatch an action to delete a specific profile
  const handleDeleteButton = async (id) => {
    try {
      await dispatch(asyncDeleteProfileData(id));
      toast.success("Profile deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Handle the search input and update the filter term in the Redux store
  const handleSearch = (searchTerm) => {
    try {
      dispatch(profileActions.setSearchTerm(searchTerm));
      dispatch(profileActions.setFilterSearch());
    } catch (error) {
      console.log(error);
    }
  };

  // Show a spinner if no profiles are available
  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
      </div>
    );
  }

  // Show detailed profile information if profileInfo is true
  if (profileInfo) {
    return (
      <ProfileInfo profile={profileData} setProfileInfo={setProfileInfo} />
    );
  }

  return (
    <div className="profile-container">
      {/* Search box for filtering profiles */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Seacrh by name"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Grid layout to display profiles */}
      <div className="grid">
        {filterProfiles.length ? (
          filterProfiles.map((profile) => (
            <div className="profile" key={profile.id}>
              {/* Profile image */}
              <div className="profile-img">
                <img src={profile.profileImg} alt={profile.name} />
              </div>

              {/* Profile details */}
              <div className="profile-details">
                <div className="profile-header">
                  <h3>{profile.name}</h3>

                  {/* Edit and Delete buttons (visible if logged in) */}
                  {isLoggedIn && (
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1160/1160515.png"
                        alt="Edit Logo"
                        className="profile-logo-img"
                        onClick={() => handleEditButton(profile.id)}
                      />
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1214/1214926.png"
                        alt="Delete Logo"
                        className="profile-logo-img"
                        onClick={() => handleDeleteButton(profile.id)}
                      />
                    </div>
                  )}
                </div>

                <p>{profile.description}</p>

                {/* Buttons to toggle map and view details */}
                <div className="profile-btn-wrapper">
                  <button
                    className="summary-btn"
                    onClick={() => toggleMap(profile.id)}
                  >
                    {visibleMapId === profile.id ? "Hide Map" : "Summary"}
                  </button>
                  <button
                    className="details-btn"
                    onClick={() => {
                      setProfileInfo(true);
                      setProfileData(profile);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Map component (visible if toggled) */}
              {visibleMapId === profile.id && (
                <div className="map-wrapper">
                  <MapComponent
                    lat={Number(profile.latitude)}
                    lng={Number(profile.longitude)}
                    height={"250px"}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          // Message if no profiles are available
          <p className="no-data-container">
            No profile is available at the moment. Contact the admin for more
            information.
          </p>
        )}
      </div>
    </div>
  );
}

export default Profiles;
