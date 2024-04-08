
import Catalog from "components/widgets/Catalog/ui/catalog/Catalog";
import {NextPage} from "next";
import {ProductService} from "services/product/product.service";

const HomePage: NextPage = async () => {
  const data = await ProductService.getAll({
    page: 1,
    perPage: 10
  })
  return (
    < >
      {/*Carousel*/}
      <Catalog
        data={data || []}
        title="Мобильные телефоны"
        isPagination
      />
    </>
  );
}

export default HomePage
