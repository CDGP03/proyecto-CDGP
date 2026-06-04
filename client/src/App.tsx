import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HexBackground from "./components/HexBackground";
 
function App() {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
 
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
 
  return (
    <>
      {/* Fondo de hexágonos — detrás de todo */}
      <HexBackground />
 
      {/* Contenido principal — encima del fondo */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar onNavigate={handleNavigate} />
 
        <Hero
          onContactClick={() => handleNavigate("contacto")}
          onPortfolioClick={() => handleNavigate("habilidades")}
        />
 
        <AboutMe />
        <Skills />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
 
export default App;