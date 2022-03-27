import "./logIn.css";

import { useEffect, useRef, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export const LogIn = () => {
  const [value, setValue] = useState("");
  const [isStep1, setIsStep1] = useState(true);

  const recaptchaVerifier = useRef();
  const confirmationResult = useRef();

  useEffect(() => {
    const auth = getAuth();
    recaptchaVerifier.current = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
  }, []);

  const onClickLogin = async () => {
    const auth = getAuth();
    const phoneNumber = value;
    confirmationResult.current = await signInWithPhoneNumber(
      auth,
      "+976" + phoneNumber,
      recaptchaVerifier.current
    );

    setValue("");
    setIsStep1(false);
  };

  const onClickCheckCode = async () => {
    const code = value;

    await confirmationResult.current.confirm(code);
  };

  return (
    <div className="container flex flex-direction">
      <div className="logIn flex flex-direction align-items space-evenly">
        <h1>Log In</h1>
        {isStep1 ? (
          <div className="Name-Email flex flex-direction align-items space-evenly">
            <input
              type="text"
              className="Phone-input"
              placeholder=" Phone number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={onClickLogin}>Login</button>
            <div id="recaptcha-container"></div>
          </div>
        ) : (
          <div className="Name-Email flex flex-direction align-items space-evenly">
            <input
              type=" text"
              className="Phone-input"
              placeholder=" Code"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={onClickCheckCode}>Check code</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default LogIn;