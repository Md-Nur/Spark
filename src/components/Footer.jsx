import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-neutral text-neutral-content">
      <aside>
        <span className="text-5xl font-extrabold">SPARK</span>
        <p className="font-bold">
          Department of EEE <br />
          University of Rajshahi
        </p>
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=61555626852849"
            target="_blank"
          >
            <FaFacebook className="text-4xl" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
