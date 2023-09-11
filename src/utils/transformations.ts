import { PhoneInputState } from "../types";

export const capitalize = (s:string) => {
    // todo: build this function
    // `capitalize("jOn")` should output `"Jon"`
    if(s.length==0){
      return "";
    }
    return s[0].toUpperCase()+s.slice(0).toLowerCase();
}

export const formatPhoneNumber = (digits:string):string => {

  return phoneArray(digits).join("-");
}

export const phoneArray = (digits:string):PhoneInputState => {
  // todo: build this function
  // `formatPhoneNumber("12345678")` should be `"12-34-56-7"`
  const groups = [];
  for (let i = 0; i < 4; i++) {
    groups.push(digits.slice(2*i, 2*(i+1)));
  }
  return groups as PhoneInputState;
}