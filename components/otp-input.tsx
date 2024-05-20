import { useState, useRef, useEffect, ChangeEvent } from "react";

interface OtpInputProps {
  length: number;
  onOtpSubmit: (event: any) => void;
}

const OtpInput = ({ length, onOtpSubmit }: OtpInputProps) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // if not value reject
    if (isNaN(Number(value))) return;

    // update otp index
    const newOtp = [...otp];

    // force only one input
  };

  const handleClick = (index: number) => {};

  const handleKeyDown = (index: number, e: any) => {};

  console.log(inputRefs);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div>
      <h2>OTP Input</h2>
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(input: any) => (inputRefs.current[index] = input)}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="border border-slate-400 w-[40px] h-[40px] m-2 text-center text-lg"
        />
      ))}
    </div>
  );
};

export default OtpInput;
