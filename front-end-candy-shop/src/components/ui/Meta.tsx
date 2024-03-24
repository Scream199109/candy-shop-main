import Head from "next/head";
import {useRouter} from "next/router";
import {PropsWithChildren} from "react";

interface ISeo {
  title: string;
  description?: string;
  image?: string;
}

type Props = PropsWithChildren<ISeo>;

export const titleMerge = (title: string) => `${title} | candy-shop`

const Meta = ({
  title,
  description,
  image,
  children
}: Props) => {
  const {asPath} = useRouter();
  const currentUrl = `${process.env.APP_URL}${asPath}`;
  const siteName = 'candy-shop';
  return (
    <>
      <Head>
        <title itemProp="headline">{titleMerge(title)}</title>
        {description ? (
          <>
            <meta
              itemProp="description"
              name="description"
              content={description}
            />
            <link rel="cannonical" href={currentUrl} />
            <meta property="og:locale" content="ru" />
            <meta property="og:title" content={titleMerge(title)} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image || '/favicon.svg'} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:description" content={description} />
          </>
        ) : (
          <meta property="robots" content='noindex, nofollow' />
        )}
      </Head>
      {children}
    </>
  )
}

export default Meta;
