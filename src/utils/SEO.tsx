import Head from 'next/head'
import router, { useRouter } from 'next/router'

export default function SEOPRO({
  title = null || '',
  keywords = null || '',
  author = null || '',
  ogImage = null || '',
  ogImageType = null || '',
  ogImageWidth = null || '',
  ogImageHeight = null || '',
  ogUrl = null || '',
  ogType = null || '',
  ogTitle = null || '',
  ogDescription = null || '',
  ogLocale = null || '',
}) {
  const site = 'https://vgameta.com'
  const canonicalURL = site + useRouter().pathname

  return (
    <Head>
      {canonicalURL.includes('checkout') ? (
        <></>
      ) : (
        <link rel="canonical" href={canonicalURL} />
      )}
      <title>{title && title + ` | `} VGE Meta</title>
      {title && <meta property="og:title" content={title} />}
      {/* {ogImage && (
        <>
          <meta property="og:image:url" content={ogImage} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:secure_url" content={ogImage} />
          {ogDescription && (
            <meta property="og:image:alt" content={ogDescription} />
          )}
          {ogImageType && (
            <meta property="og:image:type" content={ogImageType} />
          )}
          {ogImageWidth && (
            <meta property="og:image:width" content={ogImageWidth} />
          )}
          {ogImageHeight && (
            <meta prefix="og:image:height" content={ogImageHeight} />
          )}
        </>
      )} */}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogLocale && <meta property="og:locale" content={ogLocale} />}
      <meta property="og:site_name" content="" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="white"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="black"
      />
      {/* <meta
        name="description"
        content={'Магазин за детето и бебето Mykiki.bg'}
      /> */}
      <meta name="robots" content="noindex" />
      <meta property="fb:app_id" content="449288403014268" />
      (
      <meta name="keywords" content={` ${keywords && keywords}`} />)
      {author && <meta name="author" content={author} />}
    </Head>
  )
}
