import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/employee/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data?.data);
      });
  }, [id]);
  return (
    <>
      <div className="profile-main">
        <div className="profile-wrapper">
          <div className="profile-head">
            <h1>Profile!</h1>
            <p>Details of employee profile.</p>
          </div>
          <div className="profile-content">
            <div className="avatar">
              <img src={`http://localhost:5000${profileData.avatar}`} />
            </div>
            <div>
              <h1>About Me</h1>
              <p>
                {profileData.firstName} is a dedicated and talented professional
                with a strong work ethic and a passion for web development. With
                5 years of experience, he has consistently demonstrated his
                expertise in web development. Known for their excellent
                communication skills, problem-solving abilities, and commitment
                to teamwork, {profileData.firstName} is an asset to any team and
                continues to contribute significantly to the success of the
                organization.
              </p>
            </div>
            <div>
              <h1>Details</h1>
              <div>
                <p style={{ margin: 0 }}>
                  <strong>Name:</strong>
                </p>
                <p>
                  {profileData.firstName} {profileData.lastName}
                </p>
              </div>
              <div>
                <p style={{ margin: 0 }}>
                  <strong>Email:</strong>
                </p>
                <p>{profileData.officeEmail}</p>
              </div>
              <div>
                <p style={{ margin: 0 }}>
                  <strong>Mobile:</strong>
                </p>
                <p>0{profileData.primaryMobNumber}</p>
              </div>
              <div>
                <p style={{ margin: 0 }}>
                  <strong>Address:</strong>
                </p>
                <p>{profileData.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
