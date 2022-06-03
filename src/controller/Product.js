import { openDb } from "../configDB.js";

export async function createTable() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER, amount INTEGER)"
    );
  });
}

export async function selectProducts(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM product").then((products) => res.json(products));
  });
}
export async function selectProduct(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    return db
      .get("SELECT * FROM product WHERE id=?", [id])
      .then((product) => res.json(product));
  });
}

export async function insertProduct(req, res) {
  let product = req.body;
  openDb().then((db) => {
    db.run("INSERT INTO product ( name, price, amount) VALUES (?, ?, ?)", [
      product.name,
      product.price,
      product.amount,
    ]);
    res.json({
      statusCode: 200,
    });
  });
}

export async function updateProduct(req, res) {
  const product = req.body;
  openDb().then((db) => {
    db.run("UPDATE product SET name=?, price=?, amount=? WHERE id=?", [
      product.name,
      product.price,
      product.amount,
      product.id,
    ]);
    return res.json({
      statusCode: 200,
    });
  });
}

export async function deleteProduct(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get("DELETE FROM product WHERE id=?", [id]).then((res) => res);
  });
  res.json({
    statusCode: 200,
  });
}
