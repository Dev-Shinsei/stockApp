import React from "react";
import "./AddProduct.scss";
import api from "../../services/api"
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
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

const AddProduct = () => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationProduct),
  });

  const addProduct = (data) =>
    api
      .post("/create/product", data)
      .then(() => {
        console.log("Deu tudo certo por aqui");
        navigate("/");
      })
      .catch(() => {
        console.log("Algo errado aqui");
      });

  return (
    <div>
      <Header title="Adicionar Produto" />
      <main>
        <div className="card-product">
          <div className="line-product"></div>
          <div className="card-body-product">
            <form onSubmit={handleSubmit(addProduct)}>
              <h1 className="title">Adicionar Produto</h1>
              <div className="fields">
                <label htmlFor="pname">Nome do Produto</label>
                <input
                  id="pname"
                  type="text"
                  placeholder="Adicione o nome do produto..."
                  name="name"
                  {...register("name")}
                />
                <p className="error-message">{errors.name?.message}</p>
              </div>

              <div className="fields">
                <label htmlFor="pprice">Preço</label>
                <input
                  id="pprice"
                  type="number"
                  placeholder="Adicione o preço..."
                  name="price"
                  {...register("price")}
                />
                <p className="error-message">{errors.price?.message}</p>
              </div>

              <div className="fields">
                <label htmlFor="pamount">Quantidade</label>
                <input
                  id="pamount"
                  type="number"
                  placeholder="Adicione a quantidade para estoque.."
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

export default AddProduct;
