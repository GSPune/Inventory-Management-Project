import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; 
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function AddCustomer() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        phoneNumber: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        
        if (name === 'name') {
            
            const validatedValue = value.replace(/[^A-Za-z\s]/g, '');
            setNewCustomer({
                ...newCustomer,
                [name]: validatedValue
            });
        } else if (name === 'phoneNumber') {
            
            const validatedValue = value.replace(/[^\d]/g, '');
            const finalValue = validatedValue.replace(/^[^789]/, ''); 
            setNewCustomer({
                ...newCustomer,
                [name]: finalValue
            });
        }
    };

    const handleAddCustomer = () => {
        if (newCustomer.name.trim() !== '' && newCustomer.phoneNumber.trim() !== '') {
            axios.post('http://192.168.129.25:8000/v1/customers/add/', newCustomer)
                .then(response => {
                    setCustomers([...customers, response.data]);
                    setNewCustomer({
                        name: '',
                        phoneNumber: ''
                    });
                    setShowPopup(false);
                })
                .catch(error => {
                    console.error('Error adding customer:', error);
                });
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
                axios.delete(`your-api-url/${customers[index].id}`)
                    .then(() => {
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
        axios.put(`http://192.168.129.25:8000/v1/customers/add/${customers[editingIndex].id}`, newCustomer)
            .then(response => {
                const updatedCustomers = [...customers];
                updatedCustomers[editingIndex] = response.data;
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
            });
    };
    

    const handleSearchCustomer = () => {
        const foundCustomer = customers.find(customer => customer.name.toLowerCase() === searchQuery.toLowerCase());
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

            {/* Popup Form */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>{editingIndex !== null ? 'Update Customer' : 'Add Customer'}</h2>
                        <input
                            className='customer-name'
                            type="text"
                            name="name"
                            value={newCustomer.name}
                            onChange={handleInputChange}
                            placeholder="Customer Name"
                        />
                        <input
                            className='phone-number'
                            type="tel"
                            name="phoneNumber"
                            value={newCustomer.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            maxLength={10} 
                            
                        />
                        <div><button onClick={editingIndex !== null ? handleUpdate : handleAddCustomer}>{editingIndex !== null ? 'Update' : 'Add'}</button></div>
                        <button onClick={() => { setEditingIndex(null); setShowPopup(false); }}>{editingIndex !== null ? 'Cancel' : 'Close'}</button>
                    </div>
                </div>
            )}

            {/* Customer List */}
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
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>
                                    <button1 onClick={() => handleUpdateCustomer(index)}>Update</button1>
                                    <button2 onClick={() => handleDeleteCustomer(index)}>Delete</button2>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Search Result */}
            {searchResult && (
                <div className="search-result">
                    {searchResult}
                </div>
            )}
        </div>
    );
}

export default AddCustomer;
