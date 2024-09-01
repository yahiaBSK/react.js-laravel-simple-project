import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { NavLink } from "react-router-dom";

export default function NavBar({ themeMode, themeIcon }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  function triggerTheme() {
    themeMode();
  }
  
  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="transition-background duration-500"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <NavLink
              color="primary"
              className={({ isActive }) =>
                `p-2 rounded-md transition-all duration-250
              ${isActive && "text-primary bg-primary-50"}`
              }
              to="/"
            >
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              className={({ isActive }) =>
                `p-2 rounded-md transition-all duration-250
              ${isActive && "text-primary bg-primary-50"}`
              }
              to="/students"
            >
              Students
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              className={({ isActive }) =>
                `p-2 rounded-md transition-all duration-250
              ${isActive && "text-primary bg-primary-50"}`
              }
              to="/about"
            >
              About
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem className="flex">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              className="rounded-full text-center text-xl"
              onClick={() => triggerTheme()}
            >
              {themeIcon}
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
