'use client';
import { FaGoogle } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { HowItWorks } from "./HowItWorks";
import { Button } from 'primereact/button';

const HeroBanner = () => {
  return (
    <div
      className="flex flex-column align-items-center justify-content-center text-center"
      style={{
        minHeight: '90vh',
      }}
    >
      <div>
        <div className="banner-bg lg:py-6 md:py-5 py-4 px-5 mb-5">
        <h1 className="text-2xl md:text-4xl font-bold mb-1 text-white">
          Your Local Handyman, Just a Click Away
        </h1>

        <h2 className="text-xl md:text-2xl mb-1 font-light yellow-accent">
          ... Fast. Reliable. On-Demand.
        </h2>

        <h3 className="text-lg md:text-xl mb-2 line-height-3 text-white font-light">
          Need a plumber, electrician, or cleaner? Post a job, find nearby handymen,
          and get it done — without the hassle.
        </h3>
        </div>

        {/* Mobile login button */}
        <div className="flex justify-content-center md:hidden mb-4">
        <Button
              icon="pi pi-google"
              label="Login / Register"
              className="p-button-secondary bg-white text-primary"
              onClick={() => signIn("google")}
            />
        </div>

        <HowItWorks />
      </div>
    </div>
  );
};

export default HeroBanner;
