import { SyntheticEvent, useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import FunctionalPhoneInput from "../Phone/FunctionalPhoneInput";
import { PhoneInputState, UserInformation } from "../types";
import {
  containsNumber,
  isEmailValid,
  isValidPhone,
} from "../utils/validations";
import { isValidCity } from "../utils/all-cities";

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

  const fnRef = useRef<HTMLInputElement>(null);
  const lnRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const submitFormHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const isNotValid =
      (containsNumber(firstName) && firstName.length < 2) ||
      containsNumber(lastName) ||
      lastName.length < 2 ||
      !isEmailValid(email) ||
      !isValidCity(city) ||
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
          ref={fnRef}
          value={firstName}
          placeholder="Bilbo"
          onChange={() => setFirstName(fnRef.current?.value || "")}
        />
      </div>
      <ErrorMessage
        message={
          isFNContainsNumber
            ? nameContainNumberErrorMessage
            : firstNameErrorMessage
        }
        show={display && (isFNContainsNumber || !isFNLongEnough)}
      />

      {/* last name input */}
      <div className="input-wrap">
        <label htmlFor="last-name">{"Last Name"}:</label>
        <input
          id="last-name"
          ref={lnRef}
          value={lastName}
          placeholder="Baggins"
          onChange={() => setLastName(lnRef.current?.value || "")}
        />
      </div>
      <ErrorMessage
        message={
          isLNContainsNumber
            ? nameContainNumberErrorMessage
            : lastNameErrorMessage
        }
        show={display && (isLNContainsNumber || !isLNLongEnough)}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <label htmlFor="email">{"Email"}:</label>
        <input
          id="email"
          ref={emailRef}
          value={email}
          placeholder="bilbo-baggins@adventurehobbits.net"
          onChange={() => setEmail(emailRef.current?.value || "")}
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
          ref={cityRef}
          list="cities"
          value={city}
          placeholder="Hobbiton"
          onChange={() => setCity(cityRef.current?.value || "")}
        />
      </div>
      <ErrorMessage
        message={cityErrorMessage}
        show={display && !isValidCity(city)}
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
