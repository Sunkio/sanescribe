import Meta from "../../components/Meta";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import {sanityClient, urlFor} from "../../sanity";
import { GetServerSidePropsContext } from 'next';
import {Category, Post} from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface Props {
    post: Post;
    categories: Category[];
}

type Inputs={
        _id: string;
        name: string;
        email: string;
        comment: string;
        publishedAt: string;
}


const Post = ({post, categories}: Props) => {
    const {data:session} = useSession();
    const [userErr, setUserErr] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = data => {
        fetch("/api/createComment", {
                method: "POST",
                body: JSON.stringify(data),
            })
            .then(() => {
                setSubmitted(true);
            })
            .catch((error) => {
                setSubmitted(false);
        });
    };

    const handleUserError = () => {
      if(!session) {
          setUserErr("You must be signed in to comment");
      } else {
          setUserErr("");
      }
    }

    return (
        <div>
          <Meta title={post.title} description={post.description} />
            <Header categories={categories}/>
            <img
                alt={post.title}
                src={urlFor(post.mainImage).url()!}
                className="w-full h-96 object-cover"
            />
            <div className="max-w-3xl mx-auto mb-10">
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
                                                <a href={href} target="_blank" rel="noopener noreferrer"
                                                   className="text-cyan-500 hover:underline">
                                                    {children}
                                                </a>
                                            ),
                                     }}
                       />
                   </div>
                </article>
                <hr className="max-w-lg my-5 mx-auto border[1px] border-secondaryColor" />
              {
                submitted ? (
                  <div className="flex flex-col items-center gap-2 p-10 my-10 bg-bgColor text-white
                    mx-auto">
                    <h2 className="text-2xl font-bold">Thank you for submitting your comment!</h2>
                    <p>Once it has been approved, it will appear below.</p>
                  </div>
                ) : (
                <div className="px-4">
                  <div>
                    <p className="text-xs text-secondaryColor uppercase font-titleFont font-bold">Enjoyed this article?</p>
                    <h3 className="font-titleFont text-3xl font-bold">Leave a comment below!</h3>
                  </div>
                  <hr className="py-3 mt-2" />
                  <input {...register("_id")} type="hidden" name="_id" value={post._id} />
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-7 flex flex-col gap-6">
                    <label className="flex flex-col" >
                      <span className="font-titleFont font-semibold text-base">Name</span>
                      <input
                        {...register("name", { required: true })}
                        className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 py-4
                          outline-none focus-within:shadow-xl shadow-secondaryColor" type="text" name="name"
                        placeholder="Enter your name"
                      />
                      {/* Name Error */}
                      {errors.name && (
                        <p className="text-red-500 text-sm">Please enter your name</p>
                      )}
                    </label>
                    <label className="flex flex-col" >
                      <span className="font-titleFont font-semibold text-base">Email</span>
                      <input
                        {...register("email", { required: true })}
                        className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 py-4
                          outline-none focus-within:shadow-xl shadow-secondaryColor" type="email" name="email"
                        placeholder="Enter your Email"
                      />
                      {/* Email Error */}
                      {errors.email && (
                        <p className="text-red-500 text-sm">Please enter your email</p>
                      )}
                    </label>
                    <label className="flex flex-col" >
                      <span className="font-titleFont font-semibold text-base">Comment</span>
                      <textarea
                        {...register("comment", { required: true })}
                        className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 py-4
                          outline-none focus-within:shadow-xl shadow-secondaryColor" name="comment"
                        placeholder="Enter your Comment" rows={6}
                      />
                      {/* Comment Error */}
                      {errors.comment && (
                        <p className="text-red-500 text-sm">Please enter your comment</p>
                      )}
                    </label>
                    <input {...register("publishedAt")} type="hidden" name="_publishedAt" value={new Date().toISOString()} />
                    {session && (
                      <button className="w-full bg-secondaryColor text-white font-titleFont font-semibold tracking-wider text-lg uppercase py-2 px-4 rounded-md hover:bg-secondaryColor/80 duration-300">
                        Submit
                      </button>
                    )}
                  </form>
                  {!session && (
                    <button
                      onClick={handleUserError}
                      className="w-full bg-secondaryColor text-white font-titleFont font-semibold tracking-wider text-lg uppercase py-2 px-4 rounded-md hover:bg-secondaryColor/80 duration-300">
                      Submit
                    </button>
                  )}
                  {userErr && (
                    <p className="text-sm font-titleFont text-center font-semibold text-red-500
                       my-1 px-4 animate-bounce">
                      {" "}
                      <span className="text-base font-bold italic mr-2">!</span>
                      {userErr}
                    </p>
                  )}
                  <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bgColor shadow-lg space-y-2">
                    <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
                    <hr />
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex flex-col gap-2">
                        <p>
                          <span className="font-semibold text-secondaryColor">{comment.name}</span>{" "}
                          <span className="italic">
                                      {comment.publishedAt?.slice(0, 16) && `(${comment.publishedAt?.slice(0, 16)
                                        .replace("T", ", ")})`}
                                  </span>
                        </p>
                        <p>{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Footer />
        </div>
    )
};

export default Post;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const postQuery = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      publishedAt,
      title,
      author -> {
          name,
          image
      },
      "comments": *[_type == "comment" && post._ref == ^._id && approved == true],
      description,
      mainImage,
      slug,
      body,
  }`;

  const categories = await sanityClient.fetch(`*[_type == "category"] | order(order asc){ title, description, slug, 
    _id }`);

  const post = await sanityClient.fetch(postQuery, {
    slug: context.params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      categories: categories || [],
    },
  };
};