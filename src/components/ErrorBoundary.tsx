import { Component, type ReactNode } from 'react';
import { tracker } from '@/lib/tracking';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | null;
}


export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Section load error:', error, errorInfo);
    tracker.error(`React Error: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      const isChunkError = this.state.error?.message?.toLowerCase().includes('failed to fetch dynamically imported module') ||
                           this.state.error?.message?.toLowerCase().includes('importing a module script failed');

      return this.props.fallback || (
        <div className="section-padding text-center min-h-[50vh] flex flex-col items-center justify-center">
          <p className="body-text text-white/60 mb-2">
            {isChunkError
              ? "A new version of the website is available."
              : "Something went wrong. Please refresh the page."}
          </p>
          <button
            onClick={() => {
              if (isChunkError) {
                window.location.reload();
              } else {
                this.setState({ hasError: false, error: null });
              }
            }}
            className="btn-primary mt-4 text-sm"
          >
            {isChunkError ? "Update Now" : "Try Again"}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
