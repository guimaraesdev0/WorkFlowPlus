import withAuth from "next-auth/middleware"

export default  withAuth(
 function middleware() {
  //return response
 },
 {
   callbacks: {
    authorized({token}){
     return token?.role == 'admin'
    }
   }
 }
)