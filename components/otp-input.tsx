import { useState, useRef, useEffect, ChangeEvent } from "react";

interface OtpInputProps {
  length: number;
  onOtpSubmit: (event: any) => void;
}

const OtpInput = ({ length, onOtpSubmit }: OtpInputProps) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  //
  // find next empty index in element
  //
  const findNextEmpty = (index: number) => {
    let emptyIndex: number | undefined;
    for (let i = index + 1; i < length; i++) {
      if (inputRefs.current[i].value.trim() === "" && !emptyIndex) {
        emptyIndex = i;
      }
    }
    return emptyIndex;
  };

  //
  // handle value changes
  //
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // if not value reject
    if (isNaN(Number(value))) return;

    // update otp index
    const newOtp = [...otp];

    // force only one input per index and update otp state
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger if all inputs received
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // move to next empty index
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      let nextEmptyIndex = findNextEmpty(index);
      if (nextEmptyIndex) {
        inputRefs.current[nextEmptyIndex].focus();
      }
    }
  };

  //
  // handle clicking the box
  //
  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    // move focus to previous element if exist on backspac
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="felx items-center flex-col mt-6">
      <h2 className="text-2xl font-semibold text-center mb-2">Enter Code</h2>
      <div>
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(input: any) => (inputRefs.current[index] = input)}
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="border border-slate-300 w-[60px] h-[60px] m-2 text-center text-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
