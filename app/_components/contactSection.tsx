"use client";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useState } from "react";
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Message envoyé ✅");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } else {
      alert("Erreur lors de l'envoi ❌");
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
    <section className="py-20 bg-muted" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Demandez votre devis gratuit
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Intervention rapide dans votre région. Étude personnalisée de vos
            besoins.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Formulaire de contact</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Votre nom et prénom"
                    required
                    value={formData.name}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
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
                  <Label htmlFor="email">Email *</Label>
                  <Input
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
                  <Label htmlFor="message">Votre projet *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
                    placeholder="Décrivez-nous votre projet d'adaptation de salle de bain..."
                    required
                    rows={4}
                    value={formData.message}
                  />
                </div>

                <Button className="w-full" size="lg" type="submit">
                  Envoyer ma demande
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Champs obligatoires. Réponse sous 24h maximum.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      Appelez-nous directement
                    </h3>
                    <p className="text-2xl font-bold text-primary mb-2">
                      {config.phone || ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Disponible du lundi au vendredi, 8h-18h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-primary">{config.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Réponse sous 24h maximum
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {config.form_section?.work_zone?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {config.form_section?.work_zone?.region}
                      <br />
                      {config.form_section?.work_zone?.radius}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {config.form_section?.time_section?.title}
                    </h3>
                    <p className="text-muted-foreground">
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
      </div>
    </section>
  );
}
