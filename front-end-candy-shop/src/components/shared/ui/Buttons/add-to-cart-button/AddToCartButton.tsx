'use client'
import {classNames} from "components/shared/lib/classNames/classNames";
import {useActions} from "hooks/useActions";
import {useCart} from "hooks/useCart";
import {BiCart, BiSolidCart} from "react-icons/bi";
import {IProduct} from "types/product.interface";
import BaseButton from "../base-button/BaseButton";
import styles from './AddToCartButton.module.scss';

type Props = {
  product: IProduct;
}

const AddToCartButton = ({product}: Props) => {
  const {addToCart, removeFromCart} = useActions();

  const {items} = useCart();

  const currentElement = items.find(cartItem => cartItem.product.id === product.id)

  const handleClick = () => {
    if (currentElement) {
      removeFromCart({id: currentElement.id})
    } else {
      addToCart({
        product,
        quantity: 1,
        price: product.price
      })
    }
  }
  const mods = {
    [styles.active]: !!currentElement
  }

  return (
    <BaseButton
      onClick={handleClick}
      className={classNames(styles.button, mods)}
    >
      <span className={styles.text}>В корзину </span>
      {currentElement ? <BiSolidCart /> : <BiCart />}
    </BaseButton>
  );
};

export default AddToCartButton;
