import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart, FaList, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import "./Navigation.css";
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropDownOpen, setdropDown] = useState(false);
  const [showSidebar, setshowSidebar] = useState(false);

  const toggleDropdown = () => {
    setdropDown(!dropDownOpen);
  };
  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setshowSidebar(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black  w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>{" "}
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>{" "}
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>
        </Link>{" "}
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-white focus:outline-none"
        >
          {userInfo ? (
            <div className="flex flex-row w-full justify-between items-center">
              {userInfo.isAdmin ? <FaUser size={20} /> : <></>}
              <h2 className="hidden nav-item-name ml-2">{userInfo.username}</h2>
            </div>
          ) : (
            <></>
          )}
        </button>
        {dropDownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-gray-900 text-white rounded-lg text-semibold ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-400 rounded-lg "
                  >
                    Dashboard
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2  hover:bg-gray-400 rounded-lg  "
                  >
                    Products
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2  hover:bg-gray-400 rounded-lg "
                  >
                    Category
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2  hover:bg-gray-400 rounded-lg"
                  >
                    Users
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to="/admin/list"
                    className="block px-4 py-2  hover:bg-gray-400 rounded-lg "
                  >
                    Orders
                  </Link>
                </li>{" "}
              </>
            )}
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2  hover:bg-gray-400 rounded-lg"
              >
                Profile
              </Link>
            </li>{" "}
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-400 rounded-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={20} />
              <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={20} />
              <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
