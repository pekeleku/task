import React from "react";
import { useState } from "react";
import View from "./View";
import { uid } from "uid";
import Input from "./Input";

export default function Form() {
  const [products, setProduct] = useState([]);
  const [image, setImage] = useState(null);

  const [isUpdate, setIsUpadate] = useState({ id: null, status: false });
  const [formData, setFormData] = useState({
    namaBarang: "",
    hargaBeli: 0,
    hargaJual: 0,
    stock: 0,
  });

  const handleImage = (e) => {
    let file = e.target.files[0];

    if (file.size > 100000) {
      return alert("file gambar  maksimal 100 kb");
    }
    setImage(URL.createObjectURL(file));
  };
  const handleChange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = [...products];
    // bug disisni
    if (formData.namaBarang === "") {
      return alert("harus mengisi semua form ");
    }
    if (isUpdate.status) {
      data.forEach((product) => {
        if (product.id === isUpdate.id) {
          product.namaBarang = formData.namaBarang;
          product.hargaBeli = formData.hargaBeli;
          product.hargaJual = formData.hargaJual;
          product.stock = formData.stock;
          product.image = image;
        }
      });
    } else {
      data.push({
        id: uid(),
        image,
        namaBarang: formData.namaBarang,
        hargaBeli: formData.hargaBeli,
        hargaJual: formData.hargaJual,
        stock: formData.stock,
      });
    }

    setProduct(data);

    setImage(null);
    setFormData({ namaBarang: "", hargaBeli: 0, hargaJual: 0, stock: 0 });
    setIsUpadate({ id: null, status: false });
  };
  const handleUpdate = (id) => {
    let data = [...products];

    let findData = data.find((product) => product.id === id);

    setFormData({
      namaBarang: findData.namaBarang,
      hargaBeli: findData.hargaBeli,
      hargaJual: findData.hargaJual,
      stock: findData.stock,
    });
    setIsUpadate({ id: id, status: true });
  };
  const handleDelete = (id) => {
    let data = [...products];
    let deleteData = data.filter((product) => product.id !== id);
    alert("apakah anda yakin ingin menghapus?");
    // localStorage.removeItem("products")[id];
    setProduct(deleteData);
  };

  return (
    <section className="d-flex justify-content-center flex-column mt-5">
      <div className="card container mb-5 " style={{ width: 18 + "rem" }}>
        <p className="mx-3 text-center">Silakan menginput data</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Input
              label={"FotoBarang"}
              type="file"
              className="form-control"
              name="image"
              onChange={handleImage}
              accept=".png, .jpg"
            />
          </div>
          <div className="mb-3">
            <Input
              label={"Nama Barang"}
              type="text"
              name="namaBarang"
              onChange={handleChange}
              value={formData.namaBarang}
            />
          </div>
          <div className="mb-3">
            <Input
              label={"Harga Beli"}
              type="number"
              className="form-control"
              value={formData.hargaBeli}
              name="hargaBeli"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <Input
              label={"Harga Jual"}
              type="number"
              className="form-control"
              value={formData.hargaJual}
              name="hargaJual"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <Input
              label={"Stock"}
              type="number"
              className="form-control"
              value={formData.stock}
              name="stock"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <View
        handleUpdate={handleUpdate}
        data={products}
        handleDelete={handleDelete}
      />
    </section>
  );
}
