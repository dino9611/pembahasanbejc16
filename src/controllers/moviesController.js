const { mysqldb } = require("./../connection");

module.exports = {
  AddSchedule: (req, res) => {
    const { id } = req.params;
    const { location_id, time_id } = req.body;
    const { role } = req.user;
    if (role === 1) {
      let sql = `insert into schedules set ?`;
      let datainsert = {
        location_id: location_id,
        time_id,
        movie_id: id,
      };
      mysqldb.query(sql, datainsert, (err) => {
        if (err) return res.status(500).send(err);

        return res
          .status(200)
          .send({ id: id, messsage: "schdules has been added" });
      });
    } else {
      return res.status(401).send({ messsage: "unAuthorized" });
    }
  },
};
