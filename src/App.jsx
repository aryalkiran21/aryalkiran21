import { useState } from "react";
import Modal from "./components/model";
import { ImCross } from "react-icons/im";
import Card from "./components/card";
import AddProductForm from "./components/forms/addProduct";
import NavBar from "./components/navbar";
// import SideNavBar from "./components/side-nav";
import "./App.css";
import Footer from "./components/footer";
const App = () => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <>
      <div>
        <NavBar />
        {/* <SideNavBar /> */}
      
        {openModel ? (
          <Modal>
            <div className="w-2/6  rounded-md relative">
              <button className="absolute right-0">
                <ImCross onClick={() => setOpenModel(false)} />
              </button>
              <AddProductForm />
            </div>
          </Modal>
        ) : null}
        <div className=" relative pb-5 right-16">
       
          <button
            onClick={() => setOpenModel(true)}
            className="bg-red-600 rounded-md p-2 m-4 text-white absolute right-0 mb-5  "
          >
            Add New Products
           
          </button>
        </div>
      </div>
      <Card />
      <Footer />
    </>
  );
};
export default App;