import React, { useState } from "react";
import { useAppSelector } from "@/app/hooks";

type EmailData = {
  from: string;
  subject: string;
  content: string;
  sendStatus: "Unsent" | "Sending" | "Success" | "Failure";
};

export default function Email() {
  const [emailData, setEmailData] = useState<EmailData>({
    from: "",
    subject: "",
    content: "",
    sendStatus: "Unsent",
  });
  const muted = useAppSelector((state) => state.utilityBar.muted);

  // Update state of email content when form edited
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  // Hit API route to send email when Send button clicked
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailData({
      ...emailData,
      sendStatus: "Sending",
    });

    // Make API request to Next.js API route
    const sendEmailResponse = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: JSON.stringify(emailData),
    });

    const newEmailData: EmailData =
      sendEmailResponse.status === 200
        ? {
            from: "",
            subject: "",
            content: "",
            sendStatus: "Success",
          } // Reset form if request successful
        : { ...emailData, sendStatus: "Failure" }; // Preserve form content if request failed

    setEmailData(newEmailData);

    // Play success / failure sound if computer unmuted
    if (!muted) {
      const notificationSound =
        sendEmailResponse.status === 200
          ? new Audio("sounds/tada.mp3")
          : new Audio("sounds/fail.mp3");
      notificationSound.play();
    }

    // Set timeout to reset submit button after success/failure indicated
    setTimeout(
      () =>
        setEmailData({
          ...newEmailData,
          sendStatus: "Unsent",
        }),
      3000
    );
  };

  const renderSendButton = (): {
    buttonColor: string;
    buttonContent: string | React.ReactElement;
  } => {
    switch (emailData.sendStatus) {
      case "Sending":
        return {
          buttonColor: "yellow",
          buttonContent: (
            <img
              className="h-full animate-spin"
              src="img/email/Sending.png"
              alt="Email sending indicator"
            />
          ),
        };
        break;
      case "Success":
        return { buttonColor: "green", buttonContent: "Email Sent" };
        break;
      case "Failure":
        return { buttonColor: "red", buttonContent: "Error" };
        break;
      default:
        return {
          buttonColor: "blue",
          buttonContent: "Send",
        };
    }
  };

  const { buttonColor, buttonContent } = renderSendButton();

  return (
    <main className="flex flex-col items-center w-full h-full px-4 py-4 bg-[#F5F2E3]">
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col space-y-4 relative"
      >
        <div className="flex items-center space-x-2">
          <label htmlFor="from" className="w-16 text-sm">
            From:
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={emailData.from}
            onChange={handleFormChange}
            className="flex-1 bg-white border border-gray-300 px-3 py-2 h-8"
            placeholder="<Your Email>"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="to" className="w-16 text-sm">
            To:
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value="Aiden Blinn"
            readOnly={true}
            tabIndex={-1}
            className="flex-1 bg-white border border-gray-300 text-gray-400 px-3 py-2 h-8 pointer-events-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="subject" className="w-16 text-sm">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleFormChange}
            className="flex-1 bg-white border border-gray-300 px-3 py-2 h-8"
          />
        </div>
        <textarea
          id="content"
          name="content"
          value={emailData.content}
          onChange={handleFormChange}
          className="w-full flex-1 bg-white border border-gray-300 px-3 py-2 resize-none"
          placeholder=""
        />
        <button
          type="submit"
          className={`flex justify-center items-center h-10 w-full bg-${buttonColor}-500 text-white py-2 hover:bg-${buttonColor}-600`}
          disabled={emailData.sendStatus !== "Unsent"} // Disable form while email is sending
        >
          {buttonContent}
        </button>
      </form>
    </main>
  );
}
