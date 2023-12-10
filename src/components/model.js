import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Modal = ({ isOpen, onClose, children }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        hobbies: [],
        gender: '',
        age: '',
        country: '',
      });

    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleHobbiesChange = (e) => {
        const { options } = e.target;
        const selectedHobbies = [];
        for (const option of options) {
          if (option.selected) {
            selectedHobbies.push(option.value);
          }
        }
        setFormData({ ...formData, hobbies: selectedHobbies });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Replace 'your-api-endpoint' with the actual API endpoint URL
            const response = await axios.post('https://localhost:7034/api/Student/InsertData', formData);
            console.log('Post request successful:', response.data);
            // You can handle the response data here
          } catch (error) {
            console.error('Error making post request:', error);
            // You can handle errors here
          }

        console.log(formData);
      };

  return (
    isOpen && (
      <div tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Hobbies:</label>
          <select
            multiple
            className="form-control"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleHobbiesChange}
          >
            <option value="reading">Reading</option>
            <option value="traveling">Traveling</option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div>
            <label className="mr-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              {' '}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              {' '}
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Country:</label>
          <select
            className="form-control"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          >
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
            </div>
            
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
