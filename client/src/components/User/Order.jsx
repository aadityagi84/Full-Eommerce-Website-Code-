import Layout from "../Layout/Layout";
import UserMenu from "./UserMenu";

const Order = () => {
  return (
    <Layout>
      <div>
        <h2>Orders</h2>
        <div className="container grid grid-cols-[400px_1fr] gap-3 mx-auto  my-10 ">
          <div className=" ">
            <UserMenu />
          </div>

          <div className=" ">
            <div className="cards">Orders</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
