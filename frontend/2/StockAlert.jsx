import React, { useState, useEffect } from 'react';
import './styles.css'; // External CSS 
// import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function StockAlert() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [selectedStockStatus, setSelectedStockStatus] = useState('');

    useEffect(() => {
        // Fetch initial data when the component mounts
        fetchProducts(''); // Fetch all products initially
    }, []);

    const fetchProducts = (stockStatus) => {
        let apiUrl = '';
        switch (stockStatus) {
            case 'Out of stock':
                apiUrl = 'http://192.168.75.25:8000/v1/products/alerts/out';
                break;
            case 'Expired stock':
                apiUrl = 'http://192.168.75.25:8000/v1/products/alerts/expired';
                break;
            case 'Low stock':
                apiUrl = 'http://192.168.75.25:8000/v1/products/alerts/low';
                break;
            // default:
            //     apiUrl = 'http://192.168.219.25:8000/v1/customers/list/'; // Default API endpoint
        }

        axios.get(apiUrl)
            .then(response => {
                console.log("Data fetched:", response.data); // Check fetched data in console
                if (Array.isArray(response.data)) {
                    setProducts(response.data.map((product, index) => ({
                        productId: product.id,
                        productName: product.Product_name,
                        quantity: product.Quantity,
                        price: product.Product_price,
                        stockStatus: product.stockStatus,
                    })));
                } else {
                    console.error('Invalid data format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error); // Log any errors
            });
    };

    const handleSearchProduct = () => {
        const foundProduct = products.find(product => product.productName.toLowerCase() === searchQuery.toLowerCase());
        if (foundProduct) {
            setSearchResult(`Product "${searchQuery}" is available in the product list.`);
        } else {
            setSearchResult(`Product "${searchQuery}" is not found in the product list.`);
        }
    };

    const handleStockStatusChange = (e) => {
        setSelectedStockStatus(e.target.value);
        fetchProducts(e.target.value); // Fetch products based on selected stock status
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
                        <button type="button" className="search-button" onClick={handleSearchProduct}>
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
                <select value={selectedStockStatus} onChange={handleStockStatusChange}>
                    <option value="">Select</option>
                    <option value="Out of stock">Out of stock</option>
                    <option value="Expired stock">Expired stock</option>
                    <option value="Low stock">Low stock</option>
                </select>
            </div>

            {/* Product List */}
            <div className='border-box'>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            {/* <th>Stock Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                {/* <td>{product.stockStatus}</td> */}
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

export default StockAlert;
