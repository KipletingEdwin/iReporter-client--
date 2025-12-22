export default function Footer() {
  return (
    <footer className="border-t border-(--border-color) py-6 text-center text-(--text-secondary)">
      © {new Date().getFullYear()} iReporter. All rights reserved.
    </footer>
  );
}
