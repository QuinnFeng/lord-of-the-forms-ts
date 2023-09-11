import {
  ChangeEventHandler,
  Component,
  SyntheticEvent,
  createRef,
} from "react";
import { phoneArray } from "../utils/transformations";
import { PhoneInputState } from "../types";

interface ClassPhoneInputProps {
  phoneInput: PhoneInputState;
  setPhoneInput: (phoneInput: PhoneInputState) => void;
}

export class ClassPhoneInput extends Component<ClassPhoneInputProps> {
  phoneRef0 = createRef<HTMLInputElement>();
  phoneRef1 = createRef<HTMLInputElement>();
  phoneRef2 = createRef<HTMLInputElement>();
  phoneRef3 = createRef<HTMLInputElement>();
  phoneRefs = [this.phoneRef0, this.phoneRef1, this.phoneRef2, this.phoneRef3];

  phoneInputOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e: SyntheticEvent) => {
      const lengths = [2, 2, 2, 1];
      const maxLength = lengths.reduce((acc, curr) => acc + curr, 0);
      const currentMaxLength = lengths[index];
      const nextRef = this.phoneRefs[index + 1];
      const prevRef = this.phoneRefs[index - 1];
      const value = (e.target as HTMLInputElement).value;
      const shouldGoToNextRef =
        value.length >= currentMaxLength && nextRef?.current;
      const shouldGoToPrevRef = value.length === 0;
      if (index === lengths.length - 1 && value.length > currentMaxLength) {
        return;
      }
      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      } else if (shouldGoToPrevRef) {
        prevRef?.current?.focus();
      }
      const phoneNumber = this.props.phoneInput
        .map((v: string, i: number) => (index === i ? value : v))
        .reduce((acc: string, curr: string) => acc + curr, "")
        .slice(0, maxLength);
      this.props.setPhoneInput(phoneArray(phoneNumber));
    };

  render() {
    const { phoneInput } = this.props;

    return (
      <div className="input-wrap">
        <label>Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="number"
            id="phone-input-1"
            placeholder="55"
            value={phoneInput[0]}
            ref={this.phoneRef0}
            onChange={this.phoneInputOnChangeHandler(0)}
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
            ref={this.phoneRef1}
            onChange={this.phoneInputOnChangeHandler(1)}
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
            ref={this.phoneRef2}
            onChange={this.phoneInputOnChangeHandler(2)}
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
            ref={this.phoneRef3}
            onChange={this.phoneInputOnChangeHandler(3)}
            onKeyDown={(e) => {
              if (e.key === "+" || e.key === "-") {
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>
    );
  }
}
