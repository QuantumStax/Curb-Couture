import Footer from "../components/footer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

const PrivscyPolicy = () => {
  // States for indicating copy success
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Generic copy function that accepts text and a setter function
  const handleCopy = (text, setCopied) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <section>
      {/* Main container: stacks vertically on small screens, side-by-side on md+ */}
      <section className="flex flex-col md:flex-row items-start gap-8 md:gap-24 px-4 md:px-20 py-10">
        {/* Privacy Policy Content */}
        <section className="flex-1 px-4 py-10 font-Outfit">
          <div>
            <h1 className="text-3xl font-semibold font-Outfit">
              Privacy Policy for Curb Couture
            </h1>
            <p className="mt-1 text-sm md:text-base">
              Effective Date: February 08 2025
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">1. Introduction</h2>
            <p>
              At Curb Couture, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              what information we collect, how we use and share it, and the
              choices you have regarding your data. We operate in India and
              strive to comply with all applicable local data protection laws.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold">
              We collect the following personal data when you interact with our
              website:
            </h3>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                <span className="font-semibold">Personal Information:</span>{" "}
                Your name, email address, shipping address, and payment details.
              </li>
              <li>
                <span className="font-semibold">How We Collect Data:</span>{" "}
                Information is gathered through registration forms and during
                the checkout process.
              </li>
              <li>
                <span className="font-semibold">Newsletter Subscription:</span>{" "}
                If you subscribe to our newsletter, we collect your email
                address.
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">
              3. How We Use Your Information
            </h2>
            <h3 className="text-xl font-semibold">
              We use your information to:
            </h3>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Process and fulfill orders</li>
              <li>Provide customer service and support</li>
              <li>Personalize your shopping experience</li>
              <li>
                Send marketing communications and updates (with your consent)
              </li>
              <li>Improve our products and services</li>
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">
              4. Information Sharing and Disclosure
            </h2>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                <span className="font-semibold">Third Parties:</span> We share
                your shipping address with our trusted delivery partner, DTDC,
                to fulfill your orders.
              </li>
              <li>
                <span className="font-semibold">Other Sharing:</span> We do not
                sell or share your personal information with any other third
                parties without your consent, except as required by law.
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">5. Data Security</h2>
            <h3 className="text-xl font-semibold">
              We take the security of your data seriously. Measures include:
            </h3>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                <span className="font-semibold">Encryption:</span> All
                transactions and data transmissions are protected by SSL
                encryption.
              </li>
              <li>
                <span className="font-semibold">Secure Storage:</span> Your
                personal information is stored securely and is accessible only
                to authorized personnel.
              </li>
              <li>
                <span className="font-semibold">Regular Audits:</span> We
                conduct periodic security audits to ensure the highest level of
                protection.
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">6. User Rights</h2>
            <h3 className="text-xl font-semibold">You have the right to:</h3>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                <span className="font-semibold">Access and Update:</span> View
                and update your personal information via your account settings.
              </li>
              <li>
                <span className="font-semibold">Delete:</span> Request deletion
                of your personal data if you no longer wish to use our services.
              </li>
              <li>
                <span className="font-semibold">Opt Out:</span> Choose not to
                receive marketing emails or other communications from us.
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">
              7. Cookies and Tracking Technologies
            </h2>
            <p>
              Currently, we do not use cookies or similar tracking technologies.
              We may implement these features in the near future and will update
              this policy accordingly.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">8. Public Reviews</h2>
            <p>
              If you post reviews on our website, your username and region may
              be displayed publicly. These reviews are part of our efforts to
              build a transparent community, and no additional personal data is
              collected beyond what you provide.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this policy from time to time. Any changes will be
              posted on this page with a revised effective date. We encourage
              you to review the policy periodically.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">10. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding this Privacy
              Policy, please contact us at curbcouture@gmail.com. (Note: Our
              complete contact details will be updated soon.)
            </p>
          </div>
        </section>

        {/* Sticky Contact Sidebar */}
        <section className="sticky top-10 bg-secondary_2 text-primary_2 border border-secondary_2 py-4 px-8 font-Outfit w-full md:w-[35%] self-start">
          <h2 className="font-semibold text-2xl uppercase">
            Contact Information
          </h2>
          <hr className="my-4" />
          <div className="space-y-4">
            {/* Phone Section */}
            <div>
              <div className="flex items-center gap-2">
                <LocalPhoneIcon />
                <h3 className="text-xl font-semibold">Phone Number</h3>
                {copiedPhone ? (
                  <CheckCircleIcon className="cursor-pointer text-green-500" />
                ) : (
                  <ContentCopyIcon
                    className="cursor-pointer"
                    onClick={() => handleCopy("+91 1234567890", setCopiedPhone)}
                  />
                )}
              </div>
              <p className="text-lg">+91 1234567890</p>
            </div>
            {/* Email Section */}
            <div>
              <div className="flex items-center gap-2">
                <EmailIcon />
                <h3 className="text-xl font-semibold">Email</h3>
                {copiedEmail ? (
                  <CheckCircleIcon className="cursor-pointer text-green-500" />
                ) : (
                  <ContentCopyIcon
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopy("curbcouture@gmail.com", setCopiedEmail)
                    }
                  />
                )}
              </div>
              <p className="text-lg">curbcouture@gmail.com</p>
            </div>
          </div>
        </section>
      </section>

      <section>
        <Footer />
      </section>
    </section>
  );
};

export default PrivscyPolicy;
