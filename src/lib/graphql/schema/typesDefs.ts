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
    username: String
    title: String
    currentStreak: Int!
    highscores: [Highscore]!
  }

  type Query {
    me: User!
    users: [User]!
    highscores: [Highscore]!
  }

  type Mutation {
    putUser(username: String, title: String): User!
    putGameResult(isCorrect: Boolean!): User!
  }
`;
