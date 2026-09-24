import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerSchema, type RegisterInput } from "../schemas";
import { useRegister } from "../hooks/useRegister";
import { Input } from "@/shared/components/Input";
import { PasswordInput } from "@/shared/components/PasswordInput";
import { Button } from "@/shared/components/Button";

export function RegisterForm() {
  const { submit, loading, error } = useRegister();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const { confirmPassword, ...payload } = data;
    const ok = await submit(payload);
    if (ok) {
      toast.success("Cuenta creada");
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre"
        placeholder="Tu nombre"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordInput
        label="Contraseña"
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordInput
        label="Confirmar contraseña"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" loading={loading}>
        Crear cuenta
      </Button>

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tenés cuenta?{" "}
        <Link
          to="/login"
          className="font-medium text-neutral-900 hover:underline dark:text-white"
        >
          Iniciá sesión
        </Link>
      </p>
    </form>
  );
}
