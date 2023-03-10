export function disscussionGraphQL(
  gitDiscussionCategoryId: string | undefined
) {
  return `{
         repository(name: "blog-nextjs", owner: "ttphat2805") {
    discussions(first:100, categoryId:"${gitDiscussionCategoryId}"){
      nodes{
        title
        url
        number
        bodyHTML
        bodyText
        createdAt
        author{
          login
          url
          avatarUrl
        }
        labels(first:100){
          nodes{
            name
          }
        }
      }
    }
  }
    }`;
}

// SINGLE POST

export function disscussionGraphQLDetail(postId: number | undefined) {
  return `{
    repository(name: "blog-nextjs", owner: "ttphat2805") {
     discussion(number:${postId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`;
}
