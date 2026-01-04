/** biome-ignore-all lint/suspicious/noConsole: ok*/
"use client";
import { load } from "@fingerprintjs/botd";
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

  const [isBot, setIsBot] = useState(false);
  useEffect(() => {
    (async () => {
      const botd = await load();
      const resBotd = botd.detect();
      setIsBot(resBotd.bot);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website?.trim().length > 0) return;
    try {
      if (isBot) {
        alert("Message envoyé ✅");
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

      alert("Message envoyé ! Nous vous recontacterons rapidement. ✅");
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
      alert("Une erreur est survenue. Veuillez réessayer.");
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
          className="mt-1"
          id="name"
          name="name"
          onChange={handleChange}
          placeholder="Votre nom et prénom"
          required
          value={formData.name}
        />
      </div>

      <div>
        <Label className="text-base" htmlFor="phone">
          Téléphone *
        </Label>
        <Input
          className="mt-1"
          id="phone"
          name="phone"
          onChange={handleChange}
          placeholder="01 23 45 67 89"
          required
          type="tel"
          value={formData.phone}
        />
      </div>

      <div>
        <Label className="text-base" htmlFor="email">
          Email *
        </Label>
        <Input
          className="mt-1"
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="votre@email.fr"
          required
          type="email"
          value={formData.email}
        />
      </div>

      <div>
        <Label className="text-base" htmlFor="adress">
          Adresse *
        </Label>
        <Input
          className="mt-1"
          id="adress"
          name="adress"
          onChange={handleChange}
          placeholder="Votre adresse complète"
          required
          value={formData.adress}
        />
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

      <Button
        className="w-full text-lg py-6"
        disabled={isSubmitting}
        size="lg"
        type="submit"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
