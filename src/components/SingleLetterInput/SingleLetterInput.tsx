import { FC } from "react";
import { SingleLetterInputProps } from "../../types/singleLetterInputProps";

const SingleLetterInput: FC<SingleLetterInputProps> = ({
  title,
  value,
  onChange,
}) => {
  const makeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 1) {
      onChange(newValue);
    }
  };
  return (
    <label>
      {title}
      <input type="text" value={value} onChange={makeChange} maxLength={1} />
    </label>
  );
};

export default SingleLetterInput;
