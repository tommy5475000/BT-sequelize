import { Sequelize } from "sequelize";

const sequelize = new Sequelize("db_node37", "root", "12345", {
  host: "localhost",
  port: "3307",
  dialect: "mysql",
});

export default sequelize;

try {
  await sequelize.authenticate();
  console.log("Kết nối thành công");
} catch (err) {
  console.log(err);
}
