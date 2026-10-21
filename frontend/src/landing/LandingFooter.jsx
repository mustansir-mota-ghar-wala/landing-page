import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";

export default function LandingFooter() {
  return (
    <footer className="cine-foot">
      <div className="cine-wrap foot-top">
        <div className="foot-brand">
          <Link className="cine-logo" to="/" data-reveal>
            <BrandMark />
            CA Dashboard
          </Link>
          <p className="foot-tag" data-reveal>Smarter Practice. Stronger CA Firms.</p>
        </div>
        <nav>
          <Link to="/" data-reveal>Home</Link>
          <Link to="/product" data-reveal>Features</Link>
          <Link to="/sme" data-reveal>Solutions</Link>
          <Link to="/pricing" data-reveal>Pricing</Link>
          <Link to="/faq" data-reveal>Resources</Link>
        </nav>
      </div>
      <div className="cine-wrap cine-legal">
        <span data-reveal>© 2026 Orgpro Softwares Private Limited</span>
        <span>
          <Link to="/privacy" data-reveal>Privacy Policy</Link>
          <Link to="/terms" data-reveal>Terms of Service</Link>
          <Link to="/contact" data-reveal>Contact Us</Link>
          <a href="tel:+919689093892" data-reveal>+91 96890 93892</a>
        </span>
      </div>
    </footer>
  );
}
