// src/pages/public/HomePage.tsx
import '../../styles/HomePage.css';

export interface HomePageProps {
  onBrowseCourses: () => void;
  onRegister: () => void;
}

export default function HomePage({ onBrowseCourses, onRegister }: HomePageProps) {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <div className="three-column-layout">
          
          {/* Left Column */}
          <div className="home-column left-column">
            <div className="column-image">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-icon">📚</span>
                  <p>Student studeer</p>
                </div>
              </div>
            </div>
            <div className="column-banner" onClick={onBrowseCourses}>
              Ek soek kursusse
            </div>
          </div>

          {/* Center Column */}
          <div className="home-column center-column">
            <div className="center-content">
              <h2 className="center-heading">
                ONS NUWE GEVORDERDE LEER PLATFORM
              </h2>
              <div className="center-logo-section">
                <div className="logo-graphic">
                  <div className="graphic-building">📖</div>
                  <div className="graphic-elements">
                    <span className="graphic-icon">🌱</span>
                    <span className="graphic-icon">🌱</span>
                  </div>
                </div>
                <div className="center-logo-text">
                  <h1 className="center-logo-title">KURSUS IDEAS</h1>
                  <p className="center-logo-subtitle">NET 'N KLIEK WEG</p>
                </div>
              </div>
              <button className="center-button" onClick={onBrowseCourses}>
                KLIEK HIER
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="home-column right-column">
            <div className="column-image">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-icon">🎓</span>
                  <p>Leer omgeving</p>
                </div>
              </div>
            </div>
            <div className="column-banner" onClick={onRegister}>
              Ek wil registreer
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="homepage-bottom">
          <h2 className="bottom-heading">
            <span className="heading-pink">Liewe</span>{' '}
            <span className="heading-black">amper student</span>
          </h2>
          <div className="bottom-text">
            <p>
              Kan jy glo jy is hier en begin jou leerreis? Ons is baie opgewonde
              saam met jou oor die opwindende avontuur waarop jy tans is! Ons
              leerplatform bied jou toegang tot kwaliteit kursusse wat jou sal
              help om te groei en te ontwikkel.
            </p>
            <p>
              Onthou jou leerpad is jou pad: of dit nou groot kursusse, klein
              modules, 10 of 100 lesse is, in jou eie tyd of volgens 'n skedule,
              dit maak nie saak nie, solank jy leer en groei!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
