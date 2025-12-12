/** biome-ignore-all lint/suspicious/noConsole: ok*/
"use client";
import { load } from "@fingerprintjs/botd";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Config1 } from "@/payload-types";

export function ContactSection({ config }: { config: Config1 }) {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message envoyé ✅");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          adress: "",
          website: "",
        });
      } else {
        alert("Erreur lors de l'envoi ❌");
      }
    } catch (_e) {
      alert("Erreur lors de l'envoi ❌");
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
    <section
      className="py-12 md:py-16 lg:py-24 bg-muted mx-auto px-4 sm:px-10 md:px-16 lg:px-32 overflow-hidden"
      id="contact"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Demandez votre devis gratuit
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty">
          Intervention rapide dans votre région. Étude personnalisée de vos
          besoins.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Form */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl">Formulaire de contact</CardTitle>
          </CardHeader>
          <CardContent>
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
                <Label className="text-base sm:text-lg" htmlFor="name">
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
                <Label className="text-base sm:text-lg" htmlFor="phone">
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
                <Label className="text-base sm:text-lg" htmlFor="email">
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
                <Label className="text-base sm:text-lg" htmlFor="adress">
                  Adresse *
                </Label>
                <Input
                  className="mt-1"
                  id="adress"
                  name="adress"
                  onChange={handleChange}
                  placeholder="ville - département"
                  required
                  type="text"
                  value={formData.adress}
                />
              </div>

              <div>
                <Label className="text-base sm:text-lg" htmlFor="message">
                  Votre projet
                </Label>
                <Textarea
                  className="mt-1"
                  id="message"
                  name="message"
                  onChange={handleChange}
                  placeholder="Décrivez-nous votre projet d'adaptation de salle de bain..."
                  rows={4}
                  value={formData.message}
                />
              </div>

              <Button
                className="w-full"
                disabled={
                  isSubmitting ||
                  !formData.name ||
                  !formData.email ||
                  !formData.adress ||
                  !formData.phone
                }
                size="lg"
                type="submit"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>

              <p className="text-sm sm:text-base text-muted-foreground text-center">
                * Champs obligatoires. Réponse sous 24h maximum.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <Phone className="text-primary shrink-0" size={28} />
                <div className="min-w-0">
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">
                    Appelez-nous directement
                  </h3>
                  <a
                    className="flex items-center gap-2 text-primary py-1"
                    href={`tel:+33${config?.phone?.replace(/\s|^0/g, "")}`}
                  >
                    <span className="font-medium text-base sm:text-lg break-all">
                      {config.phone}
                    </span>
                  </a>
                  <p className="text-sm sm:text-base text-muted-foreground">{config.form_section?.disponibility}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <Mail className="text-primary shrink-0" size={28} />
                <div className="min-w-0">
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Email</h3>
                  <a
                    className="flex items-center gap-2 text-primary py-1"
                    href={`mailto:${config.email}`}
                  >
                    <span className="font-medium text-base sm:text-lg break-all">
                      {config.email}
                    </span>
                  </a>
                  <p className="text-sm sm:text-base text-muted-foreground">Réponse sous 24h maximum</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="text-primary shrink-0" size={28} />
                <div className="min-w-0">
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">
                    {config.form_section?.work_zone?.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {config.form_section?.work_zone?.region}
                    <br />
                    {config.form_section?.work_zone?.radius}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <Clock className="text-primary shrink-0" size={28} />
                <div className="min-w-0">
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">
                    {config.form_section?.time_section?.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {config.form_section?.time_section?.list?.devis}
                    <br />
                    {config.form_section?.time_section?.list?.travaux}
                    <br />
                    {config.form_section?.time_section?.list?.total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
