import React, { useState } from "react";
import { Link,useLocation,useHistory } from "react-router-dom";
import "./sidebar.css";
import auth from "../utils/auth";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleTrigger = () => setIsOpen(!isOpen);

  const location = useLocation();

  const AdminOnly = navItem => (auth.isAdmin() ? [navItem] : []);
  const CustomerOnly = navItem => (auth.isCustomer() ? [navItem] : []);


  let structure = [
    ...AdminOnly({
      label: "Manage Users",
      link: "/app/users",
    }),
    ...AdminOnly({
      label: "Add Products",
      link: "/app/add_products",
    }),
    ...CustomerOnly({
      label: "Products",
      link: "/app/products",
    }),
  ];


  return (
    <>
      <div className="page">
          {structure.map((item, i) => {
            const isLinkActive = location.pathname === item.link;
            console.log(isLinkActive)
            return (
              <div key={i} className="access" >

                  <Link to={item.link} className={`${isLinkActive ? "active-menu" : ""}`}>
                  <div className="sidebar-position">
                      <span className="link" style={{fontSize:"16px"}}>{item.label}</span>
                    </div>
                  </Link>
              
              </div>
            )
            //  }
            // })
          })}
      </div>
    </>
  );
};


export default Sidebar;
