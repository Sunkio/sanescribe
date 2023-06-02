import Head from 'next/head';

const Meta = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="format-detection" content="telephone=yes" />
    <meta name="HandheldFriendly" content="true" />
    <meta charSet="utf-8" />
    <meta name="description" content="SaneScribe is a Next.JS blog template that uses Sanity.io as a headless CMS." />
    <meta name="author" content="Tanja Schmidt" />
    <meta name="robots" content="index, follow" />
    <meta name="og:title" property="og:title" content="SaneScribe | A Next.JS Blog Template" />
    <meta name="og:description" property="og:description" content="SaneScribe is a Next.JS blog template that uses Sanity.io as a headless CMS." />
    <meta name="og:type" property="og:type" content="website" />
    <meta name="og:url" property="og:url" content="https://sanescribe.com" />
    <meta name="og:image" property="og:image" content="https://sanescribe.com/images/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@sanescribe" />
    <meta name="twitter:creator" content="@sanescribe" />
    <meta name="twitter:title" content="SaneScribe | A Next.JS Blog Template" />
    <meta name="twitter:description" content="SaneScribe is a Next.JS blog template that uses Sanity.io as a headless CMS." />
    <meta name="twitter:image" content="https://sanescribe.com/images/og-image.png" />
    <meta name="twitter:image:alt" content="SaneScribe | A Next.JS Blog Template" />

        <title>SaneScribe | A Next.JS Blog Template</title>
        <link rel="icon" href="favicon.ico?v=2" />
  </Head>
);

export default Meta;
