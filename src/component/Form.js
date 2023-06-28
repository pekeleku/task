import React from "react";
import { useEffect, useState } from "react";
import View from "./View";
import { uid } from "uid";
import Input from "./Input";

export default function Form() {
  const [products, setProduct] = useState([
    // {
    //   id: 12323,
    //   // fotoBarang: ""
    //   namaBarang: "gelang",
    //   hargaBeli: 20000,
    //   hargaJual: 50000,
    //   stock: 4,
    // },
  ]);
  const [image, setImage] = useState(null);

  const [isUpdate, setIsUpadate] = useState({ id: null, status: false });
  const [formData, setFormData] = useState({
    namaBarang: "",
    hargaBeli: 0,
    hargaJual: 0,
    stock: 0,
  });
  // useEffect(() => {
  //   const s = JSON.parse(localStorage.getItem("products"));
  //   setProduct(s);
  //   console.log(s);
  // }, []);
  const handleImage = (e) => {
    let file = e.target.files[0];
    console.log(file);
    if (file.size > 100000) {
      alert("file gambar harus maksimal 100 kb");
    }
    setImage(URL.createObjectURL(file));
  };
  const handleCange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = [...products];
    // if (
    //   formData.namaBarang === "" ||
    //   formData.hargaBeli === 0 ||
    //   formData.hargaJual === 0 ||
    //   formData.stock === 0 ||
    //   image === null
    // ) {
    //   alert("harus mengisi semua form ");
    //   return false;
    // }
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
    // localStorage.setItem("products", JSON.stringify(data));

    setProduct(data);

    setFormData({ namaBarang: "", hargaBeli: 0, hargaJual: 0, stock: 0 });
    setIsUpadate({ id: null, status: false });
    setImage(null);
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
              id="fotoBarang"
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
              onChange={handleCange}
              id="namaBarang"
              value={formData.namaBarang}
            />
          </div>
          <div className="mb-3">
            <Input
              label={"Harga Beli"}
              type="number"
              className="form-control"
              id="hargaBeli"
              value={formData.hargaBeli}
              name="hargaBeli"
              onChange={handleCange}
            />
          </div>
          <div className="mb-3">
            <Input
              label={"Harga Jual"}
              type="number"
              className="form-control"
              id="hargajual"
              value={formData.hargaJual}
              name="hargaJual"
              onChange={handleCange}
            />
          </div>
          <div className="mb-3">
            <Input
              label={"Stock"}
              type="number"
              className="form-control"
              id="stock"
              value={formData.stock}
              name="stock"
              onChange={handleCange}
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
