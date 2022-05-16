import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import OtpValidator from "../OtpValidator";
import QRCodeScanner from "../QRCodeScanner";

// Import axiosInstance for authorized connection with API
import axiosInstance from "./../../utils/axiosInstance";

const TFA = () => {
  // Use "navigate" to link programatically to another route
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [otpAuthUri, setOtpAuthUri] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [userId, setUserId] = useState({});
  const id = searchParams.get("id");
  const qrLoaded = searchParams.get("qrLoaded");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getTFA(id) {
      const res = await axiosInstance.get(
        `http://localhost:4000/api/accounts/twoFactorAuthenticator?id=${id}`
      );
      console.log("otpAuthUri: ", res?.data?.otpAuthUri);
      console.log("otpToken: ", res?.data?.otpToken);
      setOtpAuthUri(res?.data?.otpAuthUri);
      setOtpToken(res?.data?.otpToken);
      setIsLoading(false);
      return;
    }
    console.log("userId: ", userId)
    if (!qrLoaded) {
      setUserId(id);
      if (otpAuthUri === "") {
        getTFA(id).catch((err) => {
          console.log(err);
        });
      }
    }
  }, [isLoading]);
  return (
    <div>
      {qrLoaded ? (
        <OtpValidator otpToken={otpToken} id={userId} />
      ) : (
        <QRCodeScanner otpAuthUri={otpAuthUri} />
      )}
    </div>
  );
};

export default TFA;
