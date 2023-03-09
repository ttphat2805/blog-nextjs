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
