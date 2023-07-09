export default /* GraphQL */ `
  type Highscore {
    id: String!
    user: User!
    score: Int!
  }
  
  type User {
    id: String!
    name: String!
    email: String!
    highscores: [Highscore]!
  }
    
  type Query {
    me: User!
    users: [User]!
    highscores: [Highscore]!
  }
`;