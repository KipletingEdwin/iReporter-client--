export default function Footer() {
  return (
    // <footer className="border-t border-slate-800 py-6 text-center text-slate-500">
    //   © {new Date().getFullYear()} iReporter. All rights reserved.
    // </footer>

    <footer className="border-t border-slate-800 py-6 text-center text-(--text-secondary)">
      © {new Date().getFullYear()} iReporter. All rights reserved.
    </footer>
  );
}
