import "./About.css";

function About() {
  return (
    <div className="aboutMainContent">
      <div className="aboutHero">
        <h1>About Sports Zaga</h1>
        <p className="aboutHeroSubtitle">
          We are a one-stop destination for premium sports equipment offering
          sales, rentals, repairs, and full customization to help athletes
          perform at their best.
        </p>
      </div>

      <hr className="aboutDivider" />

      <div className="aboutSection">
        <h2>What We Offer</h2>
        <div className="aboutValuesGrid">
          <div className="aboutValueCard">
            <i className="bx bx-shopping-bag"></i>
            <h3>Shop</h3>
            <p>
              Browse and purchase a curated selection of sports equipment from
              trusted brands.
            </p>
          </div>

          <div className="aboutValueCard">
            <i className="bx bx-transfer-alt"></i>
            <h3>Rent</h3>
            <p>
              Rent gear for short-term use — perfect for tryouts, events, or
              seasonal play.
            </p>
          </div>

          <div className="aboutValueCard">
            <i className="bx bx-wrench"></i>
            <h3>Repair</h3>
            <p>
              Submit repair requests for damaged equipment and track progress
              through your dashboard.
            </p>
          </div>

          <div className="aboutValueCard">
            <i className="bx bx-paint"></i>
            <h3>Customize</h3>
            <p>
              Design your own gear — choose colors, materials, weight, and
              more for a truly personal touch.
            </p>
          </div>

          <div className="aboutValueCard">
            <i className="bx bx-package"></i>
            <h3>Track Orders</h3>
            <p>
              Stay updated on your purchases, rentals, and customizations in
              real time from your profile.
            </p>
          </div>

          <div className="aboutValueCard">
            <i className="bx bx-star"></i>
            <h3>Review</h3>
            <p>
              Share your experience and help other athletes make informed
              choices with honest reviews.
            </p>
          </div>
        </div>
      </div>

      <div className="aboutContact">
        <div className="aboutContactInfo">
          <h2>Get in Touch</h2>
          <p>Have questions or need support? We're here to help.</p>
        </div>
        <a href="#">
          <button className="aboutContactBtn">Contact Us</button>
        </a>
      </div>
    </div>
  );
}

export default About;
