declare global {
  interface Window {
    env?: {
      GOOGLE_MAPS_API_KEY?: string;
    };
  }
}

export {};
