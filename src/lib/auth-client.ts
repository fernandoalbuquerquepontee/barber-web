import { adminClient, phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    import.meta.env.VITE_API_URL || "https://barberpro-ap33.onrender.com",
  plugins: [adminClient(), phoneNumberClient()],
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, useSession } = authClient;
