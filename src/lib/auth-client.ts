import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8080",
  plugins: [
    adminClient() // Adicione o plugin no client
  ]
});

export const { signIn, signOut, useSession } = authClient;
