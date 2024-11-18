import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../endpoints/Endpoints";
import { useState } from "react";

const CreateBranch = () => {
  const [formValue, setFormValue] = useState({
    branchName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (event) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/login";
      return;
    }

    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
        authentication: accessToken,
      },
    });

    const response = await instance.post(
      ENDPOINTS.POST.MANAGER.CREATE_POST_OFFICE,
      formValue
    );

    if (response.data?.branchId) {
      alert("Branch created!");
      setFormValue({
        branchName: "",
        email: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Branch Name</label>
            <input
              type="text"
              value={formValue.branchName}
              onChange={handleInputChange}
              required
              name="branchName"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={formValue.email}
              onChange={handleInputChange}
              required
              name="email"
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              value={formValue.phoneNumber}
              onChange={handleInputChange}
              required
              name="phoneNumber"
            />
          </div>
          <div>
            <label>Street</label>
            <input
              type="text"
              value={formValue.street}
              onChange={handleInputChange}
              required
              name="street"
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              value={formValue.city}
              onChange={handleInputChange}
              required
              name="city"
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              value={formValue.state}
              onChange={handleInputChange}
              required
              name="state"
            />
          </div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              value={formValue.zipCode}
              onChange={handleInputChange}
              required
              name="zipCode"
            />
          </div>
          <button type="submit">Create Post Office</button>
        </form>
      </div>
    </>
  );
};

export default CreateBranch;
