export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6 text-center text-(--text-secondary)">
      © {new Date().getFullYear()} iReporter. All rights reserved.
    </footer>
  );
}
