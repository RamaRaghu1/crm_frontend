import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import useAuth from "./userAuth";
export default function Protected({ children }) {
//   const token =
  const {token} = useSelector((state)=>state.accessToken)  || localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const isTokenValid = decodedToken.exp * 1000 > Date.now();
console.log("______",isTokenValid)
    return isTokenValid ? children : <Navigate to="/login" />;
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" />;
  }
}

// export default function Protected({children}){
//     const isAuthenticated = useAuth();

//     return isAuthenticated ? children : <Navigate to='/'/>
// }
