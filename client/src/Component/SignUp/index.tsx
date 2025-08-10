import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Zod schema for validation
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Inferred TypeScript type
type SignupFormData = z.infer<typeof signupSchema>;

const  Signup:React.FC=()=> {
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await axios.post("http://localhost:5050/api/signup", data);
      setMessage("signup successfull");
    } catch (err: any) {
      setMessage(err?.response?.data?.msg || "❌ Signup failed");
    }
  };

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'40px'}}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px'}}>
          <label>Name:</label>
          <input type="text" {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px'}}>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px'}}>
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" onClick={()=>navigate('/login')} style={{ marginTop: 20, }}>Sign Up</button>
       <span>already a user click on <button onClick={()=>navigate('/login')}>Login</button></span>
      </form>
    

      {message && (
        <p style={{ marginTop: 20, color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Signup;
