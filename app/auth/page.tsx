// app/auth/page.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, { username, password });

      localStorage.setItem("token", res.data.token);
      alert(isLogin ? "Вход успешен!" : "Регистрация успешна!");
      window.location.href = "/";
    } catch (err: any) {
      alert(err.response?.data?.error || "Ошибка");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Вход" : "Регистрация"}
        </h1>

        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>

        <p className="text-center mt-4">
          {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Регистрация" : "Вход"}
          </button>
        </p>
      </form>
    </div>
  );
}