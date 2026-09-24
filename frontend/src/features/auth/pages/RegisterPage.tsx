import { AuthCard } from "../components/AuthCard";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <AuthCard title="Crear cuenta" subtitle="Completá tus datos">
      <RegisterForm />
    </AuthCard>
  );
}
