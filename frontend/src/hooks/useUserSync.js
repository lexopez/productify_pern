import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { syncUser } from "../lib/api";

function useUserSync() {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  console.log("Is Signed In:", isSignedIn);
  const token = getToken().then((t) => t);
  console.log("Token:", token);
  console.log("User:", user);

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: syncUser,
  });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      syncUserMutation(
        {
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName || user.firstName,
          username: user.username || user.firstName,
          imageUrl: user.imageUrl,
        },
        getToken(),
      );
    }
  }, [isSignedIn, user, isPending, isSuccess, syncUserMutation, getToken]);

  return { isSynced: isSuccess };
}

export default useUserSync;
