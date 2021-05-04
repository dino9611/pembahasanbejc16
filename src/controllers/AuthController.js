const { mysqldb } = require("./../connection");
const { createAccessToken } = require("./../helpers/CreateToken");

module.exports = {
  Login: (req, res) => {
    const { user, password } = req.body;
    let sql =
      "select * from users where (username = ? or email = ?) and password = ?";
    mysqldb.query(sql, [user, user, password], (err, user) => {
      if (err) return res.status(500).send(err);
      if (user.length) {
        let dataToken = {
          uid: user[0].uid,
          role: user[0].role,
        };
        let tokenAccess = createAccessToken(dataToken);
        res.set("x-token-access", tokenAccess);
        return res.status(200).send({ ...user[0], token: tokenAccess });
      } else {
        return res.status(500).send({ message: "user tidak ditemukan" });
      }
    });
  },
  deactive: (req, res) => {
    const { uid } = req.user;
    let dataupdate = {
      status: 2,
    };
    let sql = `update users set ? where uid = ?`;
    mysqldb.query(sql, [dataupdate, uid], (err) => {
      if (err) return res.status(500).send({ message: "server error" });
      return res.status(200).send({ uid: uid, status: "deactive" });
    });
  },
  activate: (req, res) => {
    const { uid } = req.user;
    let dataupdate = {
      status: 1,
    };
    let sql = `update users set ? where uid = ?`;
    mysqldb.query(sql, [dataupdate, uid], (err) => {
      if (err) return res.status(500).send({ message: "server error" });
      return res.status(200).send({ uid: uid, status: "active" });
    });
  },
  closed: (req, res) => {
    const { uid } = req.user;
    let dataupdate = {
      status: 3,
    };
    let sql = `update users set ? where uid = ?`;
    mysqldb.query(sql, [dataupdate, uid], (err) => {
      if (err) return res.status(500).send({ message: "server error" });
      return res.status(200).send({ uid: uid, status: "closed" });
    });
  },
};
