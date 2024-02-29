export default function Snake({
  initHeight,
  initWidth,
}: {
  initHeight: number;
  initWidth: number;
}): React.ReactElement {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ height: `${initHeight}px` }}
    >
      <div className="grid grid-cols-20 gap-1">
        {Array.from({ length: 20 }, (_, rowIndex) =>
          Array.from({ length: 20 }, (_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="bg-gray-300 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
