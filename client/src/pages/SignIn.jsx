import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function SignIn() {
  const [errors,setErrors] = useState(null)
  const [formatData, setFormData] = useState({});
  const { currentUser,loading, error } = useSelector((state) => state.user);
  // const {loading,error}=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formatData, [e.target.id]: e.target.value });
  };


  useEffect(() => {
    if(currentUser){
      navigate('/')
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formatData.email || !formatData.password) {
      setErrors("Fill in all fields");
      return;
    }



    try {
      dispatch(signInStart());

      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formatData),
      });

      const data = await res.json();
      if (data.success === false) {
        setErrors('User not found')
        return dispatch(signInFailure(data));
      }

      dispatch(signInSuccess(data));

      if (data.role == 'admin') {
        navigate("/admin-home")
      } else {
        navigate("/");
      }

    } catch (error) {
      setErrors('Something went wrong , try again')
      dispatch(signInFailure(error));
      // console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="p-3 mt-10 max-w-lg mx-auto border border-gray-300 rounded-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account ?</p>
        <Link to="/sign-up">
          <span className="text-red-600">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && <> </>}</p>
    </div>
  );
}

export default SignIn;
