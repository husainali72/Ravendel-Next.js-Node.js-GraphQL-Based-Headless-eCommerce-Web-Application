import gql from "graphql-tag";

export const SEND_FORGOT_PASSWORD_EMAIL = gql`
  mutation($email: String) {
    sendForgetPasswordEmail(email: $email) {
      message
      success
    }
  }
`;


export const VERIFY_FORGOT_PASSWORD_TOKEN = gql`
  mutation($token: String, $newPassword: String) {
    verifyForgetPasswordToken(token: $token, newPassword: $newPassword) {
      message
      success
    }
  }
`;
