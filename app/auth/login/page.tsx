"use client"

import { useState } from "react"
import api from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      alert("Вход выполнен успешно!")
      window.location.href = "/"
    } catch (err: any) {
      alert("Ошибка при входе: " + err.response?.data?.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>

        <input
          type="email"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Войти
        </button>
      </form>
    </div>
  )
}