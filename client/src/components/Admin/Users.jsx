import Layout from "../Layout/Layout";
import AdminMenu from "../Layout/AdminMenu";

const Users = () => {
  return (
    <Layout>
      <div>
        <h2>All users</h2>
        <div className="container grid grid-cols-[400px_1fr] gap-3 mx-auto  my-10 ">
          <div className=" ">
            <AdminMenu />
          </div>

          <div className=" ">
            <div className="cards">Users</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
