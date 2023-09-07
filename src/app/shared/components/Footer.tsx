// Footer.tsx
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-8 px-11">
      <div className="container flex justify-between items-center">
        <div className="text-center md:text-left">
          <h1 className="font-bold text-3xl text-white cursor-pointer">
            dilio.
          </h1>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            exercitationem repellat itaque dolores!
          </p>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Contact Us</h2>
          <div className="text-sm">
            <div>Email: info@dilio.com</div>
            <div>Phone: +1 123-456-7890</div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        &copy; 2023 Dilio, All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
