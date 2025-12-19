import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <Navbar />
      <main className="min-h-[calc(100vh-160px)] px-4">{children}</main>
      <Footer />
    </div>
  );
}
