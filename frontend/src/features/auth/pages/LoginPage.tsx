import { AuthCard } from "../components/AuthCard";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <AuthCard title="Iniciar sesión" subtitle="Ingresá con tu cuenta">
      <LoginForm />
    </AuthCard>
  );
}
