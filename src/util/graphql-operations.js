import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const GET_USER_EXERCISES = gql`
  {
    getAllExerciseLogs {
      id
      exerciseName
    }
  }
`;

export const LOG_SET = gql`
  mutation logSet(
    $exerciseName: String!
    $weight: Float
    $reps: Int
    $notes: String
  ) {
    logSet(
      logSetInput: {
        exerciseName: $exerciseName
        weight: $weight
        reps: $reps
        notes: $notes
      }
    ) {
      weight
      reps
      notes
      createdAt
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise($exerciseName: String!) {
    addExercise(exerciseName: $exerciseName) {
      id
      exerciseName
    }
  }
`;

export const GET_EXERCISE_LOGS = gql`
  {
    getAllExerciseLogs {
      id
      exerciseName
      sets {
        id
        weight
        reps
        createdAt
        notes
      }
    }
  }
`;

export const GET_EXERCISE_LOG = gql`
  query($exerciseId: ID!) {
    getExerciseLog(exerciseId: $exerciseId) {
      id
      exerciseName
      sets {
        id
        weight
        reps
        createdAt
        notes
      }
    }
  }
`;

export const DELETE_SET = gql`
  mutation deleteSet($exerciseId: ID!, $setId: ID!) {
    deleteSet(exerciseId: $exerciseId, setId: $setId)
  }
`;

export const EDIT_SET = gql`
  mutation editSet(
    $exerciseId: ID!
    $setId: ID!
    $weight: Float
    $reps: Int
    $notes: String
  ) {
    editSet(
      editSetInput: {
        exerciseId: $exerciseId
        setId: $setId
        weight: $weight
        reps: $reps
        notes: $notes
      }
    )
  }
`;

export const GET_WORKOUT_LOGS = gql`
  {
    getAllWorkoutLogs {
      id
      workoutName
      createdAt
      notes
      exercises {
        id
        exerciseName
        sets {
          id
          weight
          reps
          createdAt
          notes
        }
      }
    }
  }
`;

export const GET_WORKOUT_LOG = gql`
  query($workoutId: ID!) {
    getWorkoutLog(workoutId: $workoutId) {
      id
      createdAt
      notes
      exercises {
        id
        exerciseName
        sets {
          id
          weight
          reps
          createdAt
          notes
        }
      }
    }
  }
`;
