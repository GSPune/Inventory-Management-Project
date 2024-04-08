// Sidebar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faBox, faBell, faReceipt, faList, faFileAlt } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';



function Sidebar() {


 
  return (
   
    <div className="sidebar">
      {/* Main Logo */}
      <div className="sidebar-logo">
        <img className='imslogo'  alt="Logo" /><div className='name'>Inventory</div>
      </div>
      <div className="sidebar-item">
      <FontAwesomeIcon icon={faChartBar} />Dashboard
      </div>
      <div className="sidebar-item">
      <FontAwesomeIcon icon={faBox} />Inventory
        <div className="dropdown">
          <a href="#">Category</a>
          <a href="#">Products</a>
          
        </div>
      </div>
      <div className="sidebar-item">
      <Link to='/stock' >Stock Alert</Link>
      </div>
      <div className="sidebar-item">
      <FontAwesomeIcon icon={faReceipt} />
        Sales Bill
      </div>
      <div className="sidebar-item">
      <FontAwesomeIcon icon={faList} />
        Purchase Order

      </div>
      <div className="sidebar-item">
      <FontAwesomeIcon icon={faFileAlt} />
        Reports
      </div>
      <hr></hr>
      <div className="sidebar-item">
      <Link to='/customer' >Customer</Link>
      </div>
      <div className="sidebar-item">
      <Link to='/supplier' >Supplier</Link>
      </div>
      <div className="sidebar-item">
        Casshier
      </div>
    </div>
  
  );
}

export default Sidebar;
