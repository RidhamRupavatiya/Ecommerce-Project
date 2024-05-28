import Layout from '../../componetns/layout/Layout.jsx';
import HeroSection from '../../componetns/heroSection/HeroSection.jsx';
import Filter from '../../componetns/filter/Filter.jsx';
import ProductCard from '../../componetns/productCard/ProductCard.jsx';
import Track from '../../componetns/track/Track.jsx';
import Testimonial from '../../componetns/testimonial/TestiMonials.jsx';

const Home = () => {

  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard/>
      <Track/>
      <Testimonial/>
    </Layout>
  )
}

export default Home
