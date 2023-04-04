import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import {sanityClient, urlFor} from "../../sanity";
import {GetStaticProps} from "next";
import {Post} from "../../typings";
import PortableText from "react-portable-text";


interface Props {
    post: Post;
}

const Post = ({post}: Props) => {
    return (
        <div>
            <Header />
            <img
                alt={post.title}
                src={urlFor(post.mainImage).url()!}
                className="w-full h-96 object-cover"
            />
            <div className="max-w-3xl mx-auto">
               <article className="w-full mx-auto p-5 bg-secondaryColor/10 sm:px-6 lg:px-8 py-8">
                <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800
                mt-10 mb-3">
                    {post.title}
                </h1>
                   <h2 className="text-sm text-gray-500 mb-3">
                       {post.description}
                   </h2>
                   <div className="flex items-center gap-2">
                       <img
                           className="w-10 h-10 rounded-full object-cover bg-red-500"
                           src={urlFor(post.author.image).url()}
                            alt={post.author.name}
                       />
                       <p className="font-bodyFont text-base">
                           Blog post by <span className="font-bold text-secondaryColor">{post.author.name}</span> - Published: {new Date(post.publishedAt).toLocaleDateString()}
                       </p>
                   </div>
                   <div className="mt-10">
                       <PortableText dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
                                     projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""}
                                     content={post.body}
                                     serializers={{
                                         h1: (props: any) => (
                                             <h1
                                                    className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800">
                                                    {props.children}
                                             </h1>
                                         ),
                                            h2: (props: any) => (
                                                <h2
                                                    className="font-titleFont font-medium text-[24px] text-primary border-b-[1px] border-b-cyan-800">
                                                    {props.children}
                                                </h2>
                                            ),
                                            h3: (props: any) => (
                                                <h3
                                                    className="font-titleFont font-medium text-[20px] text-primary border-b-[1px] border-b-cyan-800">
                                                    {props.children}
                                                </h3>
                                            ),
                                            h4: (props: any) => (
                                                <h4
                                                    className="font-titleFont font-medium text-[18px] text-primary border-b-[1px] border-b-cyan-800">
                                                    {props.children}
                                                </h4>
                                            ),
                                         li: ({children}: any) => (
                                                <li className="list-disc list-inside">
                                                    {children}
                                                </li>
                                            ),
                                         link: ({href, children}: any) => (
                                                <a href={{href}} target="_blank" rel="noopener noreferrer"
                                                   className="text-cyan-500 hover:underline">
                                                    {children}
                                                </a>
                                            ),
                                     }}
                       />
                   </div>
                </article>
            </div>
            <Footer />
        </div>
    )
};

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
        _id,
        slug {
            current
        }
    }`;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        publishedAt,
        title,
        author -> {
            name,
            image
        },
        description,
        mainImage,
        slug,
        body,
    }`;

    const post = await sanityClient.fetch(query, {
        slug:params?.slug,
    });

    if(!post) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            post,
        },
        revalidate: 60,
    };
};