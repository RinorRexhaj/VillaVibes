import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const links = ["Home", "Rezervo"];

  return (
    <div className="w-full h-16 flex justify-center bg-primary px-4 py-2 shadow-md fixed z-50">
      <nav className="h-full w-full max-w-7xl flex items-center justify-between">
        <h1 className="font-semibold px-0 text-wrap text-2xl text-white">
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
              } hover:text-[#2D6A4F] hover:bg-white font-semibold duration-200 h-8 text-base px-3 py-1 rounded-md`}
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
