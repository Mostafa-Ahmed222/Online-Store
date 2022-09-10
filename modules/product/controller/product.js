/* 
Name : Mostafa Ahmed Mohamed Salah Eldin
Group : C38 Saturday 10Am Node.js
Assignment : 4 
*/
import sql from "../../../DB/connection.js";
export const addProduct = (req, res, next) => {
  const { name, price, description, devId } = req.body;
  sql.execute(
    `insert into products (name, price, description, devId) values ('${name}',
     ${price}, '${description}', ${devId})`,
    (err, result) => {
      if (err) {
        res.json({ message: "Query Error", err });
      } else {
        if (result.affectedRows) {
          res.json({ message: "Done", result });
        } else {
          res.json({ message: "invalid Data" });
        }
      }
    }
  );
};
export const allProducts = (req, res, next) => {
  sql.execute(
    `select d.id as D_id , p.id as P_ID , 
    d.userName , p.name , p.description , 
    p.price from products as p inner join developers as d on d.id = p.devid`,
    (err, result) => {
      if (err) {
        res.json({ message: "Query Error", err });
      } else {
        res.json({ message: "Done", result });
      }
    }
  );
};
export const getById = (req, res, next) => {
  const { id } = req.params;
  sql.execute(
    `select d.username, p.* from developers as d inner join products as p on 
     d.id = p.devid where d.id = ${id}`,
    (err, result) => {
      if (err) {
        res.json({ message: "Query Error", err });
      } else {
        res.json({ message: "Done", result });
      }
    }
  );
};
export const searchProductOfUser = (req, res, next) => {
  const { key } = req.query;
  const { id } = req.params;
  sql.execute(
    `select d.username, p.* from developers as d inner join products as p on 
  d.id = p.devid where d.id = ${id} and p.name like '${key}%'`,
    (err, result) => {
      if (err) {
        res.json({ message: "query error", err });
      } else {
        res.json({message : "Done", result})
      }
    }
  );
};
export const getProductById = (req, res, next) => {
  const { id } = req.params;
  sql.execute(`select * from products where id = ${id}`, (err, result) => {
    if (err) {
      res.json({ message: "Query Error", err });
    } else {
      res.json({ message: "Done", result });
    }
  });
};
export const deleteProduct = (req, res, next) => {
  const { id } = req.params;
  sql.execute(`delete from products where id = ${id}`, (err, result) => {
    if (err) {
      res.json({ message: "Query Error", err });
    } else {
      if (result.affectedRows) {
        res.json({ message: "Done", result });
      } else {
        res.json({ message: "invalid Data" });
      }
    }
  });
};
export const updateProduct = (req, res, next) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  sql.execute(
    `update products set name = '${name}', price = ${price},
     description = '${description}' where id = ${id}`,
    (err, result) => {
      if (err) {
        res.json({ message: "Query Error", err });
      } else {
        if (result.affectedRows) {
          res.json({ message: "Done", result });
        } else {
          res.json({ message: "invalid Data" });
        }
      }
    }
  );
};
