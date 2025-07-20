import { FaYoutube, FaFacebookF } from "react-icons/fa";
import "./Scholar.css";
import scholars from "../data/scholars";

export default function Scholar() {
  return (
    <div className="scholar-grid">
      {/* Loop through each scholar and render their card */}
      {scholars.map((scholar, idx) => (
        <div className="scholar-card" key={idx}>
          {/* Scholar's image */}
          <img src={scholar.image} alt={scholar.name} className="scholar-img" />

          {/* Scholar's name */}
          <h3 className="scholar-name">{scholar.name}</h3>

          {/* Scholar's short description */}
          <p className="scholar-desc">{scholar.description}</p>

          {/* Social media icons (conditionally rendered) */}
          <div className="scholar-icons">
            {/* Facebook icon, shown only if link exists */}
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

            {/* YouTube icon, shown only if link exists */}
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
