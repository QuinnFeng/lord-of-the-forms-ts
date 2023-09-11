import { SyntheticEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import FunctionalPhoneInput from "./FunctionalPhoneInput";
import { PhoneInputState, UserInformation } from "../types";
import {
  containsNumber,
  isEmailValid,
  isValidPhone,
} from "../utils/validations";
import { isCityValid } from "../utils/all-cities";
import FunctionalTextInput from "./FunctionalTextInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const nameContainNumberErrorMessage = "Name can not contain number";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

interface FunctionalFormProps {
  setUserInformation: (userInformation: UserInformation) => void;
}

export function FunctionalForm(props: FunctionalFormProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<PhoneInputState>(["", "", "", ""]);
  const [display, setDisplay] = useState<boolean>(false);

  const submitFormHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const isNotValid =
      (containsNumber(firstName) && firstName.length < 2) ||
      containsNumber(lastName) ||
      lastName.length < 2 ||
      !isEmailValid(email) ||
      !isCityValid(city) ||
      !isValidPhone(phone);
    if (isNotValid) {
      alert("Bad input");
      setDisplay(true);
      return;
    }
    const concatenatedPhone = phone.reduce(
      (acc: string, curr: string) => acc + curr,
      ""
    );
    const userInformation: UserInformation = {
      firstName,
      lastName,
      email,
      city,
      phone: concatenatedPhone,
    };
    props.setUserInformation(userInformation);
    resetForm();
  };

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCity("");
    setPhone(["", "", "", ""]);
    setDisplay(false);
  }

  const isFNContainsNumber = containsNumber(firstName);
  const isLNContainsNumber = containsNumber(lastName);
  const isFNLongEnough = firstName.length >= 2;
  const isLNLongEnough = lastName.length >= 2;
  const infoSetter = {
    firstName: setFirstName,
    lastName: setLastName,
    email: setEmail,
    city: setCity,
  };

  const handleTextChange = (
    field: "firstName" | "lastName" | "email" | "city",
    value: string
  ) => {
    infoSetter[field](value);
  };

  return (
    <form>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        onChangeText={(value) => handleTextChange("firstName", value)}
        infoType="firstName"
        input={firstName}
        placeholder="Bilbo"
      ></FunctionalTextInput>
      <ErrorMessage
        message={
          isFNContainsNumber
            ? nameContainNumberErrorMessage
            : firstNameErrorMessage
        }
        show={display && (isFNContainsNumber || !isFNLongEnough)}
      />

      {/* last name input */}
      <FunctionalTextInput
        onChangeText={(value) => handleTextChange("lastName", value)}
        infoType="lastName"
        input={lastName}
        placeholder="Baggins"
      ></FunctionalTextInput>
      <ErrorMessage
        message={
          isLNContainsNumber
            ? nameContainNumberErrorMessage
            : lastNameErrorMessage
        }
        show={display && (isLNContainsNumber || !isLNLongEnough)}
      />

      {/* Email Input */}
      <FunctionalTextInput
        onChangeText={(value) => handleTextChange("email", value)}
        infoType="email"
        input={email}
        placeholder="bilbo-baggins@adventurehobbits.net"
      ></FunctionalTextInput>
      <ErrorMessage
        message={emailErrorMessage}
        show={display && !isEmailValid(email)}
      />

      {/* City Input */}
      <FunctionalTextInput
        onChangeText={(value) => handleTextChange("city", value)}
        infoType="city"
        input={city}
        placeholder="Hobbiton"
      ></FunctionalTextInput>
      <ErrorMessage
        message={cityErrorMessage}
        show={display && !isCityValid(city)}
      />

      <FunctionalPhoneInput phoneInput={phone} setPhoneInput={setPhone} />
      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={display && !isValidPhone(phone)}
      />

      <input
        type="submit"
        value="Submit"
        onClick={(e: SyntheticEvent) => submitFormHandler(e)}
      />
    </form>
  );
}
