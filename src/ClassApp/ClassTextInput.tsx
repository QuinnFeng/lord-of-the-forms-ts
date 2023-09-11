import { Component } from "react";

interface ClassTextInputProps {
  onChangeText: (input: string) => void;
  infoType: string;
  input: string;
  placeholder: string;
}


export class ClassTextInput extends Component<ClassTextInputProps> {
  render() {
    const { infoType, input, placeholder } = this.props;
    return (
      <div className="input-wrap">
        <label htmlFor={infoType}>{infoType}:</label>
        <input
          id={infoType}
          value={input}
          autoComplete="off"
          placeholder={placeholder}
          list={infoType === "city" ? "cities" : "none"}
          onChange={(e) => this.props.onChangeText(e.target.value)}
        />
      </div>
    );
  }
}
