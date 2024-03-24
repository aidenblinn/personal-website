import * as React from "react";

export default function EmailTemplate({
  content,
}: {
  content: string;
}): React.ReactElement {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
}
