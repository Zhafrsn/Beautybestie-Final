import React from 'react';
import '../../../../styles/Admin/UserAdmin.css';

// Definisikan tipe prop untuk tabel
interface TableProps {
  headers: string[];
  data: any[]; // Sesuaikan dengan jenis data yang akan Anda tampilkan
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className='custom-table'>
      <thead>
        <tr>
          {/* Render header kolom */}
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Render data */}
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
