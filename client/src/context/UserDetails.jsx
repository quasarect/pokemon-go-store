import { useEffect, useState } from "react";
import { userDetailUrl } from "./api"
import userData from "../hooks/userData";

export const UserDetails = () => {
    const [userDetails, SetUserDetails] = useState({
        name: "",
        email: "",
        profilePhoto: "",
        credits:0
    });

    const { data, loading, error, refetch } = userData(userDetailUrl,"GET");
    // console.log("userDetails",data)
    useEffect(() => {
        SetUserDetails(data);
        // console.log("userder",userDetails)
    }, [data])
    

    return {userDetails,loading,error,refetch};
}
