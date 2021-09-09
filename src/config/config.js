
const {
  PORT: port = 4000,
  DB_NAME: name = "demo",
  DB_USERNAME: username = "g3geek",
  DB_PASSWORD: password = "g3geek",
  DB_URL: url = "cluster0.p2jhg.mongodb.net"
} = process.env;

const config = {
  app: {
    port,
  },
  database: {
    name,
    username,
    password,
    url,
  },
};

export default config;
