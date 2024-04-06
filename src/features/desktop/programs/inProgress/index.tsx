export default function InProgress() {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-yellow-200">
      <img
        src={"img/UnderConstruction.ico"}
        alt="Construction worker icon"
        className="h-20 mb-4"
      />
      <p className="text-center text-3xl">Under Construction</p>
    </div>
  );
}
