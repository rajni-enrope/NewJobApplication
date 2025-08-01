import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // or localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/");
    };
    return (
        <div className="flex justify-center mt-4">
            <button onClick={handleLogout} className="w-full bg-red-600 text-white  px-3 max-[360px]:px-2 sm:px-4 md:px-6  py-2 rounded  hover:bg-red-700 transition duration-200"> Logout </button>
        </div>
    )
};
export default Logout

