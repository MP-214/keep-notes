import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Zod schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

// ✅ Type inference
type LoginFormData = z.infer<typeof loginSchema>;

const Login:React.FC=()=> {
  const [message, setMessage] = useState("");
const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post("http://localhost:5050/api/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/notes"); 
    } catch (err: any) {
      setMessage(err?.response?.data?.msg || "❌ Login failed");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)",  gap: "10px" }}>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)",  gap: "10px" }}>
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
     <div style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:20}}>
        <button type="submit" >Login</button>
      <span>Don't have an account? Click <button onClick={()=>navigate('/signup')}>Signup</button></span>
      </div>
      </form>


      {message && (
        <p style={{ marginTop: 20, color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
