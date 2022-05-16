import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

const QRCodeScanner = ({ otpAuthUri }) => {
  const navigate = useNavigate();
  return (
    <div className="SignIn">
      <section className="max-w-3xl mt-20 p-8 mx-auto bg-white rounded-md shadow-md text-lg flex flex-col space-y-6">
        <div>
          In order to protect your account from unauthorized access, we require
          both a password and possession of your phone to access your accout.
          Please install Microsoft Authenticator app through the following steps
          for us to verify that you have possession of your phone.
        </div>
        <div className="px-8">
          <ol className="list-decimal">
            <li>
              Install the Microsoft Authenticator App from{" "}
              <span className="font-bold">
                IOS App Stor/Android Play Store.
              </span>
            </li>
            <li>Open the Microsoft Authenticator App.</li>
            <li>
              Click <span className="font-bold">I agree</span> for permissions
              to use the app.
            </li>
            <li>
              Click <span className="font-bold">Scan a QR Code.</span>
            </li>
            <li>Scan the image below</li>
          </ol>
        </div>
        <div className="QRcodeImg flex justify-center items-center">
          <QRCode value={otpAuthUri} />
        </div>
        <div className="text-center">
          When Microsoft Authenticator app displays a six-digit code, click the{" "}
          <span className="font-bold">Continue</span> button below
        </div>
        <div className="mx-auto w-60">
          <button
            className="px-6 w-full py-4 font-bold leading-5 text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
            onClick={(e) => {
              navigate(`/tfa?qrLoaded=true`);
            }}
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  );
};

export default QRCodeScanner;
