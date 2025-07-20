import { FaYoutube, FaFacebookF } from "react-icons/fa";
import "./Scholar.css";
import scholars from "../data/scholars";

export default function Scholar() {
  return (
    <div className="scholar-grid">
      {scholars.map((scholar, idx) => (
        <div className="scholar-card" key={idx}>
          <img src={scholar.image} alt={scholar.name} className="scholar-img" />
          <h3 className="scholar-name">{scholar.name}</h3>
          <p className="scholar-desc">{scholar.description}</p>

          <div className="scholar-icons">
            {scholar.links?.facebook && (
              <a
                href={scholar.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="icon facebook"
              >
                <FaFacebookF />
              </a>
            )}
            {scholar.links?.youtube && (
              <a
                href={scholar.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="icon youtube"
              >
                <FaYoutube />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
