/* 
Name : Mostafa Ahmed Mohamed Salah Eldin
Group : C38 Saturday 10Am Node.js
Assignment : 4 
*/
import sql from "../../../DB/connection.js";

export const getuser = (req, res, next) => {
  res.json({ message: "hellow User" });
};
export const getAllUsers = (req, res, next) => {
  sql.query(`select * from developers`, (err, result) => {
    if (err) {
      res.json({ message: "Query Error", err });
    } else {
      res.json({ message: "Done", result });
    }
  });
};
export const addUsers = (req, res, next) => {
  const { name, password, email, age, phone } = req.body;
  sql.execute(
    `insert into developers (username, email, password, age, phone)
       values ('${name}', '${email}', '${password}', ${age}, '${phone}')`,
    (err, result, field) => {
      if (err) {
        res.json({ message: "Query Error", err });
      } else {
        if (result.affectedRows) {
          res.json({ message: "Done", result });
        } else {
          res.json({ message: "Not Found it" });
        }
      }
    }
  );
};

export const deleteUser = (req, res, next) => {
  const { id } = req.params;
  sql.execute(
    `delete from developers where id = ${id}`,
    (err, result, field) => {
      if (err) {
        res.json({ message: "Query Error", err });
      } else {
        if (result.affectedRows) {
          res.json({ message: "Done", result });
        } else {
          res.json({ message: "Not Found it" });
        }
      }
    }
  );
};
export const upateUser = (req, res, next) => {
  const { age, name, email, phone } = req.body;
  const { id } = req.params;
  sql.execute(
    `update developers set age = ${age},
     username = '${name}', email = '${email}', phone = '${phone}' where id = ${id}`,
    (err, result) => {
      if (err) {
        res.json({ message: "Query Error" }, err);
      } else {
        if (result.affectedRows) {
          res.json({ message: "done", result });
        } else {
          res.json({ message: "invalid account", result });
        }
      }
    }
  );
};
export const searchUser = (req, res, next) => {
  // console.log(req.query)
  const { searchKey } = req.query;
  sql.execute(
    `select * from developers where username like '%${searchKey}%'`,
    (err, result, field) => {
      if (err) {
        res.json({ message: "Query Error", err });
      } else {
        res.json({ message: "Done", result });
      }
    }
  );
};
export const softDelete = (req, res, next) => {
  const { id } = req.params;
  sql.execute(
    `update developers set deleteAt = null where id = ${id}`,
    (err, result, field) => {
      if (err) {
        res.json({ message: "Query Error", result });
      } else {
        if (result.affectedRows) {
          res.json({ message: "Done", result });
        } else {
          res.json({ message: "invalid account", result });
        }
      }
    }
  );
};

export const signin = (req, res, next) => {
  const { email, password } = req.body;
  sql.execute(
    `select * from developers where email = '${email}' and password = '${password}'`,
    (err, result) => {
      if (err) {
        res.json({ message: "Query Error", err });
      } else {
        if(result.length) {
          res.json({ message: "Done", result });
        } else {
          res.json({message : "Invalid Email"})
        }
      }
    }
  );
};
