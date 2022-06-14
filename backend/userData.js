import bcrypt from "bcryptjs";

let userData = [
  {
    name: "Obaydullah",
    email: "obaydullah.2041@gmail.com",
    password: bcrypt.hashSync("123456789"),
    isAdmin: true,
  },
  {
    name: "Raihan",
    email: "raihan.2041@gmail.com",
    password: bcrypt.hashSync("123456789"),
    isAdmin: false,
  },
];

export default userData;
