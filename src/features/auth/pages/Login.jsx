// features/auth/pages/Login.jsx
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import AuthForm from "../components/AuthForm";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = async (data) => {
    const res = await dispatch(loginUser(data));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login successful 🎉");

      navigate(location.state?.from || "/");
    } else {
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900 text-center mb-5">
          Login
        </h1>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <AuthForm onSubmit={handleLogin} type="login" />

        <button
          form="auth-form"
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-2.5 rounded-xl bg-black text-white text-sm 
             hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
