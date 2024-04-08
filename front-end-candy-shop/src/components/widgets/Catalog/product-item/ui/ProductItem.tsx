import AddToCartButton from "components/shared/ui/Buttons/add-to-cart-button/AddToCartButton";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {IProduct} from "types/product.interface";
import styles from './ProductItem.module.scss';
import ProductRating from "./ProductRating";
const DynamicFavoriteButton = dynamic(() => import("components/shared/ui/Buttons/favorite-button/FavoriteButton"), {ssr: false});

type Props = {
  product: IProduct;
}

const ProductItem = ({product}: Props) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <div className={styles.fav_button}>
          <DynamicFavoriteButton productId={product.id} ></DynamicFavoriteButton>
        </div>
        <Link href={`/product/${product.slug}`}>
          <Image
            width={300}
            height={300}
            src={product.images[0]}
            alt={product?.name}
          />
        </Link>
      </div>
      <div className={styles.info}>
        <span className={styles.price}>{product.price} ₽</span>
        <Link href={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>

        <Link href={`/category/${product.id}`}>
          <span className={styles.category}>
            {product.category?.name}
          </span>
        </Link>
        <ProductRating product={product} />
      </div>
      <div className={styles.cart_button}>
        <AddToCartButton product={product}></AddToCartButton>
      </div>
    </div>
  );
};

export default ProductItem;
