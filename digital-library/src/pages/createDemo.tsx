import { FormEvent, useState } from "react";
import React from "react";
function UserForm() {
  // フォームの入力を管理するための state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // フォームが送信されたときに呼び出される関数
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }), // フォームのデータを送信
      });

      if (response.ok) {
        const newUser = await response.json();
        console.log("New user created:", newUser);
        // フォームのリセットなどの処理
        setName("");
        setEmail("");
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // 入力の変更を state に反映
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 入力の変更を state に反映
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}

export default UserForm;
