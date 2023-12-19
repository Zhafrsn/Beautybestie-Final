import React, { useState, useEffect } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import '../../styles/Address.css';

interface Address {
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
}

const localStorageKey = 'addresses';

export const AddressComponent: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const storedAddresses = localStorage.getItem(localStorageKey);
    return storedAddresses ? JSON.parse(storedAddresses) : [];
  });

  const [primaryAddress, setPrimaryAddress] = useState<Address>(addresses[0]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    fullName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    region: '',
    postalCode: '',
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(addresses));
  }, [addresses]);

  const setAsPrimary = (address: Address) => {
    setPrimaryAddress(address);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddNewAddress = () => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    closeModal();
  };

  const handleDeleteAddress = (addressToDelete: Address) => {
    setAddresses((prevAddresses) => prevAddresses.filter((address) => address !== addressToDelete));
  };

  return (
    <div className="AddressComponent">
      <table>
        <thead>
          <tr>{/* ... your table header content ... */}</tr>
        </thead>
      </table>
      <div className="Address-Container">
        <div className="Address-TitleDanBtnNew">
          <h1>Address</h1>
          <button className="Address-BtnNewAddress" onClick={openModal}>
            + Add New Address
          </button>
        </div>
        {addresses.map((address) => (
          <AddressRow
            key={address.phoneNumber}
            address={address}
            isPrimary={address === primaryAddress}
            setAsPrimary={setAsPrimary}
            onDelete={() => handleDeleteAddress(address)}
          />
        ))}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="AddNewAddressModal">
          <h2>Add New Address</h2>
          <form className="Colummn">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={newAddress.fullName}
              onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
            />
  
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={newAddress.phoneNumber}
              onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
            />
  
            <label htmlFor="streetAddress">Street Address:</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={newAddress.streetAddress}
              onChange={(e) => setNewAddress({ ...newAddress, streetAddress: e.target.value })}
            />
  
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
  
            <label htmlFor="region">Region:</label>
            <input
              type="text"
              id="region"
              name="region"
              value={newAddress.region}
              onChange={(e) => setNewAddress({ ...newAddress, region: e.target.value })}
            />
  
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
            />
          </form>
        </div>
        <div className="BtnSUBCAN">
          <button type="button" onClick={handleAddNewAddress} className="submitBtn">
            Ok
          </button>
          <button onClick={closeModal} className="cancelBtn">
            Later
          </button>
        </div>
      </Modal>
    </div>
  );
};

interface AddressRowProps {
  address: Address;
  isPrimary: boolean;
  setAsPrimary: (address: Address) => void;
  onDelete: () => void;
}

const AddressRow: React.FC<AddressRowProps> = ({ address, isPrimary, setAsPrimary, onDelete }) => {
  return (
    <div className="Address-MenuAlamat1">
      <div className="Address-Alamat1">
        <div className="Address-NamaNomor">
          <p className="Address-FullName">{address.fullName}</p>
          <hr />
          <p className="Address-PhoneNumber">{address.phoneNumber}</p>
        </div>
        <p>
          {address.streetAddress} {address.city} {address.region} {address.postalCode}
        </p>
        <button className="Address-Primary" onClick={() => setAsPrimary(address)}>
          {isPrimary ? 'Primary' : 'Set as Primary'}
        </button>
      </div>
      <div className="Address-Icons">
        <FontAwesomeIcon icon={faEdit} className="Address-Icon" />
        <FontAwesomeIcon icon={faTrash} className="Address-Icon" onClick={onDelete} />
      </div>
    </div>
  );
};

export default AddressRow;