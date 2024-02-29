export default function Login(): React.ReactElement {
  return (
    <main className="flex flex-col z-30 fixed top-0 left-0 w-screen h-screen">
      <div className="h-12 md:h-24 w-full bg-[#00309C]" />
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center grow w-full bg-[#5A7EDC]">
        <div className="">
          <h1>Aiden Blinn</h1>
          <p>To begin, click your user name</p>
        </div>
        <div className="fixed top-1/2 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 h-1 md:h-2/3 w-2/3 md:w-1 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/25 to-transparent" />
        <div>
          <img src="icons/Profile.ico" alt="Guest user login" />
        </div>
      </div>
      <div className="h-12 md:h-24 w-full bg-[#00309C]" />
    </main>
  );
}
