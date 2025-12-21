import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {


  return (
    <div className="min-h-screen bg-(--bg-app) transition-colors duration-300 "     >
      <Navbar  />

      <main className="min-h-[calc(100vh-160px)] px-4">{children}</main>
      <Footer />
    </div>
  );
}
