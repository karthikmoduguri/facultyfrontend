import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
    const[htmlContent,setHtmlContent] = useState("");
    const navigate = useNavigate();
    const handlebtn=async (e) => {
        e.preventDefault();
        try {
            axios.get("http://localhost:7000/api/v1/auth/h")
            .then(response=>{
                setHtmlContent(response.data);
                console.log(response.data);
            })
            .catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return(
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-300">
    <button onClick={handlebtn} className="p-4 bg-blue-500 text-white rounded hover:bg-red-600"> login</button>
    <div className="mt-4 text-center-rounded bg-amber-500 hover:bg-green-600" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
    </>
    );
}

export default StudentLogin;