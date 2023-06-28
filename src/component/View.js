import React, { useEffect } from "react";

export default function View({ data, handleUpdate, handleDelete }) {
  // const data = localStorage.getItem("product");
  // const data = JSON.parse(getLocalForm);
  // const data = JSON.parse(localStorage.getItem("products"));
  // console.log(datas);
  // useEffect(() => {
  //   if (data === null) {
  //     return alert("ahahahh?");
  //   }
  // }, []);
  return (
    <table className="table container">
      <thead>
        <tr>
          <th scope="col">Nama Barang</th>
          <th scope="col">Harga Jual</th>
          <th scope="col">Harga Beli</th>
          <th scope="col">Stok</th>
          <th scope="col">image</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => {
          // console.log([i + 0]);
          return (
            <tr key={product.id} className="m-auto">
              <td>{product.namaBarang}</td>
              <td>{product.hargaBeli}</td>
              <td>{product.hargaJual}</td>
              <td>{product.stock}</td>
              <td>
                <img
                  src={product.image}
                  className=" "
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <button
                  onClick={() => handleUpdate(product.id)}
                  className="btn btn-sm btn-warning mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-sm btn-danger"
                >
                  Del
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
