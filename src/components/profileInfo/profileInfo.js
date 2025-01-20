import MapComponent from "../mapComponent/mapComponent";
import "./profileInfoStyle.css";

// ProfileInfo component to display detailed information about a profile
function ProfileInfo({ profile, setProfileInfo }) {
  return (
    <div className="info-container">
      <div className="profile-card">
        {/* Container for profile information */}
        <div className="profileInfo-info-container">
          {/* Header section with profile image and brief intro */}
          <div className="profileInfo-info-header">
            <div className="profileInfo-img">
              <img src={profile.profileImg} alt={profile.name} />
            </div>
            <div className="short-intro">
              <h3>{profile.name}</h3>
              <p>{profile.description}</p>
            </div>
          </div>

          {/* Main section for detailed profile information */}
          <div className="profileInfo-info-main">
            <ul>
              <li>
                <b>Age :</b> {profile.age}
              </li>
              <li>
                <b>Gender :</b> {profile.gender}
              </li>
              <li>
                <b>Date of Birth :</b> {profile.dob}
              </li>
              <li>
                <b>Marial Status :</b> {profile.status}
              </li>
              <li>
                <b>Location :</b> {profile.location}
              </li>
              <li>
                <b>Contact Number :</b> {profile.contact}
              </li>
              <li>
                <b>Email :</b> {profile.email}
              </li>
              <li>
                <b>Hobbies :</b> {profile.hobbies}
              </li>
              <li>
                <b>Achievements :</b> {profile.achievements}
              </li>
            </ul>
          </div>
        </div>

        {/* Wrapper for displaying the map */}
        <div className="profileInfo-map-wrapper">
          <MapComponent
            lat={Number(profile.latitude)}
            lng={Number(profile.longitude)}
            height={"475px"}
          />
        </div>

        {/* Cross icon to close the profile info */}
        <img
          className="cross-logo-img"
          src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png"
          alt="Cross Logo / Go Back Logo"
          onClick={() => setProfileInfo(false)}
        />
      </div>
    </div>
  );
}

export default ProfileInfo;
