import './globals.css';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "HandyConnect",
  description: "Find trusted handymen near you",
};

const MainLayout = ({ children }) => {
    return (
      <AuthProvider>
        <html lang="en">
          <body>
            <NavBar />
            <main>
              {children}
            </main>
            <Footer />
          </body>
        </html>
      </AuthProvider>
    );
  };
  
  export default MainLayout;
