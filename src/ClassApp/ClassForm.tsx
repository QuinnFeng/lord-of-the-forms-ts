import { Component, SyntheticEvent, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import {
  containsNumber,
  isEmailValid,
  isValidPhone,
} from "../utils/validations";
import { isValidCity } from "../utils/all-cities";
import { PhoneInputState, UserInformation } from "../types";
import { ClassPhoneInput } from "../Phone/ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const nameContainNumberErrorMessage = "Name can not contain number";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

interface ClassFormState {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: PhoneInputState;
  display: boolean;
}

interface ClassFormProps {
  setUserInformation: (userInformation: UserInformation) => void;
}

const initialState: ClassFormState = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phone: ["", "", "", ""],
  display: false,
};

export class ClassForm extends Component<ClassFormProps, ClassFormState> {
  constructor(props: ClassFormProps) {
    super(props);
    this.state = { ...initialState };
  }

  fnRef = createRef<HTMLInputElement>();
  lnRef = createRef<HTMLInputElement>();
  emailRef = createRef<HTMLInputElement>();
  cityRef = createRef<HTMLInputElement>();

  setPhoneInput = (phoneInput: PhoneInputState): void => {
    this.setState({ phone: phoneInput });
  };

  submitFormHandler(e: SyntheticEvent) {
    e.preventDefault();
    const { phone, ...userInfo } = this.state;
    const { firstName, lastName, city, email } = userInfo;
    const display =
      containsNumber(firstName) ||
      firstName.length < 2 ||
      containsNumber(lastName) ||
      lastName.length < 2 ||
      !isEmailValid(email) ||
      !isValidCity(city) ||
      !isValidPhone(phone);
    if (display) {
      alert("Bad input");
      this.setState({ display: true });
      return;
    }

    const concatenatedPhone = phone.reduce(
      (acc: string, curr: string) => acc + curr,
      ""
    );
    const formState = {
      ...userInfo,
      phone: concatenatedPhone,
    };
    this.props.setUserInformation(formState);
    this.setState({ ...initialState });
  }

  render() {
    const { firstName, lastName, email, city, phone, display } = this.state;
    const isFNContainsNumber = containsNumber(firstName);
    const isLNContainsNumber = containsNumber(lastName);
    const isFNLongEnough = firstName.length >= 2;
    const isLNLongEnough = lastName.length >= 2;

    return (
      <form>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <label htmlFor="first-name">{"First Name"}:</label>
          <input
            id="first-name"
            ref={this.fnRef}
            value={firstName}
            placeholder="Bilbo"
            onChange={() =>
              this.setState({ firstName: this.fnRef.current?.value || "" })
            }
          />
        </div>
        <ErrorMessage
          message={
            isFNContainsNumber
              ? nameContainNumberErrorMessage
              : firstNameErrorMessage
          }
          show={display && (!isFNLongEnough || isFNContainsNumber)}
        />

        {/* last name input */}
        <div className="input-wrap">
          <label htmlFor="last-name">{"Last Name"}:</label>
          <input
            id="last-name"
            ref={this.lnRef}
            value={lastName}
            placeholder="Baggins"
            onChange={() =>
              this.setState({ lastName: this.lnRef.current?.value || "" })
            }
          />
        </div>
        <ErrorMessage
          message={
            isLNContainsNumber
              ? nameContainNumberErrorMessage
              : lastNameErrorMessage
          }
          show={display && (!isLNLongEnough || isLNContainsNumber)}
        />

        {/* Email Input */}
        <div className="input-wrap">
          <label htmlFor="email">{"Email"}:</label>
          <input
            id="email"
            ref={this.emailRef}
            value={email}
            placeholder="bilbo-baggins@adventurehobbits.net"
            onChange={() =>
              this.setState({ email: this.emailRef.current?.value || "" })
            }
          />
        </div>
        <ErrorMessage
          message={emailErrorMessage}
          show={display && !isEmailValid(email)}
        />

        {/* City Input */}
        <div className="input-wrap">
          <label htmlFor="city">{"City"}:</label>
          <input
            id="city"
            ref={this.cityRef}
            value={city}
            placeholder="Hobbiton"
            list="cities"
            onChange={() =>
              this.setState({ city: this.cityRef.current?.value || "" })
            }
          />
        </div>
        <ErrorMessage
          message={cityErrorMessage}
          show={display && !isValidCity(city)}
        />

        <ClassPhoneInput
          phoneInput={phone}
          setPhoneInput={this.setPhoneInput}
        />
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={display && !isValidPhone(phone)}
        />

        <input
          type="submit"
          value="Submit"
          onClick={(e: SyntheticEvent) => this.submitFormHandler(e)}
        />
      </form>
    );
  }
}
