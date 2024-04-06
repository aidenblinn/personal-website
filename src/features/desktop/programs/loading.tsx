export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-blue-500 cursor-wait">
      <img
        className="h-12 animate-spin"
        src="img/email/Sending.png"
        alt="Email sending indicator"
      />
    </div>
  );
}
