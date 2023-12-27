import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formatData, setFormData] = useState({});
  const { currentUser } = useSelector(state => state.user)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if(currentUser){
      navigate('/')
    }
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formatData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formatData.username || !formatData.email || !formatData.password) {
      setError("Fill all the fields");
      return;
    }


    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formatData),
      });

      const data = await res.json();
      
      if (data.status === 409) { // Assuming 409 status code indicates user already exists
        setError("User already exists"); // Set the specific error message for existing user
        return;
      }


      if (!res.ok) {
        setError("User creation failed");
        return;
      }
      

      if (data.success === false) {
        setError("wrong credentials");
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError("Error occurred during sign up");
      console.error("Error occurred during sign up:", error);
    }
  };

  return (
    <div className="p-3 mt-10 max-w-lg mx-auto border border-gray-300 rounded-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700">{error}</p>
    </div>
  );
}

export default SignUp;
