"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import profileDefault from "@/assets/images/profile.png";
import { FaGoogle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();
  const profileImage = session?.user?.image ?? profileDefault;
  const pathName = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();

    const handleResize = () => setIsMobileMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setIsProfileMenuOpen(false), [pathName]);

  const handleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  return (
    <nav className="surface-section surface-border shadow-1">
      <div className="flex justify-content-between align-items-center px-4 py-3 w-full md:w-10 mx-auto">
        {/* Logo / Brand */}
        <div className="flex align-items-center gap-2">
          <Link href="/" className="text-primary md:text-5xl font-bold no-underline">
            Handy Man
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex align-items-center gap-3">
          {!session ? (
            <Button
              icon="pi pi-google"
              label="Login / Register"
              className="p-button-secondary md:visible lg:visible"
              onClick={() => signIn("google")}
            />
          ) : (
            <div className="flex align-items-center gap-2">
              <Avatar
                image={profileImage}
                shape="circle"
                size="large"
                onClick={handleProfileMenu}
                style={{ cursor: "pointer" }}
              />
              <Sidebar
                visible={isProfileMenuOpen}
                position="right"
                onHide={() => setIsProfileMenuOpen(false)}
                header="Profile"
              >
                <div className="flex flex-column align-items-center text-center p-3">
                  <Avatar
                    image={profileImage}
                    size="xlarge"
                    shape="circle"
                  />
                  <h3 className="mt-3 mb-1">{session.user.name}</h3>
                  <p className="m-0 text-600">{session.user.email}</p>
                  <Badge value="3" severity="danger" className="mt-3" />
                  <Button
                    label="Sign Out"
                    icon="pi pi-sign-out"
                    className="w-full mt-4 p-button-primary"
                    onClick={() => signOut()}
                  />
                </div>
              </Sidebar>
            </div>
          )}

          <Button
            icon="pi pi-bars"
            className="p-button-text p-button-rounded p-button-secondary lg:hidden"
            onClick={handleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <Sidebar
        visible={isMobileMenuOpen}
        position="left"
        onHide={() => setIsMobileMenuOpen(false)}
        header="Menu"
      >
        <ul className="flex flex-column gap-3 p-0 m-0 list-none">
          <li>
            <Link href="/" className="text-800 hover:text-primary no-underline">Home</Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-800 hover:text-primary no-underline">Dashboard</Link>
          </li>
          <li>
            <Link href="/jobs/newjob" className="text-800 hover:text-primary no-underline">Post a Job</Link>
          </li>
        </ul>
      </Sidebar>
    </nav>
  );
};

export default NavBar;
