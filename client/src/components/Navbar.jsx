import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from "lucide-react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import socket from './homepagecomp/Socket';

export default function PolishedNavbar ({ curr2, isOn }) {
  const navigate = useNavigate();
  const [curr, setCurr] = useState("");
  const [isPersonalOpen, setIsPersonalOpen] = useState(true);
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  // const [disableCamera, setDisableCamera] = useState(true);

  if(curr2 === undefined){
    curr2 = "";
  }

  useEffect(() => {
    setCurr(curr2);
  }, [curr2]);

  const handleOnClick = (event) => {
    const eve = event.currentTarget.id;
    navigate(`/${eve}`, {state: { curr: eve}});
    setCurr(eve);
  };

  const toggleSection = (section) => {
    if (section === 'personal') {
      setIsPersonalOpen(!isPersonalOpen);
    } else if (section === 'general') {
      setIsGeneralOpen(!isGeneralOpen);
    }
  };

  const NavItem = ({ id, title, children }) => (
    <div
      id={id}
      onClick={handleOnClick}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
      className={`nav-item ${curr === id ? 'active' : ''} ${hoveredItem === id ? 'hovered' : ''}`}
    >
      <div className="light-reflection" />
      <div className="secondary-reflection" />
      <div className="gradient-background" />
      <span className="item-content">{children}</span>
      <div className="tooltip">{title}</div>
    </div>
  );

  const SectionHeader = ({ title, isOpen, onClick }) => (
    <button onClick={onClick} className="section-header">
      <div className="header-content">
        <span className="header-title">{title}</span>
        {isOpen ? <ChevronUp className="header-icon" size={20} /> : <ChevronDown className="header-icon" size={20} />}
      </div>
    </button>
  );

  // useEffect(() => {
  //     if (!socket.connected) {
  //       socket.connect();
  //     }
  //     console.log("message disable in movie comp ", disableCamera);
  //     if(socket.connected){
  //       socket.emit("disable", { msg: disableCamera });
  //     }else{
  //       socket.once("connect", () => {
  //         console.log("Sending disable in movie comp : ", disableCamera);
  //         socket.emit("disable", { msg: disableCamera });
  //     });
  //     } 
  //   },[disableCamera]);

    // const handleDisableCamera = () => {
    //   setDisableCamera((prev) => !prev);
    // };
  

return (
<> 
  <Container isOn={isOn}>
    <div className="navbar-container">
      <nav className="navbar">
        <div className="ambient-light">
          <div className="top-light" />
          <div className="right-edge-glow" />
          <div className="bottom-light" />
        </div>
        
        <div className="logo-section">
          <h2 className="logo">EIGA</h2>
          <div className="logo-hover-effect" />
        </div>

        <div className="menu-section">
          <h4 className="menu-title">MENU</h4>
          <div className="menu-items">
            <NavItem id="" title="Go to Home">Home</NavItem>
            <NavItem id="explore" title="Explore Content">Explore</NavItem>
            <NavItem id="search" title="Search Content">Search</NavItem>
          </div>
        </div>

        <div className="personal-section">
          <SectionHeader 
            title="PERSONAL" 
            isOpen={isPersonalOpen}
            onClick={() => toggleSection('personal')}
          />
          {isPersonalOpen && (
            <div className="personal-items">
              <NavItem id="watchlist" title="View Watchlist">Watch list</NavItem>
              <NavItem id="history" title="View History">History</NavItem>
            </div>
          )}
        </div>

        <div className="general-section">
          <SectionHeader 
            title="GENERAL" 
            isOpen={isGeneralOpen}
            onClick={() => toggleSection('general')}
          />
          {isGeneralOpen && (
            <div className="general-items">
              <NavItem id="profile" title="Edit Profile">Profile</NavItem>
              <NavItem id="login" title="Log In to Account">LogIn</NavItem>
            </div>
          )}
        </div>
      </nav>

      {/* <div className="disable-camera" onClick={handleDisableCamera}>
          Disable Camera
        </div> */}
    </div>
  </Container> 
</>
);
};


const Container = styled.div`
  position: sticky; /* Keeps them in place */
  top: 0; /* Adjust this as per your layout */
  left:0;
  width: 12vw;
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    ${(props) => (props.isOn ? "left: -500px" : "left: 0")};
    z-index: 2000;
    height: 100vh;
    transition: left 0.3s ease;
  }
    
    
.navbar-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #13111C; /* Dark background */

  .disable-camera{
    width: 9.5vw;
    height: 6vh;
    padding-left: 10px;
    padding-top: 10px;
    border: 1px solid white;
    border-radius: 16px;
    color: white;

    &:hover{
      background-color: rgb(244, 246, 139);
      color: blue;
    }
  }
  /* Responsive adjustment */
    @media (max-width: 768px) {
      flex-direction: column;
      height: 100vh;
      
    }
}

.navbar {
  width: 12vw;
  background: linear-gradient(to bottom, #13111C, #0C0A12);
  color: #E0E0E0; /* Text color */
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(139, 92, 246, 0.2);

  

  /* Mobile adjustments */
    @media (max-width: 768px) {
      width: 10rem;
      padding: 1rem;
    }
}

.ambient-light {
  position: absolute;
  inset: 0;
}

.ambient-light, .top-light, .right-edge-glow, .bottom-light {
    /* Glow effects scaling down */
    @media (max-width: 768px) {
      height: 8rem;
    }
  }

.top-light {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 16rem;
  background: linear-gradient(to bottom, rgba(139, 92, 246, 0.1), transparent);
}

.right-edge-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, rgba(139, 92, 246, 0.2), rgba(245, 100, 248, 0.2), rgba(139, 92, 246, 0.2), white);
}

.bottom-light {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8rem;
  background: linear-gradient(to top, rgba(139, 92, 246, 0.05), transparent);
}

.logo-section {
  margin-bottom: 2rem;
  position: relative;
  @media (max-width: 768px) {
      margin-bottom: 1rem;
    }
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(to right, #5D9CEC, #A4D7E1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s;

   @media (max-width: 768px) {
      font-size: 1.5rem;
    }
}

.logo-hover-effect {
  position: absolute;
  inset: 0;
  -webkit-background-clip: text;
  background: linear-gradient(to right, rgba(93, 156, 236, 0), rgba(245, 100, 248, 0.05), rgba(93, 156, 236, 0));
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 0.5rem;
}

.logo-section:hover .logo-hover-effect {
  opacity: 1;
}

.menu-section {
  margin-bottom: 2rem;
  @media (max-width: 768px) {
      margin-bottom: 1rem;
    }
}

.menu-title {
  font-size: 1.2rem;
  font-weight: medium;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #5D9CEC, #A4D7E1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
      font-size: 1rem;
    }
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s;

  /* Mobile adjustment */
    @media (max-width: 768px) {
      height: 2rem;
      padding: 0 0.5rem;
    }
}

.nav-item.active {
  background: linear-gradient(to right, rgba(93, 156, 236, 0.4), rgba(245, 100, 248, 0.4));
  color: #A4D7E1;
  font-weight: 500;
  border-right: 3px solid #5D9CEC;

  @media (max-width: 768px) {
      border-right: none;
      border-bottom: 2px solid #5D9CEC;
    }
}

.nav-item.hovered {
  box-shadow: inset 0 0 12px rgba(139, 92, 246, 0.2);
  border-radius: 0.375rem;
}

.light-reflection {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, rgba(93, 156, 236, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 1.5s ease-in-out;
}

.secondary-reflection {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent);
  transform: translateX(-100%);
  transition: transform 2s ease-in-out 0.2s;
}

.gradient-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(93, 156, 236, 0.3), rgba(245, 100, 248, 0.3));
  opacity: 0;
  transition: opacity 0.5s;
}

.nav-item:hover .light-reflection {
  transform: translateX(100%);
}

.nav-item:hover .secondary-reflection {
  transform: translateX(100%);
}

.nav-item:hover .gradient-background {
  opacity: 1;
}

.item-content {
  position: relative;
  z-index: 10;
  transition: color 0.2s;
}

.tooltip {
  position: absolute;
  left: 100%; /* Move to the right of the nav-item */
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Center tooltip vertically */
  background: rgba(255, 255, 255, 0.1);
  color: #E0E0E0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  white-space: nowrap;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s;
  margin-left: 0.5rem; /* Adds a little space between nav-item and tooltip */

  /* Mobile: adjust for side tooltip */
    @media (max-width: 768px) {
      position: relative;
      left: 0;
      top: auto;
      transform: none;
      margin-left: 0;
    }
}

.nav-item:hover .tooltip {
  opacity: 1;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: color 0.3s;
  color: #E0E0E0;

  /* Mobile adjustments */
    @media (max-width: 768px) {
      padding: 0.3rem;
      font-size: 0.9rem;
    }
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
      gap: 0.3rem;
    }
}

.header-title {
  font-weight: bold;
}

.header-icon {
  transition: transform 0.3s;
}

.personal-section,
.general-section {
  margin-bottom: 2rem;
}

.personal-items,
.general-items {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
`;