import { PhoneInputState } from "../types";

export function isEmailValid(emailAddress: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

export function containsNumber(s: string): boolean {
  return s.split('').some((c: string) => {
    return !isNaN(+c);
  });
}

export function isValidPhone(phoneInput:PhoneInputState): boolean{
  const phone = phoneInput.reduce((acc,curr)=>acc+curr,"").replace(/[^0-9]/g, '');
  return phone.length==7;
}