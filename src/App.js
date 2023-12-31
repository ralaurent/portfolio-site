import  React, { useState, useEffect, useRef } from "react"
import { ArrowDown, Menu } from 'lucide-react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { data } from './data/data.js'
import './App.css';

function App() {
  const [isEmpty, setIsEmpty] = useState(0)
  const [theme, setTheme] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [viewingHeader, setViewingHeader] = useState(true)
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const changeTheme = () => {
    const about = document.getElementById("about")
    const navBar = document.getElementById("navbar")
    const content = document.getElementById("content")
    const slider = document.getElementById("slider")
    if(window.scrollY >= about.offsetTop - 100) {
      about.style.backgroundImage = "url('https://i.ibb.co/yS05Xnp/Group-8788.png')"
      about.style.backgroundSize = "cover"
      about.style.backgroundPosition = "center"
      about.style.backgroundRepeat = "no-repeat"
      content.style.display = "flex"
      setViewingHeader(false)
    }else{
      about.style.backgroundColor = "black"
      about.style.backgroundImage = "url(none)"
      content.style.display = "none"
      setViewingHeader(true)
    }
    if(window.scrollY >= about.offsetTop){
      setTheme("light")
    }else{
      setTheme("")
    }
  }

  window.addEventListener('scroll', changeTheme)

  function scrollToAbout() {
    if(isOpen) setIsOpen(!isOpen)
    const element = document.getElementById("about");
  
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  function scrollToProjects() {
    if(isOpen) setIsOpen(!isOpen)
    const element = document.getElementById("projects");
  
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  const redirectToExternalSite = (url) => {
    window.location.href = url;
  }

  const openSlider = (e) => {
    e.stopPropagation() 
    setIsOpen(true)
  }

  useEffect(() => {
    const timeout = setInterval(() => {
      if(isEmpty >= 0) setIsEmpty(isEmpty => isEmpty + 1)
      if(isEmpty >= 2) setIsEmpty(0)
    }, 2000)

    return () => clearInterval(timeout)
  }, [isEmpty])

  return (
    <div className="container">
      <nav id="navbar">
      <div className="nav">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M15 15L15 0H22.5C26.6421 0 30 3.35786 30 7.5V7.5C30 11.6421 26.6421 15 22.5 15H15Z" fill={theme === "light" ? "black" : "white"}/>
            <path d="M0 7.5C0 3.35786 3.35787 0 7.5 0H15V15H0V7.5Z" fill={theme === "light" ? "black" : "white"}/>
            <path d="M15 22.5C15 18.3579 11.6421 15 7.5 15H0V30H15V22.5Z" fill={theme === "light" ? "black" : "white"}/>
            <path d="M30 15H15V22.5C15 26.6421 18.3579 30 22.5 30H30V15Z" fill={theme === "light" ? "black" : "white"}/>
          </svg>
          <div className="nav-buttons">
            <button onClick={scrollToAbout} className={theme === "light" ? "empty-button light" : "empty-button"}>about</button>
            <button onClick={scrollToProjects} className={theme === "light" ? "empty-button light" : "empty-button"}>projects</button>
            <button className={theme === "light" ? "filled-button light": "filled-button"}>Let's talk.</button>
          </div>
          <Menu onClick={openSlider} className={theme === "light" ? "menu light" : "menu"}/>
      </div>
      </nav>
      <div className="header">
        <div className={isEmpty === 0 ? 'empty' : 'filled'}>Hey, I'm Ralph</div>
        <div className={isEmpty === 1 ? 'empty' : 'filled'}>Hey, I'm Ralph</div>
        <div className={isEmpty === 2 ? 'empty' : 'filled'}>Hey, I'm Ralph</div>
      </div>
      <div id="about" className="about-body">
        <div id="content" className="about-content">
          <div className="about-description">
            <div className="about-description-title">Ralph Laurent</div>
            <div className="about-description-header">Founder of <span onClick={() => redirectToExternalSite("")} className="about-description-header ninja">Interview Ninja</span></div>
            <div className="about-description-subheader">UI/UX Designer, Full Stack Engineer, and AI enthusiast. Welcome to my digital space.</div>
          </div>
          <div className="about-proficiency">
            <div className="about-proficiency-title">My proficiencies</div>
            <div className="about-proficiency-grid">
            {data.map((language) => (
              <>
                <div className="about-proficiency-content">
                  <div className="about-proficiency-bar-title">{language.language}</div>
                  <div className="about-proficiency-bar">
                    <div className="about-proficiency-fill-bar" style={{width: `${language.proficiency}%`}}>
                      <div className="loader"></div>
                    </div>
                  </div>
                </div>
              </>
            ))}
            </div>
          </div>
        </div>
      </div>
      <div id="projects" className="projects-body">
        <div className="projects-body-title">Projects</div>
        <div className="projects-logos">
          <div className="projects-slide">
            <img onClick={() => redirectToExternalSite("")} data-tooltip-id="interviewninja" src="https://i.ibb.co/f0ByMr4/Group-8795.png"/>
            <img onClick={() => redirectToExternalSite("")} data-tooltip-id="bitbyte" src="https://i.ibb.co/LdfrgSg/Group-8794.png"/>
            <img onClick={() => redirectToExternalSite("")} data-tooltip-id="fairbnb" src="https://i.ibb.co/VmQ1bFt/Group-8796.png"/>
            <img onClick={() => redirectToExternalSite("https://github.com/ralaurent")} data-tooltip-id="ralaurent" src="https://i.ibb.co/ZBdhBtS/Group-8797.png"/>
          </div>
          <div className="projects-slide">
            <img onClick={() => redirectToExternalSite("")} data-tooltip-id="interviewninja" src="https://i.ibb.co/f0ByMr4/Group-8795.png"/>
            <img onClick={() => redirectToExternalSite("")} data-tooltip-id="bitbyte" src="https://i.ibb.co/LdfrgSg/Group-8794.png"/>
            <img onClick={() => redirectToExternalSite("")} data-tooltip-id="fairbnb" src="https://i.ibb.co/VmQ1bFt/Group-8796.png"/>
            <img onClick={() => redirectToExternalSite("https://github.com/ralaurent")} data-tooltip-id="ralaurent" src="https://i.ibb.co/ZBdhBtS/Group-8797.png"/>
          </div>
        </div>
      </div>
      <footer>
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path d="M10.5 10.5V0H15.75C18.6495 0 21 2.35051 21 5.25V5.25C21 8.14949 18.6495 10.5 15.75 10.5H10.5Z" fill="#48494C"/>
        <path d="M0 5.25C0 2.35051 2.35051 0 5.25 0H10.5V10.5H0V5.25Z" fill="#48494C"/>
        <path d="M10.5 15.75C10.5 12.8505 8.14949 10.5 5.25 10.5H0V21H10.5V15.75Z" fill="#48494C"/>
        <path d="M21 10.5H10.5V15.75C10.5 18.6495 12.8505 21 15.75 21H21V10.5Z" fill="#48494C"/>
      </svg>
        <div className="footer-content">Designed and Created by <b>Ralph Laurent</b></div>
      </footer>
     {viewingHeader && <div onClick={scrollToAbout} className="go-down">
        <ArrowDown className="arrow-down"/>
      </div>}
      {isOpen && <div id="slider" className="slider" ref={sliderRef}>
        <div className="slider-content">
          <div onClick={scrollToAbout}>about</div>
          <div onClick={scrollToProjects}>projects</div>
          <div>contact me</div>
        </div>
      </div>}
      <ReactTooltip
        id="interviewninja"
        place="top"
        content="Interview Ninja - A.I. Coding Interview Assitant"
      />
      <ReactTooltip
        id="bitbyte"
        place="top"
        content="BitByte - kick.com live streaming clone"
      />
      <ReactTooltip
        id="fairbnb"
        place="top"
        content="FairBnB - airbnb.com clone"
      />
      <ReactTooltip
        id="ralaurent"
        place="top"
        content="ralaurent - github.com"
      />
    </div>
  );
}

export default App;
