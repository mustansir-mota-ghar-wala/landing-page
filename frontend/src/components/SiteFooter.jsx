import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4" data-reveal>
            <h3>CA Dashboard</h3>
            <p className="mb-2">Practice management for CA and CS firms.</p>
            <p className="mb-0">Orgpro Softwares Private Limited, Bibwewadi, Pune.</p>
          </div>
          <div className="col-6 col-md-2" data-reveal>
            <h3>Product</h3>
            <p className="mb-1"><Link to="/">Home</Link></p>
            <p className="mb-1"><Link to="/product">Features</Link></p>
            <p className="mb-1"><Link to="/pricing">Pricing</Link></p>
            <p className="mb-1"><Link to="/sme">For SME</Link></p>
            <p className="mb-0"><Link to="/trial">Free trial</Link></p>
          </div>
          <div className="col-6 col-md-3" data-reveal>
            <h3>Company</h3>
            <p className="mb-1"><Link to="/about">About</Link></p>
            <p className="mb-1"><Link to="/customers">Customers</Link></p>
            <p className="mb-1"><Link to="/faq">FAQ</Link></p>
            <p className="mb-0"><Link to="/contact">Contact</Link></p>
          </div>
          <div className="col-md-3" data-reveal>
            <h3>Talk to us</h3>
            <p className="mb-1"><a href="tel:+919689093892">+91 96890 93892</a></p>
            <p className="mb-1"><a href="mailto:sales@cadashboard.com">sales@cadashboard.com</a></p>
            <p className="mb-0">Support weekdays, 10 AM to 7 PM IST.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
