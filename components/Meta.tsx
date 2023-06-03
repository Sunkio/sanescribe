import Head from 'next/head';

interface MetaProps {
    title: string;
    description: string;
}

const Meta: React.FC<MetaProps> = ({ title, description }) => (
  <Head>
    <title>SaneScribe | {title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="format-detection" content="telephone=yes" />
    <meta name="HandheldFriendly" content="true" />
    <meta charSet="utf-8" />
    <meta name="description" content={description}/>
    <meta name="author" content="Tanja Schmidt" />
    <meta name="robots" content="index, follow" />
    <meta name="og:title" property="og:title" content={`SaneScribe | ${title}`} />
    <meta name="og:description" property="og:description" content={description} />
    <meta name="og:type" property="og:type" content="website" />
    <meta name="og:url" property="og:url" content="https://sanescribe.com" />
      {/*// TODO: add facebook/og img and link it */}
    <meta name="og:image" property="og:image" content="https://sanescribe.com/images/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@sanescribe" />
    <meta name="twitter:creator" content="@sanescribe" />
    <meta name="twitter:title" content={`SaneScribe | ${title}`} />
    <meta name="twitter:description" content={description} />
      {/*// TODO: add twitter img and link it */}
    <meta name="twitter:image" content="https://sanescribe.com/images/og-image.png" />
    <meta name="twitter:image:alt" content="SaneScribe | A Next.JS Blog Template" />
    <link rel="icon" href="favicon.ico?v=2" />
  </Head>
);

export default Meta;
