import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity";
import { Post, Category } from "../typings";
import { client } from "../lib/client";


interface Props {
    posts: Post[];
    categories: Category[];
}

export default function Home({ posts, categories }: Props) {
  return (
    <div>
      <Head>
        <title>SaneScribe | A Next.JS Blog Template</title>
        <link rel="icon" href="favicon.ico?v=2" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header categories={categories}/>
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        <Banner />
        {/* ============ Banner End here ============== */}
        <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div>
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6 px-4">
            {
                posts.map((post) => (
                    <Link key={post._id} href={`/post/${post.slug.current}`}>
                        <div className="border-[1px] border-secondaryColor borderOpacity-40 h-[450px] group">
                            <div className="h-3/5 w-full overflow-hidden">
                               <Image
                                   alt={post.title}
                                   width={380}
                                   height={350}
                                   src={urlFor(post.mainImage).url()}
                                   className="w-full h-full object-cover brightness-75 group-hover:brightness-100
                                   transition duration-500 group-hover:scale-110 ease-in-out"
                               />
                            </div>
                            <div className="h-2/5 w-full flex flex-col justify-center">
                                <div className="flex justify-between items-enter px-4 py-1 border-b-[1px] border-b-gray-500">
                                    <p className="text-2xl font-bold text-primaryColor group-hover:text-secondaryColor">{post.title}</p>
                                    <img src={urlFor(post.author.image).url()!} alt={post.author.name}
                                         className="w-10 h-10 rounded-full" />
                                </div>
                                <p className="text-sm text-gray-500">{post.description.substring(0, 80)}... -
                                    <span className="italic">by
                                        <span className="font-semibold">{post.author.name}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
    const query = `*[_type == "post"] {
      _id,
        title,
        author -> {
          name,
          image
        },
        description,
        mainImage,
        slug
    }`;
    const posts = await sanityClient.fetch(query);

    const categories = await client.fetch(`*[_type == "category"] | order(order asc){ title, description, slug, 
      _id }`);
    
    console.log('Fetched categories:', categories);

    return {
        props: {
            posts,
            categories: categories || [],
        },
    }
}
