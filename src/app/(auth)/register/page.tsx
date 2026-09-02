import { AuthSplitLayout } from "@/components/layout/AuthSplitLayout";
import { RegisterForm } from "./RegisterForm";

export const metadata = {
  title: "Register | RECONNECT",
};

export default function RegisterPage() {
  return (
    <AuthSplitLayout currentTab="register">
      <RegisterForm />
    </AuthSplitLayout>
  );
}
