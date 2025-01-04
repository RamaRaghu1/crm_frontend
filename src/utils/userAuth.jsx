import { useSelector } from "react-redux";

export default function useAuth(){
    const {user} = useSelector((state)=>state.auth);
console.log("user state_____________________",user)
    if(user){
        return true;
    }else{
        return false;
    }
}