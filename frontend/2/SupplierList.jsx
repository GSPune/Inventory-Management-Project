import React, { useEffect, useState } from 'react';
import './styles.css'; 
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        supplierId: '',
        companyName: '',
        phoneNumber: '',
        email: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'Name' && !(/^\d+$/.test(value))) {
            return; 
        }

        if (name === 'Mobile' && !(/^[789]\d*$/.test(value))) {
            return; 
        }

        setNewSupplier({
            ...newSupplier,
            [name]: value
        });
    };

    const handleAddSupplier = () => {
        if (newSupplier.Name.trim() !== '' && newSupplier.Company.trim() !== '' && newSupplier.Mobile.trim() !== '' && newSupplier.Email.trim() !== '') {
            axios.post('http://192.168.43.25:8000/v1/suppliers/add/', newSupplier)
                .then(response => {
                    setSuppliers([...suppliers, response.data]);
                    setNewSupplier({
                        Name: '',
                        Company: '',
                        Mobile: '',
                        Email: ''
                    });
                    setShowPopup(false);
                })
                .catch(error => {
                    console.error('Error adding supplier:', error);
                });
        }
    };

    const handleDeleteSupplier = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this supplier data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://192.168.43.25:8000/v1/suppliers/delete/${suppliers[index].supplierId}`)
                    .then(response => {
                        const updatedSuppliers = [...suppliers];
                        updatedSuppliers.splice(index, 1);
                        setSuppliers(updatedSuppliers);
                        Swal.fire(
                            'Deleted!',
                            'Supplier has been deleted successfully.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting supplier:', error);
                        Swal.fire(
                            'Error',
                            'Failed to delete supplier.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Supplier deletion has been cancelled.',
                    'error'
                );
            }
        });
    };

    const handleUpdateSupplier = (index) => {
        setNewSupplier(suppliers[index]);
        setEditingIndex(index);
        setShowPopup(true);
    };

    const handleUpdate = () => {
        axios.put(`http://192.168.43.25:8000/v1/suppliers/update/${suppliers[editingIndex].supplierId}`, newSupplier)
            .then(response => {
                const updatedSuppliers = [...suppliers];
                updatedSuppliers[editingIndex] = newSupplier;
                setSuppliers(updatedSuppliers);
                setEditingIndex(null);
                setShowPopup(false);
                Swal.fire({
                    title: "Good job!",
                    text: "Supplier updated successfully",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('Error updating supplier:', error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to update supplier",
                    icon: "error"
                });
            });
    };

    const handleSearchSupplier = () => {
        const foundSupplier = suppliers.find(supplier => supplier.companyName.toLowerCase() === searchQuery.toLowerCase());
        if (foundSupplier) {
            setSearchResult(`Supplier "${searchQuery}" is available in the supplier list.`);
        } else {
            setSearchResult(`Supplier "${searchQuery}" is not found in the supplier list.`);
        }
    };

    useEffect(() => {
        console.log("Fetching data...");
        axios.get('http://192.168.43.25:8000/v1/suppliers/list/') // Fetch data using Axios
            .then(response => {
                console.log("Data fetched:", response.data);
                if(Array.isArray(response.data)) {
                    setSuppliers(response.data.map((supplier, index) => ({
                        supplierId: supplier.id,
                        companyName: supplier.Company,
                        email: supplier.Email,
                        Mobile: supplier.Mobile,
                        Name:supplier.Name
                    })));
                } else {
                    console.error('Invalid data format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
                        <button type="button" className="search-button" onClick={handleSearchSupplier}>
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
                <button onClick={() => setShowPopup(true)} className="add-customer-btn">Add Supplier</button>
            </div>

            {/* Popup Form */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>{editingIndex !== null ? 'Update Supplier' : 'Add Supplier'}</h2>
                        <input
                            className='customer-name'
                            type="text"
                            name="Name"
                            value={newSupplier.Name}
                            onChange={handleInputChange}
                            placeholder="Name "
                        />
                        <input
                            className='phone-number'
                            type="text"
                            name="companyName"
                            value={newSupplier.companyName}
                            onChange={handleInputChange}
                            placeholder="Company Name "
                        />
                        <input
                            className='phone-number'
                            type="tel"
                            name="phoneNumber"
                            value={newSupplier.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                        />
                        <input
                            className='phone-number'
                            type="email" // Change type to email
                            name="email"
                            value={newSupplier.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        <div>
                            <button onClick={editingIndex !== null ? handleUpdate : handleAddSupplier}>
                                {editingIndex !== null ? 'Update' : 'Add'}
                            </button>
                        </div>
                        <button onClick={() => { setEditingIndex(null); setShowPopup(false); }}>
                            {editingIndex !== null ? 'Cancel' : 'Close'}
                        </button>
                    </div>
                </div>
            )}

            {/* Supplier List */}
            <div className='border-box'>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Supplier ID</th>
                            <th>Supplier Name</th>
                            <th>Company Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{supplier.Name}</td>
                                <td>{supplier.companyName}</td>
                                <td>{supplier.Mobile}</td>
                                <td>{supplier.email}</td>

                                <td>
                                    <button1 onClick={() => handleUpdateSupplier(index)}>Update</button1>
                                    <button2 onClick={() => handleDeleteSupplier(index)}>Delete</button2>
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

export default SupplierList;
