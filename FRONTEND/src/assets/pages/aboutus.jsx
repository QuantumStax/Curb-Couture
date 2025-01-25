import HeaderTopDeals from "../components/headerTopDeals";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Nav from "../components/nav2";
const AboutUs = () => {
  return (
    <article>
      <section>
        <HeaderTopDeals />
        <Nav />
        <Hero />
      </section>
      <section>
        <h1>About Us</h1>
      </section>
      <section>
        <Footer />
      </section>
    </article>
  );
};

export default AboutUs;
