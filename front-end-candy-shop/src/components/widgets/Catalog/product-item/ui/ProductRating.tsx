'use client'
import {useState} from "react";
import {FaStar} from "react-icons/fa6";
import {TbMessageCircle2Filled} from "react-icons/tb";
import {IProduct} from "types/product.interface";
import styles from './ProductItem.module.scss';

type Props = {
  product: IProduct;
}

const ProductRating = ({product}: Props) => {

  const [rating, setRating] = useState<number>(
    product.reviews.reduce((acc, review) => acc +
      review.rating, 0) / product.reviews.length
    || 0
  )
  if (!rating) return null;

  return (
    <div className={styles.reviews}>
      <span className={styles.star}>
        <FaStar />
        <span className={styles.rating}>{rating}</span>
      </span>
      <span className={styles.message}>
        <TbMessageCircle2Filled />
        {product?.reviews?.length} отзыва
      </span>
    </div>
  );
};

export default ProductRating;
