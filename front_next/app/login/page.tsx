"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import { useUser } from "@/utils/UserContext";

export default function LoginPage() {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log(email);
    try {
      const { data } = await API.post("/auth/token", { email, password });

      Cookies.set("accessToken", data.accessToken, { expires: 0.5 });
      Cookies.set("refreshToken", data.refreshToken, { expires: 7 });

      const userResponse = await API.get("/user/me", {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });
      console.log(userResponse.data);
      setUser(userResponse.data);
      router.push("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 bg-gray-200 p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
