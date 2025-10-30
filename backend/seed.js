// seed.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Модель пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" } // можно "admin"
});

const User = mongoose.model("User", userSchema);

// Подключение к MongoDB
const MONGO_URI = "твоя_строка_подключения_к_MongoDB"; 
// Пример локально: "mongodb://localhost:27017/mydatabase"

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.error("Ошибка подключения к MongoDB:", err);
  process.exit(1);
});

// Функция для создания пользователя
const createAdminUser = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Пользователь с таким логином уже существует");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: "admin" // роль администратора
    });

    await newUser.save();
    console.log(`Пользователь ${username} успешно создан!`);
    process.exit(0);
  } catch (err) {
    console.error("Ошибка при создании пользователя:", err);
    process.exit(1);
  }
};

// Задаем логин и пароль
const LOGIN = "admin@gmail.com";       // поменяй на свой
const PASSWORD = "123456";   // поменяй на свой

createAdminUser(LOGIN, PASSWORD);