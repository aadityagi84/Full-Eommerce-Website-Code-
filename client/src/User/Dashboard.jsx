import Layout from "../components/Layout/Layout";
import UserMenu from "../components/User/UserMenu";
import { useAuth } from "../context/Auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div>
      <Layout>
        <h2 className="text-3xl text-center  mt-8 font-semibold">
          User Dashboard
        </h2>
        <div className="container grid grid-cols-[400px_1fr] gap-3 mx-auto  my-10 ">
          <div className=" ">
            <UserMenu />
          </div>

          <div className=" ">
            <div className="cards">
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
                    {auth?.user?.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {auth?.user?.email}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {auth?.user?.phone}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {auth?.user?.address}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
