import React, { useState } from "react";

export default function Email() {
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    content: "",
  });

  // Update state of email content when form edited
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hit API route to send email when Send button clicked
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: JSON.stringify(formData),
    });
  };

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
            value={formData.from}
            onChange={handleFormChange}
            className="flex-1 bg-white border border-gray-300 px-3 py-2 h-8"
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
            className="flex-1 bg-white border border-gray-300 px-3 py-2 h-8 pointer-events-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="subject" className="w-16 text-sm">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleFormChange}
            className="flex-1 bg-white border border-gray-300 px-3 py-2 h-8"
            placeholder=""
          />
        </div>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleFormChange}
          className="w-full flex-1 bg-white border border-gray-300 px-3 py-2 resize-none"
          placeholder=""
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </main>
  );
}
