import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import  Router from "next/router";


export default function withAuth(){
 const { status, data } = useSession();
  
 useEffect(() => {
  if (status === "unauthenticated") {
   Router.replace("/auth/login?error")
  }
 }, [status])

 console.log(data)
 return <div><h1>Página protegida para membros, { JSON.stringify(data?.user)}</h1></div>
}