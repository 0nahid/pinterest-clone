import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import loginVideo from "../assets/a_strange_parking_simon.mp4";
import { client } from "../client";
export default function Login() {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, imageUrl, googleId } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={loginVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <h1 className="text-white text-center text-3xl font-bold">
              Pinterest 2.0
            </h1>
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className="bg-mainColor hover:bg-blue-500 text-black flex justify-center items-center  hover:text-white py-2 px-4 border ring hover:border-transparent rounded"
                >
                  <FcGoogle className="mr-2" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
