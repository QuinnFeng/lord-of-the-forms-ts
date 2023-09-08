import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
type State = { userInformation: UserInformation | null };

// const defaultUser: UserInformation = {
//   email: "default@default.com",
//   firstName: "Default",
//   lastName: "Default",
//   phone: "1234567",
//   city: "Hobbiton",
// };

export class ClassApp extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      userInformation: null,
    };
  }

  setUserInformation = (userInformation: UserInformation) => {
    this.setState({ userInformation });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={
            // toggle the following lines to change
            // null
            this.state.userInformation
          }
        />
        <ClassForm setUserInformation={this.setUserInformation} />
      </>
    );
  }
}
