import "./globals.css";
import { AuthProvider } from "./Context/AuthContext";
// import CartProvider from "./context/cartContext";
export default function RootLayout({children}){
return(

  <html lang="en">
    <body>
      {children}
      </body>
  </html>
);
}