export interface IBlogPost {
  id?: number;
  title: string;
  url?: string;
  bodyText: string;
  html?: string;
  discussionUrl?: string;
  tags: string[];
  createdAt: string;
  lastEdited?: string | null;
  author: {
    name: string;
    avatar: string;
    url: string;
  };
}

export interface IBlogDetail {
  title: string;
  html: string;
  createdAt: string;
  author: {
    name: string;
    avatar: string;
    url: string;
  };
}
