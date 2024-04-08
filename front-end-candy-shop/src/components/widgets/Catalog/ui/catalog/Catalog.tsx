'use client'
import {useQuery} from "@tanstack/react-query";
import Loader from "components/shared/loader/ui/Loader";
import PrimaryButton from "components/shared/ui/Buttons/primary-button/PrimaryButton";
import {useState} from "react";
import {ProductService} from "services/product/product.service";
import {EnumProductSort, TypePaginationProducts} from "services/product/product.types";
import ProductItem from "../../product-item/ui/ProductItem";
import SortDropdown from "../sort-dropdown/SortDropdown";
import styles from './Catalog.module.scss';

type Props = {
  data: TypePaginationProducts;
  title?: string;
  isPagination?: boolean;
}

const Catalog = ({data, title, isPagination = false}: Props) => {
  const [sortType, setSortType] = useState<EnumProductSort>(EnumProductSort.NEWEST);
  const [page, setPage] = useState<number>(1);

  const {data: response, isLoading} = useQuery({
    queryKey: ['products', sortType, page],
    queryFn: () => ProductService.getAll({
      sort: sortType,
      page,
      perPage: 4
    }),
    initialData: data
  })

  const onChangeSortType = (type: any) => {
    if (!type.value) return;
    setSortType(type.value);
  }

  if (isLoading) return <Loader />

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && <p className={styles.heading}>{title}</p>}
        {isPagination && <SortDropdown onChange={onChangeSortType} />}
      </div>
      {response.products.length ? (
        <>
          <div className={styles.wrapper}>
            {response.products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          {isPagination &&
            <div className={styles.load_more_button}>
              <PrimaryButton
                onClick={() => setPage(prevPage => prevPage + 1)}          
              >
                Ещё
              </PrimaryButton>
            </div>
          }
        </>
      ) : (
        <div>Список товаров пуст</div>
      )}
    </section>
  );
};

export default Catalog;
