'use client';
import { Divider } from 'primereact/divider';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-ground flex flex-column md:flex-row align-items-center justify-content-between px-4 py-4 mt-auto w-full" style={{ backgroundColor: '#252929', color: 'white' }}>
      
      {/* Links */}
      <div className="flex flex-wrap justify-content-center md:justify-content-start mb-3 md:mb-0">
        <ul className="flex gap-4 list-none p-0 m-0">
          <li>
            <a href="/" className="text-[#27666E] hover:underline">Home</a>
          </li>
          <li>
            <a href="/" className="text-[#27666E] hover:underline">Terms of Service</a>
          </li>
        </ul>
      </div>

      {/* Divider for mobile */}
      <Divider className="block md:hidden my-2" />

      {/* Copyright */}
      <div className="text-center md:text-right">
        <small className="text-white">&copy; {currentYear} Mayus</small>
      </div>
    </footer>
  );
};

export default Footer;
