'use client'

import {useAuth} from "hooks/useAuth";
import {useRouter} from "next/router";
import {PropsWithChildren} from "react";
import {TypeComponentAuthFields} from "./auth-page.types";

type Props = PropsWithChildren<TypeComponentAuthFields>;

const CheckRole = ({Component: {isOnlyUser}, children}: Props) => {
  const {user} = useAuth();
  const router = useRouter();

  if (user && isOnlyUser) return <>{children}</>;

  if (!user) {
    router.pathname !== '/auth' && router.replace('/auth');
    return null
  }

};

export default CheckRole;
