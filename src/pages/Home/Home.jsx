import React, { useState, useEffect } from "react";
import "./styles.scss";
import api from "../../services/api";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Home = () => {
  const [product, setProduct] = useState([]);
  function getAllProducts() {
    api
    .get("/all/products")
    .then((res) => {
      setProduct(res.data);
    })
    .catch(() => {});
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  function deleteProduct(id) {
    api.delete(`/delete/product`, {data:{id:id}}).then(() => {
      getAllProducts();
    })
  }
  return (
    <div>
      <Header title="Estoque" />
      <main className="content">
        {product?.map((product, key) => {
          return (
            <Card key={key} sx={{ maxWidth: 365 }}>
              <CardContent>
                <div className="id">
                  <Typography variant="h2" color="text.primary">
                    ID:
                  </Typography>
                  <Typography id="product-id" variant="h3" color="#b71c1c">
                    {product.id}
                  </Typography>
                </div>
                <Typography variant="h2" color="text.primary">
                  Produto:
                </Typography>
                <Typography variant="h3" color="#b71c1c">
                  {product.name}
                </Typography>
                <Typography id="qntd" variant="h4" color="text.primary">
                  Quantidade em Estoque:
                </Typography>
                <Typography id="value" variant="h4" color="#b71c1c">
                  {product.amount}
                </Typography>
                <div className="btns">
                  <div className="btn-edit">
                    <Link to={{ pathname: `/edit/product/${product.id}` }}>
                      <button>Editar</button>
                    </Link>
                  </div>
                  <div className="btn-delete">
                    <button onClick={() => deleteProduct(product.id)}>
                      Deletar
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
