import {useActions} from "hooks/useActions";
import {useAuth} from "hooks/useAuth";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {PropsWithChildren, useEffect} from "react";
import {getAccessToken, getRefreshToken} from "services/auth/auth.helper";
import {TypeComponentAuthFields} from "./auth-page.types";

type Props = PropsWithChildren<TypeComponentAuthFields>;

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {ssr: false})

const AuthProvider = ({Component: {isOnlyUser}, children}: Props) => {
  const {user} = useAuth();
  const {checkAuth, logout} = useActions();
  const {pathname} = useRouter();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) checkAuth();
  }, []);

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (!refreshToken && user) logout();
  }, [pathname]);

  return (
    isOnlyUser ? (
      <DynamicCheckRole Component={{isOnlyUser}}>
        {children}
      </DynamicCheckRole>
    ) : (
      <>{children}</>
    )
  );
};

export default AuthProvider;
