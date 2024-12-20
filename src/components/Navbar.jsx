import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {

const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.clear("token");
        navigate("/login")
    }
  return (
    <section class="p-4 bg-gradient-to-r bg-blue-600 ">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
            <div class="xl:flex xl:items-center xl:justify-start">
              <Link to="/">
              <img class="w-auto mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo-alt-2.svg" alt="" />
              </Link>

               
            </div>

            <div class="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
                <ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
                    <li>
                        <Link to="#" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Employee Management </Link>
                    </li>
                    <li>
                        <Link to="#" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Attendance </Link>
                    </li>
                    <li>
                        <Link to="#" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Project Management </Link>
                    </li>

                    {/* <li>
                        <a href="#" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Services </a>
                    </li>

                    <li>
                        <a href="#" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Privacy Policy </a>
                    </li>

                    <li>
                        <a href="#" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Terms & Conditions </a>
                    </li>

                    <li>
                        <a href="#" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Support </a>
                    </li> */}
                </ul>

<button
            
            className="flex items-center justify-center w-fit px-4 py-2 text-xl font-semibold text-white transition-all  duration-200 bg-[#FBBF23] border border-transparent rounded-md focus:outline-none hover:bg-red-700 focus:bg-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
            </div>
        </div>
    </div>
</section>

  );
};

export default Navbar;
