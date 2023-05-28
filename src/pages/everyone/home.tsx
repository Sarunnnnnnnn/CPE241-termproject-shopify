import Category from "../../components/everyone/category";
import Ad from "../../components/everyone/ad";
import PopularItems from "../../components/everyone/popularItems";
import BrandAd from "../../components/everyone/brandAd";
import TopProduct from "../../components/everyone/topProduct";
import Recommended from "../../components/everyone/recommended";
import Footer from "../../components/everyone/footer";

const Home: React.FC = () => {
  return (
    <div>
      <Category />
      <Ad />
      <PopularItems />
      <BrandAd />
      <TopProduct />
      <Recommended />
      <Footer />
    </div>
  );
};

export default Home;
