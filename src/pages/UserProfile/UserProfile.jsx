import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import moment from "moment";
import LeftSidebar from "../../components/LeftSideBar/LeftSideBar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import Avatar from "../../components/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import "./UserProfile.css";

const UserProfile = () => {

    const { id } = useParams();
    const users = useSelector((state) => state.usersReducer);
    // console.log(users)
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const currentProfile = users.filter((user) => user._id === id)[0];
    // console.log(currentProfile);
    const currentUser = useSelector((state) => state.currentUserReducer);
    const [loginHistory, setLoginHistory] = useState([]);
    const [Switch, setSwitch] = useState(false);
    const [locationName, setlocationName] = useState("");
    useEffect(() => {
        const storedLoginHistory = localStorage.getItem("loginHistory");
        if (storedLoginHistory) {
            setLoginHistory(JSON.parse(storedLoginHistory));
        }
    }, []);
    // console.log(loginHistory);.
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not available.');
        }
    };

    useEffect(() => {
        const getlocation = async () => {
            try {
               if(userLocation?.lat){
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation?.lat}&lon=${userLocation?.lng}&appid=${API_KEY}&units=metric`);
                const data = await res.json();
                setlocationName(data?.name)
               }
            }
            catch (error) {
                // console.log(error);
            }
        }
        getlocation();

    }, [userLocation?.lat])

    return (
        <div className="home-container-1">
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px">
                                {
                                    currentProfile?.name.charAt(0).toUpperCase()
                                }
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result?._id === id &&
                            (<button onClick={() => setSwitch(true)} className="edit-profile-btn">
                                <FontAwesomeIcon icon={faPen} /> Edit Profile
                            </button>)
                        }
                    </div>
                    <div>
                        {
                            Switch ?
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} /> :
                                <ProfileBio currentProfile={currentProfile} />
                        }
                    </div>
                    <div>
                        <button
                            onClick={getUserLocation}
                            style={{
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                marginTop: '10px',
                                boxShadow : '2px 2px 4px black'
                            }}
                        >
                            Get My Location
                        </button>

                        {/* Display the user's location */}
                        
                        {userLocation.lat && userLocation.lng && (
                            <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
                                <h2>My Location:</h2>
                                {/* <p><strong>Latitude:</strong> {userLocation.lat}</p>
                                <p><strong>Longitude:</strong> {userLocation.lng}</p> */}
                                <p><strong>Location:</strong> {locationName}</p>
                                {/* You can also render the Google Maps here */}
                            </div>
                        )}

                    </div>
                    <div className="profile-bio-container">
                        {/* ... (other profile bio JSX) ... */}
                        <h2>Login History:</h2>
                        <ul style={{ listStyle: 'none', padding: '0' }}>
                            {loginHistory?.map((loginEvent, index) => (
                                <li key={index} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                                    <p style={{ margin: '0' }}>IP Address: {loginEvent.ipAddress}</p>
                                    <p style={{ margin: '0' }}>Browser: {loginEvent.browser}</p>
                                    <p style={{ margin: '0' }}>Operating System: {loginEvent.operatingSystem}</p>
                                    <p style={{ margin: '0' }}>Timestamp: {moment(loginEvent.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div >
        </div >
    );
}

export default UserProfile;
