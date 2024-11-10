import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../endpoints/Endpoints';

const UpdateProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                firstName,
                lastName,
                phoneNumber,
                street,
                city,
                state,
                zipcode,
            };

            const accessToken = localStorage.getItem("accessToken");
            const instance = axios.create({
                baseURL: BASE_URL,
                headers: {
                    "Content-Type": "application/json",
                    authentication: accessToken
                },
            });

            await instance.put('employee/update-profile', payload);
            alert("Profile Updated Successfully");
            navigate('/employee-dashboard');
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="zipcode">Zip Code</label>
                    <input
                        type="text"
                        id="zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
