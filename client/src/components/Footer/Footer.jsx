import { LiaLinkedin } from "react-icons/lia";
import Logo from "../../assets/logo.png";
import { GrGithub } from "react-icons/gr";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <NavLink
                to="#"
                className="font-bold text-2xl sm:text-3xl flex gap-2"
              >
                <img src={Logo} alt="logo" className="w-10 uppercase" />
                Shopsy
              </NavLink>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Quick Links
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <NavLink to="/" className="hover:underline">
                      Home
                    </NavLink>
                  </li>
                  <li className="mb-4">
                    <NavLink to="" className="hover:underline">
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="contact" className="hover:underline">
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <NavLink
                      to="https://github.com/aadityagi84"
                      className="hover:underline"
                    >
                      Github
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="http://www.linkedin.com/in/aaditya-tyagi-004896298"
                      className="hover:underline"
                    >
                      LinkedIn
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <NavLink to="#" className="hover:underline">
                      Privacy Policy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" className="hover:underline">
                      Terms &amp; Conditions
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024 . made by ❤️aadi
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <NavLink
                to="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </NavLink>
              <NavLink
                to="https://github.com/aadityagi84"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <GrGithub className="dark:text-gray-500 text-gray-500  text-xl" />
                <span className="sr-only">Twitter page</span>
              </NavLink>
              <NavLink
                to="http://www.linkedin.com/in/aaditya-tyagi-004896298"
                target="_blanck"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <LiaLinkedin className="dark:text-gray-500 text-gray-500  text-xl" />
                <span className="sr-only">LinkedIn page</span>
              </NavLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
