import { useRef } from "react";
import { PhoneInputState } from "../types";
import { phoneArray } from "../utils/transformations";

interface FunctionalPhoneInputProps {
  phoneInput: PhoneInputState;
  setPhoneInput: (phoneInput: PhoneInputState) => void;
}

const FunctionalPhoneInput = ({
  phoneInput,
  setPhoneInput,
}: FunctionalPhoneInputProps) => {
  const phoneRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const phoneInputOnChangeHandler =
    (index: 0 | 1 | 2 | 3): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const maxLength = lengths.reduce((acc, curr) => acc + curr, 0);
      const currentMaxLength = lengths[index];
      const nextRef = phoneRefs[index + 1];
      const prevRef = phoneRefs[index - 1];
      let value = (e.target as HTMLInputElement).value;
      const shouldGoToNextRef =
        value.length >= currentMaxLength && nextRef?.current;

      const shouldGoToPrevRef = value.length === 0;

      if (index === lengths.length - 1 && value.length > currentMaxLength) {
        return;
      }

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }
      if (shouldGoToPrevRef) {
        prevRef?.current?.focus();
      }

      const phoneNumber = phoneInput
        .map((v: string, i: number) => (index === i ? value : v))
        .reduce((acc: string, curr: string) => acc + curr, "")
        .slice(0, maxLength);
      setPhoneInput(phoneArray(phoneNumber));
    };

  return (
    <div className="input-wrap">
      <label>Phone:</label>
      <div id="phone-input-wrap">
        <input
          type="number"
          id="phone-input-1"
          placeholder="55"
          value={phoneInput[0]}
          ref={phoneRefs[0]}
          onChange={phoneInputOnChangeHandler(0)}
          onKeyDown={(e) => {
            if (e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
        />
        -
        <input
          type="number"
          id="phone-input-2"
          placeholder="55"
          value={phoneInput[1]}
          ref={phoneRefs[1]}
          onChange={phoneInputOnChangeHandler(1)}
          onKeyDown={(e) => {
            if (e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
        />
        -
        <input
          type="number"
          id="phone-input-3"
          placeholder="55"
          value={phoneInput[2]}
          ref={phoneRefs[2]}
          onChange={phoneInputOnChangeHandler(2)}
          onKeyDown={(e) => {
            if (e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
        />
        -
        <input
          type="number"
          id="phone-input-4"
          placeholder="5"
          value={phoneInput[3]}
          ref={phoneRefs[3]}
          onChange={phoneInputOnChangeHandler(3)}
          onKeyDown={(e) => {
            if (e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
};

export default FunctionalPhoneInput;
