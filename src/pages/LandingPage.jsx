import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect logged-in users straight to reports
  useEffect(() => {
    if (token) {
      navigate("/reports");
    }
  }, [token, navigate]);

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-6">
            iReporter
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-10">
            Report community issues. Track progress.  
            <span className="block mt-2 font-medium">
              Transparency made simple.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM / SOLUTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">The Problem</h2>
            <ul className="space-y-3 text-gray-600 text-lg">
              <li>❌ Community issues go unreported</li>
              <li>❌ No transparency on progress</li>
              <li>❌ Citizens feel unheard</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              The Solution
            </h2>
            <ul className="space-y-3 text-gray-600 text-lg">
              <li>✅ Report issues in minutes</li>
              <li>✅ Track status in real-time</li>
              <li>✅ Clear accountability</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-semibold text-xl mb-2">Create a Report</h3>
              <p className="text-gray-600">
                Describe the issue and where it’s located.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-semibold text-xl mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Draft → Submitted → Resolved.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-semibold text-xl mb-2">Resolution</h3>
              <p className="text-gray-600">
                Authorities update and resolve issues transparently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Feature icon="🧑‍💻" title="User & Admin Roles" />
            <Feature icon="📊" title="Status Tracking" />
            <Feature icon="🔐" title="Secure Authentication" />
            <Feature icon="⚡" title="Fast & Responsive" />
            <Feature icon="📱" title="Mobile Friendly" />
            <Feature icon="🧩" title="Clean UI & UX" />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to make a difference?
        </h2>
        <p className="text-lg mb-8">
          Join iReporter and help improve your community.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-100 transition shadow-lg"
        >
          Get Started Now
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      {/* <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} iReporter. All rights reserved.
        </p>
      </footer> */}
    </div>
  );
}

/* ================= Feature Component ================= */
function Feature({ icon, title }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );
}
