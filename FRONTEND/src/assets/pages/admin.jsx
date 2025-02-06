import Nav from "../components/nav2";
import AddProduct from "../components/admin/addProduct";

const Admin = () => {
  return (
    <section className="bg-primary h-screen">
      <Nav />
      <section className="bg-primary px-20 py-10">
        <AddProduct/>
      </section>
    </section>
  );
};

export default Admin;
