"use client";

import { FormEvent, useState } from "react";
import OtpInput from "./otp-input";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submittd Form");

    // peform phone validations
    const regex = /[^0-9]/g; // match any non numeric values

    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
    }

    // call BE API

    // show OTP Field
    setShowOtp(true);
  };

  const handleOtpSubmit = (otp: any) => {
    console.log("Hanlding OPT Submit");
    console.log(otp);
  };

  return (
    <div>
      {!showOtp && (
        <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
            className="border border-slate-400 shadow-sm p-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-lime-400 rounded-md py-2 px-8"
          >
            Submit
          </button>
        </form>
      )}
      {showOtp && (
        <div>
          <OtpInput length={4} onOtpSubmit={handleOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneLogin;
