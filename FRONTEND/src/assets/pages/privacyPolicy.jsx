import Footer from "../components/footer";

const PrivscyPolicy = () => {
  return (
    <section>
      <section className="px-20 py-10 privacy-policy font-Outfit w-[60%]">
        <div>
          <h1 className="!text-3xl font-semibold font-Outfit">
            Privacy Policy for Curb Couture
          </h1>
          <p>Effective Date: February 08 2025</p>
        </div>
        <div>
          <div>
            <h1 className="privacy-policy-h1">1. Introduction</h1>
            <p>
              At Curb Couture, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              what information we collect, how we use and share it, and the
              choices you have regarding your data. We operate in India and
              strive to comply with all applicable local data protection laws.
            </p>
          </div>
          <div>
            <h1>2. Information We Collect</h1>
            <h3>
              We collect the following personal data when you interact with our
              website:
            </h3>
            <div>
              <ul>
                <li>
                  <span>Personal Information:</span>
                  <br />
                  <p>
                    Your name, email address, shipping address, and payment
                    details.
                  </p>
                </li>
                <li>
                  <span>How We Collect Data:</span>
                  <br />
                  <p>
                    Information is gathered through registration forms and
                    during the checkout process.
                  </p>
                </li>
                <li>
                  <span>Newsletter Subscription:</span>
                  <p>
                    If you subscribe to our newsletter, we collect your email
                    address.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h1>3. How We Use Your Information</h1>
            <h3>We use your information to:</h3>
            <div>
              <ul>
                <li>Process and fulfill orders</li>
                <li>Provide customer service and support</li>
                <li>Personalize your shopping experience</li>
                <li>
                  Send marketing communications and updates (with your consent)
                </li>
                <li>Improve our products and services</li>
              </ul>
            </div>
          </div>
          <div>
            <h1>4. Information Sharing and Disclosure</h1>
            <div>
              <ul>

                <li>
                  <span>Third Parties:</span>
                  <br />
                  <p>
                    We share your shipping address with our trusted delivery
                    partner, DTDC, to fulfill your orders.
                  </p>
                </li>
                <li>
                  <span>Other Sharing:</span>
                  <br />
                  <p>
                    We do not sell or share your personal information with any
                    other third parties without your consent, except as required
                    by law.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h1>5. Data Security</h1>
            <h3>
              We take the security of your data seriously. Measures include:
            </h3>
            <div>
              <ul>
                <li>
                  <span>Encryption:</span> <br />
                  <p>
                    All transactions and data transmissions are protected by SSL
                    encryption.
                  </p>
                </li>
                <li>
                  <span>Secure Storage:</span> <br />
                  <p>
                    Your personal information is stored securely and is
                    accessible only to authorized personnel.
                  </p>
                </li>
                <li>
                  <span>Regular Audits:</span> <br />
                  <p>
                    We conduct periodic security audits to ensure the highest
                    level of protection.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h1>6. User Rights</h1>
            <h3>You have the right to:</h3>
            <div>
              <ul>
                <li>
                  <span>Access and Update:</span> <br />
                  <p>
                    View and update your personal information at any time via
                    your account settings.
                  </p>
                </li>
                <li>
                  <span>Delete:</span> <br />
                  <p>
                    Request deletion of your personal data if you no longer wish
                    to use our services.
                  </p>
                </li>
                <li>
                  <span>Opt Out:</span> <br />
                  <p>
                    Choose not to receive marketing emails or other
                    communications from us.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h1>7. Cookies and Tracking Technologies</h1>
            <p>
              Currently, we do not use cookies or similar tracking technologies.
              We may implement these features in the near future and will update
              this policy accordingly.
            </p>
          </div>

          <div>
            <h1>8. Public Reviews</h1>
            <p>
              If you post reviews on our website, your username and region may
              be displayed publicly. These reviews are part of our efforts to
              build a transparent community, and no additional personal data is
              collected beyond what you provide.
            </p>
          </div>
        </div>

        <div>
          <h1>9. Changes to This Privacy Policy</h1>
          <p>
            We may update this policy from time to time. Any changes will be
            posted on this page with a revised effective date. We encourage you
            to review the policy periodically.
          </p>
        </div>

        <div>
          <h1>10. Contact Information</h1>
          <p>
            If you have any questions or concerns regarding this Privacy Policy,
            please contact us at [contact@brandname.com]. (Note: Our complete
            contact details will be updated soon.)
          </p>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </section>
  );
};

export default PrivscyPolicy;
