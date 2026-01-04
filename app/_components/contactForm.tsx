/** biome-ignore-all lint/suspicious/noConsole: ok*/
"use client";
import { load } from "@fingerprintjs/botd";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    adress: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const [isBot, setIsBot] = useState(false);
  useEffect(() => {
    (async () => {
      const botd = await load();
      const resBotd = botd.detect();
      setIsBot(resBotd.bot);
    })();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Le format du téléphone est invalide";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Le format de l'email est invalide";
    }

    if (!formData.adress.trim()) {
      newErrors.adress = "L'adresse est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (formData.website?.trim().length > 0) return;

    if (!validateForm()) {
      return;
    }

    try {
      if (isBot) {
        setSubmitError("");
        return;
      }
    } catch (err) {
      console.error(
        "[BotD] Erreur de détection, on laisse passer la requête",
        err,
      );
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        adress: "",
        website: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="hidden">
        <Label htmlFor="website">website</Label>
        <Input
          autoComplete="off"
          id="website"
          name="website"
          onChange={handleChange}
          tabIndex={-1}
          value={formData.website}
        />
      </div>

      <div>
        <Label className="text-base" htmlFor="name">
          Nom complet *
        </Label>
        <Input
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
          className="mt-1"
          id="name"
          name="name"
          onChange={handleChange}
          placeholder="Votre nom et prénom"
          required
          value={formData.name}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1" id="name-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <Label className="text-base" htmlFor="phone">
          Téléphone *
        </Label>
        <Input
          aria-describedby={errors.phone ? "phone-error" : undefined}
          aria-invalid={!!errors.phone}
          className="mt-1"
          id="phone"
          name="phone"
          onChange={handleChange}
          placeholder="01 23 45 67 89"
          required
          type="tel"
          value={formData.phone}
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1" id="phone-error" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <Label className="text-base" htmlFor="email">
          Email *
        </Label>
        <Input
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          className="mt-1"
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="votre@email.fr"
          required
          type="email"
          value={formData.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1" id="email-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <Label className="text-base" htmlFor="adress">
          Adresse *
        </Label>
        <Input
          aria-describedby={errors.adress ? "adress-error" : undefined}
          aria-invalid={!!errors.adress}
          className="mt-1"
          id="adress"
          name="adress"
          onChange={handleChange}
          placeholder="Votre adresse complète"
          required
          value={formData.adress}
        />
        {errors.adress && (
          <p className="text-sm text-destructive mt-1" id="adress-error" role="alert">
            {errors.adress}
          </p>
        )}
      </div>

      <div>
        <Label className="text-base" htmlFor="message">
          Message (optionnel)
        </Label>
        <Textarea
          className="mt-1 min-h-32"
          id="message"
          name="message"
          onChange={handleChange}
          placeholder="Décrivez votre projet..."
          value={formData.message}
        />
      </div>

      {submitError && (
        <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md" role="alert">
          {submitError}
        </div>
      )}

      <Button
        aria-busy={isSubmitting}
        className="w-full text-lg py-6"
        disabled={isSubmitting}
        size="lg"
        type="submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </Button>
    </form>
  );
}
