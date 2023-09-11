interface FunctionalTextInputProps {
  onChangeText: (input: string) => void;
  infoType: string;
  input: string;
  placeholder: string;
}

const FunctionalTextInput = ({
  infoType,
  input,
  placeholder,
  onChangeText,
}: FunctionalTextInputProps) => {
  return (
    <div className="input-wrap">
      <label htmlFor={infoType}>{infoType}:</label>
      <input
        id={infoType}
        value={input}
        autoComplete="off"
        placeholder={placeholder}
        list={infoType === "city" ? "cities" : "none"}
        onChange={(e) => onChangeText(e.target.value)}
      />
    </div>
  );
};

export default FunctionalTextInput;
