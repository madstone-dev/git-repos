import loadingImg from "../Assets/Pulse-1s-200px.png";

export default function Loader() {
  return (
    <div className="h-full w-full flex flex-1 justify-center items-center">
      <div className="w-32 h-32">
        <img src={loadingImg} alt="loading" />
      </div>
    </div>
  );
}
