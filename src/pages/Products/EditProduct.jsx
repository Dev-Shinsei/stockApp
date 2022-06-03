import React, { useEffect } from "react";
import "./EditProduct.scss";
import api from "../../services/api";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const validationProduct = yup.object().shape({
  name: yup
    .string()
    .required("O Campo Nome do Produto precisa ser preenchido")
    .max(20, "O Nome não pode ter mais que 20 caracteres"),
  price: yup
    .number()
    .required("O Campo Preço precisa ser preenchido")
    .positive()
    .integer()
    .typeError("O Campo Preço precisa ser preenchido"),
  amount: yup
    .number()
    .required()
    .positive()
    .integer()
    .typeError("O Campo Quantidade precisa ser preenchido"),
});

const EditProduct = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationProduct),
  });

  useEffect(() => {
    api.get(`/select/product/${id}`).then((res) => {
      reset(res.data);
    });
  }, []);

  const updateProduct = (data) => {
    const payload = { ...data, id: id };
    api
      .put(`/edit/product/`, payload)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch(() => {
        console.log("Algo errado aqui");
      });
  };

  return (
    <div>
      <Header title="Editar Produto" />
      <main>
        <div className="card-product">
          <div className="line-product"></div>
          <div className="card-body-product">
            <form onSubmit={handleSubmit(updateProduct)}>
              <h1 className="title">Editar Produto</h1>
              <div className="fields">
                <label htmlFor="pname">Novo Nome</label>
                <input
                  id="pname"
                  type="text"
                  name="name"
                  {...register("name")}
                />
                <p className="error-message">{errors.name?.message}</p>
              </div>

              <div className="fields">
                <label htmlFor="pprice">Novo Preço</label>
                <input
                  id="pprice"
                  type="number"
                  name="price"
                  {...register("price")}
                />
                <p className="error-message">{errors.price?.message}</p>
              </div>

              <div className="fields">
                <label htmlFor="pamount">Nova Quantidade</label>
                <input
                  id="pamount"
                  type="number"
                  name="amount"
                  {...register("amount")}
                />
                <p className="error-message">{errors.amount?.message}</p>
              </div>

              <div>
                <button id="btn-submit" type="submit">
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProduct;
