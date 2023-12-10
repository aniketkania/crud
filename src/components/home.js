import React, { Fragment, useEffect, useState } from 'react';
import users from './users'
import Modal from './model';
import axios from 'axios';

function Home() {
    const [isModalOpen, setModalOpen] = useState(false);

    
    const [arr,setarr]=useState([]);



    const fetchData = async () => {
        try {
          // Replace 'your-api-endpoint' with the actual API endpoint URL
          const response = await axios.get('https://localhost:7034/api/Student/ViewData');
          console.log(response);
          setarr(response.data.result)
        } catch (error) {
          console.log(error)
          alert("Something went wrong")
        }
      };

    useEffect(() => {
      
  
      fetchData(); // Call the fetchData function when the component mounts
  
      // Cleanup function
      return () => {
        // You can perform cleanup tasks here if needed
      };
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleDelete= async (id)=>{
        try {
            // Replace 'your-api-endpoint' with the actual API endpoint URL
            const response = await axios.post('https://localhost:7034/api/Student/Delete',{id});
            fetchData();
            console.log(response);
          } catch (error) {
            console.log(error)
            alert("Something went wrong")
          }
    }

    return (
        <Fragment>
            <div>
                <button onClick={openModal}>Open Modal</button>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2>This is a Modal</h2>
                    <p>Modal content goes here.</p>
                </Modal>
            </div>
            <div style={{ margin: "10rem" }}>
                <table stripped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Date of Birth
                            </th>
                            <th>
                                Hobbies
                            </th>
                            <th>
                                Gender
                            </th>
                            <th>
                                Age
                            </th>
                            <th>
                                Country
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arr && arr.length > 0
                                ?
                                arr.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                {item.email}
                                            </td>
                                            <td>
                                                {item.dob}
                                            </td>
                                            <td>
                                                {item.Hobbies}
                                            </td>
                                            <td>
                                                {item.gender}
                                            </td>
                                            <td>
                                                {item.age}
                                            </td>
                                            <td>
                                                {item.country}
                                            </td>
                                            <td>
                                                <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                "No data found."
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default Home;