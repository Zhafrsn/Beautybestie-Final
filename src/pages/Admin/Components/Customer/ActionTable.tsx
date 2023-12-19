import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../../../styles/Admin/CustomerAdmin.css';

const ActionTable: React.FC = () => {
    return (
         <div className='action-table__container'>
            <button className='action-table-del__container'>
                <FontAwesomeIcon icon={faTrash} className='del-icon'/>
                <p className='del-text'>Delete</p>
            </button>
        </div>
    )
}

export default ActionTable;