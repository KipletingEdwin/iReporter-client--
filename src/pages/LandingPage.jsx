import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-slate-950 text-slate-100">

      {/* ================= HERO ================= */}
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Report Issues. <br />
            <span className="text-blue-500">Make Your City Better.</span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            iReporter allows citizens to report issues, track progress,
            and ensure transparency between the public and authorities.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-lg font-medium transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="📝"
              title="Create a Report"
              description="Describe an issue and its location in just a few clicks."
            />
            <FeatureCard
              icon="🔄"
              title="Track Progress"
              description="Follow your report from draft to resolution."
            />
            <FeatureCard
              icon="✅"
              title="Get Resolution"
              description="Authorities review and update issues transparently."
            />
          </div>
        </div>
      </section>

      {/* ================= WHY iREPORTER ================= */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Why iReporter?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <Reason title="Transparency">
              Citizens can see what’s being addressed and what’s not.
            </Reason>

            <Reason title="Accountability">
              Reports are traceable and time-stamped.
            </Reason>

            <Reason title="Impact">
              Your voice contributes to real-world change.
            </Reason>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to make a difference?
          </h2>

          <p className="text-slate-400 mb-10">
            Join iReporter today and help improve your community.
          </p>

          <Link
            to="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-medium transition"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl transition hover:-translate-y-1 hover:border-slate-700">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

function Reason({ title, children }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400">{children}</p>
    </div>
  );
}
