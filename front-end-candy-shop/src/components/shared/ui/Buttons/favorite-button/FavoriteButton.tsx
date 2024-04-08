'use client'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "hooks/useAuth";
import {useProfile} from "hooks/useProfile";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {UserService} from "services/user/user.service";
import BaseButton from "../base-button/BaseButton";
import styles from './FavoriteButton.module.scss';

type Props = {
  productId: number;
}

const FavoriteButton = ({productId}: Props) => {
  const {user} = useAuth();

  const {profile} = useProfile();
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationKey: ['toggle favorite'],
    mutationFn: () => UserService.toggleFavorite(productId),
    onSuccess: () => queryClient.invalidateQueries(['get profile'])
  })
  const isExists = profile?.favorites?.some(favorite => favorite.id === productId);

  if (!user) return null;

  return (
    <BaseButton
      onClick={() => {
        mutate()
      }}
      className={styles.button}
    >
      {isExists ? <AiFillHeart /> : <AiOutlineHeart />}
    </BaseButton>
  );
};

export default FavoriteButton;
