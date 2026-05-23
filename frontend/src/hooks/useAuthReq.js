import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/axios";

let isInterceptorRegistered = false;

function useAuthReq() {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (isInterceptorRegistered) return;
    isInterceptorRegistered = true;

    const interceptor = api.interceptors.request.use(
      (config) => {
        if (isSignedIn && isLoaded) {
          config.headers.Authorization = `Bearer ${getToken()}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [isSignedIn, isLoaded, getToken]);

  return { isSignedIn, isClerkLoaded: isLoaded };
}

export default useAuthReq;
