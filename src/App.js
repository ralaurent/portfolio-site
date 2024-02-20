import  React, { useState, useEffect, useRef } from "react"
import { ArrowDown, Menu, Send} from 'lucide-react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { data } from './data/data.js'
import './App.css';
import axios from "axios";

function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
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

  const svgMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700"><defs><radialGradient id="ffflux-gradient">
      <stop offset="0%" stop-color="#0de449"></stop>
      <stop offset="100%" stop-color="hsl(227, 100%, 50%)"></stop>
    </radialGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="2" seed="112" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="29 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>
`
  const svgButtonMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700"><defs><radialGradient id="ffflux-gradient">
      <stop offset="0%" stop-color="#0037ff"></stop>
      <stop offset="100%" stop-color="#7000ff"></stop>
    </radialGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.005 0.003" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="20 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="150" height="45" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>
  `

  const changeTheme = () => {
    console.log("scrolling ")
    const about = document.getElementById("about")
    const navBar = document.getElementById("navbar")
    const content = document.getElementById("content")
    const projects = document.getElementById("projects")
    const slider = document.getElementById("slider")
    if(window.scrollY >= about.offsetTop - 100) {
      // about.style.backgroundImage = "url('https://i.ibb.co/yS05Xnp/Group-8788.png')"
      about.style.backgroundImage = `url('data:image/svg+xml;base64,${btoa(svgMarkup)}')`;
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

  function scrollToContact() {
    if(isOpen) setIsOpen(!isOpen)
    const element = document.getElementById("contact");
  
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

  const submitToGS = async (e) => {
    e.preventDefault()
    const data = {
      Name: name,
      Email: email,
      Message: message
    }
    if(name.length && email.length && message.length){
      const response = await axios.post(process.env.REACT_APP_GOOGLE_SHEETS_URL, data)
      if(response.status == 200){
        setName("")
        setEmail("")
        setMessage("")
        setResponse({ success: "Message successfully sent!" })
      }
    }else{
      setResponse({ error: "Fields can't be empty!" })
    }
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
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.625 0.5C3.41383 0.5 0 3.91383 0 8.125V15.75V31H15.25V23.375C15.25 27.5862 18.6638 31 22.875 31H30.5V15.75H22.875C27.0862 15.75 30.5 12.3362 30.5 8.125C30.5 3.91383 27.0862 0.5 22.875 0.5H15.25H7.625ZM15.25 15.75V23.375C15.25 19.1638 11.8362 15.75 7.625 15.75H15.25Z" fill={theme === "light" ? "black" : "white"}/>
          </svg>
          <div className="nav-buttons">
            <button onClick={scrollToAbout} className={theme === "light" ? "empty-button light" : "empty-button"}>about</button>
            <button onClick={scrollToProjects} className={theme === "light" ? "empty-button light" : "empty-button"}>projects</button>
            <button onClick={scrollToContact} className={theme === "light" ? "filled-button light": "filled-button"}>Let's talk.</button>
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
            <div className="about-description-header">Founder of <span onClick={() => redirectToExternalSite("https://interviewninja.dev/")} className="about-description-header ninja">Interview Ninja</span></div>
            <div className="about-description-subheader">UI/UX Designer, Full-stack Engineer, and AI enthusiast. Welcome to my digital space.</div>
          </div>
          <div className="about-proficiency">
            <div className="about-proficiency-title">My proficiencies</div>
            <div className="about-proficiency-grid">
            {data.map((language) => (
                <div key={language.language} className="about-proficiency-content">
                  <div className="about-proficiency-bar-title">{language.language}</div>
                  <div className="about-proficiency-bar">
                    <div className="about-proficiency-fill-bar" style={{width: `${language.proficiency}%`}}>
                      <div className="loader"></div>
                    </div>
                  </div>
                </div>
            ))}
            </div>
          </div>
        </div>
      </div>
      <div id="projects" className="projects-body">
        <div className="projects-body-title">Projects</div>
        <div className="projects-logos">
          <div className="projects-slide">
            <img onClick={() => redirectToExternalSite("https://interviewninja.dev/")} data-tooltip-id="interviewninja" src="https://i.ibb.co/f0ByMr4/Group-8795.png"/>
            <img onClick={() => redirectToExternalSite("https://sendmo.onrender.com/")} data-tooltip-id="sendmo" src="https://i.ibb.co/dQFG09N/Group-8805.png"/>
            <img onClick={() => redirectToExternalSite("https://api-project-y82w.onrender.com/")} data-tooltip-id="fairbnb" src="https://i.ibb.co/VmQ1bFt/Group-8796.png"/>
            <img onClick={() => redirectToExternalSite("")} data-tooltip-id="breadit" src="https://i.ibb.co/prfcMbm/Group-8799-1.png"/>
            <img onClick={() => redirectToExternalSite("https://twitch-discord-clone.onrender.com/")} data-tooltip-id="bitbyte" src="https://i.ibb.co/LdfrgSg/Group-8794.png"/>
            <img onClick={() => redirectToExternalSite("https://github.com/ralaurent")} data-tooltip-id="ralaurent" src="https://i.ibb.co/ZBdhBtS/Group-8797.png"/>
          </div>
          <div className="projects-slide">
            <img onClick={() => redirectToExternalSite("https://interviewninja.dev/")} data-tooltip-id="interviewninja" src="https://i.ibb.co/f0ByMr4/Group-8795.png"/>
            <img onClick={() => redirectToExternalSite("https://sendmo.onrender.com/")} data-tooltip-id="sendmo" src="https://i.ibb.co/dQFG09N/Group-8805.png"/>
            <img onClick={() => redirectToExternalSite("https://api-project-y82w.onrender.com/")} data-tooltip-id="fairbnb" src="https://i.ibb.co/VmQ1bFt/Group-8796.png"/>
            <img onClick={() => redirectToExternalSite("")} data-tooltip-id="breadit" src="https://i.ibb.co/prfcMbm/Group-8799-1.png"/>
            <img onClick={() => redirectToExternalSite("https://twitch-discord-clone.onrender.com/")} data-tooltip-id="bitbyte" src="https://i.ibb.co/LdfrgSg/Group-8794.png"/>
            <img onClick={() => redirectToExternalSite("https://github.com/ralaurent")} data-tooltip-id="ralaurent" src="https://i.ibb.co/ZBdhBtS/Group-8797.png"/>
          </div>
        </div>
      </div>
      <div id="contact" className="contact-body">
        <form className="contact-content" onSubmit={submitToGS}>
        <div className="contact-body-title">Contact</div>
          <input maxLength={50} value={name} name="Name" onChange={(e) => setName(e.target.value)} placeholder="Your name" className="contact-input"></input>
          <input maxLength={100} value={email} name="Email" onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="contact-input"></input>
          <textarea maxLength={500} value={message} name="Message" onChange={(e) => setMessage(e.target.value)} placeholder="Your message" className="contact-textarea"></textarea>
          <div className="responses">
          { response?.success && <div className="success">{response?.success}</div> }
          { response?.error && <div className="error">{response?.error}</div> }
          </div>
          <button style={{backgroundImage: `url('data:image/svg+xml;base64,${btoa(svgButtonMarkup)}')`}} className="contact-button"> Send
          <Send/>
          </button>
        </form>
      </div>
      <footer>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.25 0.5C2.35051 0.5 0 2.85051 0 5.75V11V21.5H10.5V16.25C10.5 19.1495 12.8505 21.5 15.75 21.5H21V11H15.75C18.6495 11 21 8.6495 21 5.75C21 2.85051 18.6495 0.5 15.75 0.5H10.5H5.25ZM10.5 11V16.25C10.5 13.3505 8.1495 11 5.25 11H10.5Z" fill="#48494C"/>
        </svg>
        <div className="footer-content">Designed and Developed by <b>Ralph Laurent</b></div>
      </footer>
     {viewingHeader && <div onClick={scrollToAbout} className="go-down">
        <ArrowDown className="arrow-down"/>
      </div>}
      {isOpen && <div id="slider" className="slider" ref={sliderRef}>
        <div className="slider-content">
          <div onClick={scrollToAbout}>about</div>
          <div onClick={scrollToProjects}>projects</div>
          <div onClick={scrollToContact}>contact me</div>
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
        id="breadit"
        place="top"
        content="Breadit - reddit.com clone"
      />
      <ReactTooltip
        id="sendmo"
        place="top"
        content="Sendmo - venmo.com clone"
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
