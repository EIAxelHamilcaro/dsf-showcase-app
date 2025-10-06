"use client";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
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
    adress: "",
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
      setFormData({ name: "", phone: "", email: "", message: "", adress: "" });
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
    <section
      className="py-16 lg:py-24 bg-muted mx-auto px-10 lg:px-32"
      id="contact"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">
          Demandez votre devis gratuit
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Intervention rapide dans votre région. Étude personnalisée de vos
          besoins.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 text-lg">
        {/* Contact Form */}
        <Card className="text-lg">
          <CardHeader>
            <CardTitle>Formulaire de contact</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label className="text-lg" htmlFor="name">
                  Nom complet *
                </Label>
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
                <Label className="text-lg" htmlFor="phone">
                  Téléphone *
                </Label>
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
                <Label className="text-lg" htmlFor="email">
                  Email *
                </Label>
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
                <Label className="text-lg" htmlFor="adress">
                  Adresse *
                </Label>
                <Input
                  id="adress"
                  name="adress"
                  onChange={handleChange}
                  placeholder="rue - ville - département"
                  required
                  type="text"
                  value={formData.adress}
                />
              </div>

              <div>
                <Label className="text-lg" htmlFor="message">
                  Votre projet *
                </Label>
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

              <p className="text-lg text-muted-foreground text-center">
                * Champs obligatoires. Réponse sous 24h maximum.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6 text-lg">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Phone className="text-primary" size={40} />
                <div>
                  <h3 className="font-semibold mb-1">
                    Appelez-nous directement
                  </h3>
                  <Button asChild variant="link">
                    <Link
                      className="flex items-center text-primary py-2"
                      href={`tel:+33${config?.phone?.replace(/\s|^0/g, "")}`}
                    >
                      <Phone size={16} />
                      <span className="font-medium text-xl">
                        {config.phone}
                      </span>
                    </Link>
                  </Button>
                  <p className="">{config.form_section?.disponibility}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Mail className="text-primary" size={40} />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <Button asChild variant="link">
                    <Link
                      className="flex items-center text-primary py-2"
                      href={`mailto:${config.email}`}
                    >
                      <Mail size={16} />
                      <span className="font-medium text-xl">
                        {config.email}
                      </span>
                    </Link>
                  </Button>
                  <p className="">Réponse sous 24h maximum</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary" size={40} />
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
                <Clock className="text-primary" size={40} />
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
    </section>
  );
}
