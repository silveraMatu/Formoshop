import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginSchema, type LoginInput } from "../schemas";
import { useLogin } from "../hooks/useLogin";
import { Input } from "@/shared/components/Input";
import { PasswordInput } from "@/shared/components/PasswordInput";
import { Button } from "@/shared/components/Button";

export function LoginForm() {
  const { submit, loading, error } = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const ok = await submit(data);
    if (ok) {
      toast.success("Bienvenido");
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="ejemplo@email.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordInput
        label="Contraseña"
        placeholder="••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" loading={loading}>
        Iniciar sesión
      </Button>

      <p className="app-form__hint text-center text-sm">
        ¿No tenés cuenta?{" "}
        <Link
          to="/register"
          className="app-form__link font-semibold hover:underline"
        >
          Registrate
        </Link>
      </p>
    </form>
  );
}
