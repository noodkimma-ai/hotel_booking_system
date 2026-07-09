import "./globals.css";
import { AuthProvider } from "./Context/AuthContext";
export default function RootLayout({children}){
return(

  <html lang="en">
    <body>
      {children}
      </body>
  </html>
);
}