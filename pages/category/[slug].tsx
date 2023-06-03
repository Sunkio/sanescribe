import { useRouter } from 'next/router';
import { sanityClient, urlFor } from '../../sanity';
import { Category, Post } from '../../typings';
import Meta from '../../components/Meta';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPropsContext } from 'next';
//import { client } from '../../lib/client';

interface Props {
  category: Category;
  posts: Post[];
  allCategories: Category[];
}

const CategoryPage: React.FC<Props> = ({ posts, category, allCategories }: Props) => {
   console.log("Posts for category:", posts);
 const isFallback = useRouter().isFallback;

  if (isFallback) {
    return (
      <>
        <Header categories={allCategories} fallback={isFallback} />
        <div>Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Meta title={category.title} description={category.description} />
      <Header categories={allCategories || []} />
      <h1>{category.title}</h1>
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
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  const categories = await sanityClient.fetch<Category[]>(`*[_type == "category"]`);
  const paths = categories.map((category) => ({
    params: { slug: category.slug.current },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug;

  // Fetch all categories
  const allCategories: Category[] = await sanityClient.fetch(`*[_type == "category"] | order(order asc)`);

  // Fetch the category with the given slug
  const category: Category = await sanityClient.fetch(`*[_type == "category" && slug.current == $slug][0]`, {
    slug,
  });

// Fetch the posts related to the fetched category
const posts: Post[] = await sanityClient.fetch(`*[_type == "post" && references($categoryId)]{
  _id, title, slug, mainImage, description,
  author-> {name, image}
}`, { categoryId: category._id });

  return {
    props: {
      allCategories,
      category,
      posts,
    },
    revalidate: 1,
  };
}

export default CategoryPage;