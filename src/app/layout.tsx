import { AppContextProvider } from "@/context/AppContext";
import "@/styles.css";

export const metadata = {
  title: "RECONNECT",
  description: "Your journey. Our support. Stronger together.",
};

import { createClient } from "@/utils/supabase/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  
  let profile = null;
  if (userData?.user) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userData.user.id).single();
    if (error) {
      console.error("DEBUG: Error fetching profile for user", userData.user.id, error);
    } else {
      console.log("DEBUG: Fetched profile", data);
    }
    profile = data;
  } else {
    console.log("DEBUG: No userData.user found");
  }

  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        <AppContextProvider initialProfile={profile} initialEmail={userData?.user?.email}>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
