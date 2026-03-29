import React from "react";

type Props = { name: string; children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full bg-[#F5F2E3] text-sm text-gray-600 p-4">
          {this.props.name} encountered an error.
        </div>
      );
    }
    return this.props.children;
  }
}
