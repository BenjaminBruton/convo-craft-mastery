import React from "react";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => (
  <footer className="w-full bg-gray-100 border-t mt-8 py-6 px-4 text-sm text-gray-700">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
        <a href="/about" className="hover:underline">About</a>
        <a href="/careers" className="hover:underline">Careers</a>
        <a href="mailto:contact@yourdomain.com" className="hover:underline">Contact</a>
        <a href="/disclaimer" className="hover:underline">Disclaimer</a>
      </div>
      <div className="text-center md:text-right">
        &copy; {currentYear} PlotOps. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;