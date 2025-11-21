import {  useNavigate } from "react-router-dom";
import Button from "./Button";

function Landing() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 flex justify-center">
          <div>
            <img src={"/chessboard.jpeg"}className="max-w-96 flex justify-center" alt="" />
          </div>
          <div className="flex justify-center align-center flex-col">
            <h1 className="text-4xl front-bold text-white mb-5 flex "> 
              Play Chess Online on the #2 Site!
            </h1>
            <div className="mt-4 flex justify-center">
                <Button onClick={() => navigate("/game")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
