import { Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(config.database, config.user, config.pass, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
});

export default sequelize;

try {
  await sequelize.authenticate();
  console.log("Kết nối thành công");
} catch (err) {
  console.log(err);
}
