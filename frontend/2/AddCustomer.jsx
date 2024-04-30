import React, { useState, useEffect } from 'react';
import './styles.css'; 
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function AddCustomer() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        Name: '',
        Mobile: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');

    useEffect(() => {
        axios.get('http://192.168.43.25:8000/v1/customers/list/')
            .then(response => {
                console.log("Data fetched:", response.data);
                if(Array.isArray(response.data)) {
                    const updatedCustomers = response.data.map((customer, index) => ({
                        id: customer.id || index, // Use API id if available, otherwise use index
                        Name: customer.Name,
                        Mobile: customer.Mobile,
                    }));
                    setCustomers(updatedCustomers);
                } else {
                    console.error('Invalid data format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Name') {
            const validatedValue = value.replace(/[^A-Za-z\s]/g, '');
            setNewCustomer({
                ...newCustomer,
                [name]: validatedValue
            });
        } else if (name === 'Mobile') {
            const validatedValue = value.replace(/[^\d]/g, '');
            const finalValue = validatedValue.replace(/^[^789]/, ''); 
            setNewCustomer({
                ...newCustomer,
                [name]: finalValue
            });
        }
    };

    const postData = async (data) => {
        try {
            const response = await axios.post('http://192.168.43.25:8000/v1/customers/add/', data);
            console.log('Data sent successfully:', response.data);
            
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleAddCustomer = () => {
        if (newCustomer.Name.trim() !== '' && newCustomer.Mobile.trim() !== '') {
            const updatedCustomers = [...customers, newCustomer];
            setCustomers(updatedCustomers);
            setNewCustomer({
                Name: '',
                Mobile: ''
            });
            setShowPopup(false);

            // Call postData function to send data to the backend
            postData(newCustomer);
        }
    };
    
    const handleDeleteCustomer = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this customer data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const customerId = customers[index].id;
               // axios.delete(`http://192.168.43.25:8000/v1/customers/delete/`)
                axios.delete(`http://192.168.43.25:8000/v1/customers/delete/`, {
                    data: {
                        id: customerId
                    }
                })

                    .then(response => {
                        const updatedCustomers = [...customers];
                        updatedCustomers.splice(index, 1);
                        setCustomers(updatedCustomers);
                        Swal.fire(
                            'Deleted!',
                            'Customer has been deleted successfully.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting customer:', error);
                        Swal.fire(
                            'Error',
                            'Failed to delete customer.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Customer deletion has been cancelled.',
                    'error'
                );
            }
        });
    };
    
    
    const handleUpdateCustomer = (index) => {
        setNewCustomer(customers[index]);
        setEditingIndex(index);
        setShowPopup(true);
    };
    
    const handleUpdate = () => {
       axios.put(`http://192.168.43.25:8000/v1/customers/update/`, newCustomer)
            .then(response => {
                const updatedCustomers = [...customers];
                updatedCustomers[editingIndex] = newCustomer;
                setCustomers(updatedCustomers);
                setEditingIndex(null);
                setShowPopup(false);
                Swal.fire({
                    title: "Customer updated successfully",
                    text: "Good Job",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('Error updating customer:', error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to update customer",
                    icon: "error"
                });
            });
    };

    const handleSearchCustomer = () => {
        const foundCustomer = customers.find(customer => customer.Name.toLowerCase() === searchQuery.toLowerCase());
        if (foundCustomer) {
            setSearchResult(`Customer "${searchQuery}" is available in the customer list.`);
        } else {
            setSearchResult(`Customer "${searchQuery}" is not found in the customer list.`);
        }
    };

    return (
        <div className="body">
            <div className="header">
                <div className="form">
                    <form className="search-form">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="button" className="search-button" onClick={handleSearchCustomer}>
                            <i className="fas fa-search search-icon"></i>
                        </button>
                    </form>
                </div>
                <div className="user-info">
                    <FontAwesomeIcon icon={faUser} /> 
                    <span>Admin</span>
                </div>
            </div>
            <div className="addbtn">
                <button onClick={() => setShowPopup(true)} className="add-customer-btn">Add Customer</button>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>{editingIndex !== null ? 'Update Customer' : 'Add Customer'}</h2>
                        <input
                            className='customer-name'
                            type="text"
                            name="Name"
                            value={newCustomer.Name}
                            onChange={handleInputChange}
                            placeholder="Customer Name"
                        />
                        <input
                            className='phone-number'
                            type="tel"
                            name="Mobile"
                            value={newCustomer.Mobile}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            maxLength={10} 
                        />
                        <div><button onClick={editingIndex !== null ? handleUpdate : handleAddCustomer}>{editingIndex !== null ? 'Update' : 'Add'}</button></div>
                        <button onClick={() => { setEditingIndex(null); setShowPopup(false); }}>{editingIndex !== null ? 'Cancel' : 'Close'}</button>
                    </div>
                </div>
            )}

            <div className='border-box'>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id}>
                                <td>{index + 1}</td>
                                <td>{customer.Name}</td>
                                <td>{customer.Mobile}</td>
                                <td>
                                    <button1 onClick={() => handleUpdateCustomer(index)}>Update</button1>
                                    <button2 onClick={() => handleDeleteCustomer(index)}>Delete</button2>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {searchResult && (
                <div className="search-result">
                    {searchResult}
                </div>
            )}
        </div>
    );
}

export default AddCustomer;
