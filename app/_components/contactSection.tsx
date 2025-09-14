"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="votre@email.fr"
                    type="email"
                    value={formData.email}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Votre projet</Label>
                  <Textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
                    placeholder="Décrivez-nous votre projet d'adaptation de salle de bain..."
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
                      01 23 45 67 89
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
                    <p className="text-primary">contact@sdb-seniors.fr</p>
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
                    <h3 className="font-semibold mb-1">Zone d'intervention</h3>
                    <p className="text-muted-foreground">
                      Région Centre
                      <br />
                      Déplacements dans un rayon de 100km
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
                      Délais d'intervention
                    </h3>
                    <p className="text-muted-foreground">
                      • Devis gratuit : sous 48h
                      <br />• Début des travaux : 1-2 semaines
                      <br />• Durée moyenne : 2-3 jours
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
