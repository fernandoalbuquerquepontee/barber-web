import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

import { Field, FieldError, FieldLabel } from "./ui/field";
import { toast } from "./ui/toast";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),

  phone_number: z
    .string()
    .trim()
    .refine((value) => {
      const numbersOnly = value.replace(/\D/g, "");

      return /^[1-9]{2}9\d{8}$/.test(numbersOnly);
    }, "Informe um número de celular válido."),
});

type FormData = z.infer<typeof formSchema>;

export function PhoneLogin() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
    },
  });

  const [step, setStep] = useState<1 | 2>(1);
  const [formattedPhone, setFormattedPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestCode = async (data: FormData) => {
    setLoading(true);
    try {
      const numbersOnly = data.phone_number.replace(/\D/g, "");

      const withCountryCode = numbersOnly.startsWith("55")
        ? numbersOnly
        : `55${numbersOnly}`;

      const finalPhone = `+${withCountryCode}`;

      setFormattedPhone(finalPhone);

      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: finalPhone,
      });

      if (error) {
        toast.add({
          type: "error",
          title: "Erro ao enviar código",
          description: error.message,
          priority: "high",
        });
        return;
      }

      toast.add({
        type: "success",
        title: "Código enviado",
        description: `Enviamos um código de verificação para o WhatsApp ${finalPhone}.`,
      });

      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: verifyError } = await authClient.phoneNumber.verify({
        phoneNumber: formattedPhone,
        code: otp,
      });

      if (verifyError) {
        toast.add({
          type: "error",
          title: "Código inválido ou expirado! Erro:",
          description: verifyError.message,
          priority: "high",
        });
        return;
      }

      const name = form.getValues("name");

      const { error: updateError } = await authClient.updateUser({
        name: name.trim(),
      });

      if (updateError) {
        toast.add({
          type: "error",
          title: "Erro ao salvar nome:",
          description: updateError.message,
          priority: "high",
        });
        return;
      }

      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const phone = form.watch("phone_number");

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          {step === 1 ? "Acessar Agendamentos" : "Confirme seu número"}
        </DialogTitle>

        <DialogDescription>
          {step === 1
            ? "Informe seus dados para acessar ou criar sua conta na barbearia."
            : `Enviámos um código de 6 dígitos para o WhatsApp ${phone}.`}
        </DialogDescription>
      </DialogHeader>

      {step === 1 ? (
        <form onSubmit={form.handleSubmit(handleRequestCode)}>
          <div className="grid gap-4 py-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nome & Sobrenome</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Ex: Fernando Albuquerque"
                    disabled={loading}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone_number"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone_number">Telefone</FieldLabel>
                  <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    customInput={Input}
                    id="phone_number"
                    placeholder="(88) 98216-4425"
                    disabled={loading}
                    aria-invalid={fieldState.invalid}
                    getInputRef={field.ref}
                    value={field.value}
                    onBlur={field.onBlur}
                    onValueChange={(values) => {
                      field.onChange(values.formattedValue);
                    }}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Receber Código"
              )}
            </Button>
          </DialogFooter>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <Label htmlFor="otp" className="mb-2 text-center">
              Código de Confirmação
            </Label>

            <InputOTP
              id="otp"
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || otp.length < 6}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirmando...
                </>
              ) : (
                "Confirmar e Entrar"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Voltar e corrigir número
            </Button>
          </DialogFooter>
        </form>
      )}
    </DialogContent>
  );
}
