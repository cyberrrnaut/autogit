import { useEffect, useState } from "react";
import { useGetToken } from "../hooks/useGetToken"
import { Connect } from "./Connect";
import UserDetails from "./UserDetails";

export default function Homepage() {
    
    const [token, setToken] = useState<string | null>(null);

    const storedToken = useGetToken();
  
    useEffect(() => {
      setToken(storedToken);
    }, [storedToken]);


  return(<div className='f>>lex bg-slate-950 h-screen w-full text-white justify-center items-center'>
    {token===null ? <Connect/>:
     <div className="text-white">
     
      <UserDetails/>
      
        </div>

    }
  </div>)
}
