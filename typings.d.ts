export interface Post {
    _id: string;
    publishedAt: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
    comments: Comment[];
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: Array<object>;
}

export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type: string;
    };
    publishedAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

export interface Category {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
}
