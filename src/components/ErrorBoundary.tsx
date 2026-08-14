import { Component, ReactNode } from 'react';

type State = { hasError: boolean; message: string };

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    console.error('App error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950 p-6">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-alert-100 dark:bg-alert-900/30 text-alert-600 dark:text-alert-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">خطایی رخ داد</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              صفحه به دلیل یک خطای داخلی بارگذاری نشد. لطفاً صفحه را مجدداً بارگذاری کنید.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700"
            >
              بارگذاری مجدد
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
