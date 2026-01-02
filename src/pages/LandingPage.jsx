import { BarChart3, Building, CheckCircle, CheckCircle2, Eye, FilePlus, FileText, ListChecks, ShieldCheck, Sparkles, User, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-(--bg-app)">
      {/* ================= HERO ================= */}
      <section className="min-h-[85vh] flex items-center  ">
        
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Report Issues. <br />
            <span className="text-blue-500">Make Your City Better.</span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            iReporter allows citizens to report issues, track progress, and
            ensure transparency between the public and authorities.
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
              className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-lg 
              font-medium transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FilePlus size={36} />}
              title="Create a Report"
              description="Describe an issue and its location in just a few clicks."
            />
            <FeatureCard
              icon={<BarChart3 size={36} />}
              title="Track Progress"
              description="Follow your report from draft to resolution."
            />
            <FeatureCard
              icon={<CheckCircle2 size={36} />}
              title="Get Resolution"
              description="Authorities review and update issues transparently."
            />
          </div>
        </div>
      </section>

{/* ================= WHO IS IREPORTER FOR ================= */}
<section className="py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-12 text-[var(--text-primary)]">
      Who is iReporter for?
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard
        icon={<User size={36} />}
        title="Citizens"
        description="Anyone can report issues in their community and track progress easily."
      />

      <FeatureCard
        icon={<Building size={36} />}
        title="Local Authorities"
        description="Government teams can view, manage, and resolve reports efficiently."
      />

      <FeatureCard
        icon={<Users size={36} />}
        title="Communities"
        description="Neighborhood groups and organizations can monitor issues and advocate for improvements."
      />
    </div>
  </div>
</section>








{/* ================= WHY IREPORTER ================= */}
<section className="py-24 bg-[var(--bg-surface)]/30">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">
      Why iReporter?
    </h2>

    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
      iReporter bridges the gap between citizens and authorities by making reporting simple, transparent, and effective.
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard
        icon={<Eye size={36} />}
        title="Transparency"
        description="Citizens can see what’s being addressed and what’s not, ensuring open communication."
      />

      <FeatureCard
        icon={<ShieldCheck size={36} />}
        title="Accountability"
        description="Reports are traceable, time-stamped, and visible to both citizens and authorities."
      />

      <FeatureCard
        icon={<Sparkles size={36} />}
        title="Impact"
        description="Your voice contributes to real improvements in your community."
      />
    </div>
  </div>
</section>


      {/* ================= CTA ================= */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to make a difference?
          </h2>

          <p className="text-(--text-secondary) mb-10">
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
    <div
      className="bg-(--bg-surface) border border-(--border-color) p-8 rounded-xl 
    transition hover:-translate-y-1 hover:border-(--primary)"
    >
      <div className="text-4xl mb-4 flex items-center justify-center  text-(--primary) ">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-(--primary)">{title}</h3>
      <p className="text-(--text-secondary)">{description}</p>
    </div>
  );
}


