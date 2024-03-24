export default function StartMenu(): React.ReactElement {
  return (
    <div className="flex items-center justify-center z-10 w-full h-full bg-slate-500/50">
      <div className="flex flex-col items-center justify-center gap-4 w-2/3">
        <div className="flex justify-center gap-2 bg-blue-200 rounded-md w-full">
          {[
            ["Apple", "0"],
            ["Trophy", 0],
          ].map(([iconName, score]) => {
            return (
              <div key={`startMenu${iconName}`} className="text-center">
                <img className="h-8" src={`img/snake/${iconName}.png`} alt="" />
                <p>{score}</p>
              </div>
            );
          })}
        </div>
        <button className="bg-blue-400 rounded-md w-full hover:brightness-110">
          <p>Play</p>
        </button>
        <div className="rounded-lg p-4 shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Slow</span>
              <span className="text-sm">Fast</span>
            </div>
            <input
              className="w-full h-4 rounded-full appearance-none bg-gray-300"
              type="range"
              min={0}
              max={2}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
