import * as React from "react";

export default function EmailTemplate({
  from,
  content,
}: {
  from: string;
  content: string;
}): React.ReactElement {
  return (
    <div>
      <h1>
        <strong>From: </strong>
        {from.trim()}
      </h1>
      <p>{content}</p>
    </div>
  );
}
