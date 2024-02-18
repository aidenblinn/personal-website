export default function StartMenu(): React.ReactElement {
  return (
    <div className="relative flex items-center justify-center gap-2 w-fit h-full pl-2 pr-4 bg-green-500 rounded-r-lg">
      <em className="text-white tracking-wide [text-shadow:_1px_3px_4px_rgb(0,0,0)]">
        start
      </em>
      <div className="absolute h-full w-2 right-0 gradient-border rounded-r-lg"></div>
    </div>
  );
}
