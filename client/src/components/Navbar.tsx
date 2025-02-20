import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const links = ["Home", "Rezervo"];

  return (
    <div className="w-full h-40 tb:h-16 flex justify-center bg-primary px-4 py-2 shadow-md fixed z-50">
      <nav className="h-full w-full max-w-7xl flex items-center justify-between">
        <h1 className="font-semibold px-4 tb:px-0 text-5xl text-wrap tb:text-2xl text-white">
          Villa Vogue
        </h1>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              className={`${
                location.pathname === `/${link.toLowerCase()}` ||
                (location.pathname === "/" && link === "Home")
                  ? "text-[#2D6A4F] bg-white"
                  : "text-white"
              } hover:text-[#2D6A4F] hover:bg-white font-semibold duration-200 text-4xl tb:h-8 tb:text-base px-6 py-3 tb:px-3 tb:py-1 rounded-md`}
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
