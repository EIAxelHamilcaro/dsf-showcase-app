"use client";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Config1 } from "@/payload-types";
import { errorProps, FieldError, FormError } from "./contactFeedback";
import { useContactSubmission } from "./useContactSubmission";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
  adress: "",
};

export function ContactSection({ config }: { config: Config1 }) {
  const id = useId();
  const [formData, setFormData] = useState(emptyForm);
  const [isSent, setIsSent] = useState(false);
  const success = useRef<HTMLOutputElement>(null);
  const { formRef, errors, formError, isPending, turnstileWidget, ...form } =
    useContactSubmission();

  useEffect(() => {
    if (isSent) {
      success.current?.focus();
    }
  }, [isSent]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSent(false);

    if (!(await form.submit(formData))) {
      return;
    }

    setFormData(emptyForm);
    setIsSent(true);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
    form.clearError(name);
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
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl">
              Formulaire de contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              noValidate
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div>
                <Label className="text-base sm:text-lg" htmlFor={`${id}-name`}>
                  Nom complet *
                </Label>
                <Input
                  {...errorProps(`${id}-name`, errors.name)}
                  autoComplete="name"
                  className="mt-1"
                  name="name"
                  onChange={handleChange}
                  placeholder="Votre nom et prénom"
                  required
                  value={formData.name}
                />
                <FieldError error={errors.name} id={`${id}-name`} />
              </div>

              <div>
                <Label className="text-base sm:text-lg" htmlFor={`${id}-phone`}>
                  Téléphone *
                </Label>
                <Input
                  {...errorProps(`${id}-phone`, errors.phone)}
                  autoComplete="tel"
                  className="mt-1"
                  inputMode="tel"
                  name="phone"
                  onChange={handleChange}
                  placeholder="01 23 45 67 89"
                  required
                  type="tel"
                  value={formData.phone}
                />
                <FieldError error={errors.phone} id={`${id}-phone`} />
              </div>

              <div>
                <Label className="text-base sm:text-lg" htmlFor={`${id}-email`}>
                  Email *
                </Label>
                <Input
                  {...errorProps(`${id}-email`, errors.email)}
                  autoComplete="email"
                  className="mt-1"
                  inputMode="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="votre@email.fr"
                  required
                  type="email"
                  value={formData.email}
                />
                <FieldError error={errors.email} id={`${id}-email`} />
              </div>

              <div>
                <Label
                  className="text-base sm:text-lg"
                  htmlFor={`${id}-adress`}
                >
                  Adresse *
                </Label>
                <Input
                  {...errorProps(`${id}-adress`, errors.adress)}
                  autoComplete="street-address"
                  className="mt-1"
                  name="adress"
                  onChange={handleChange}
                  placeholder="ville - département"
                  required
                  type="text"
                  value={formData.adress}
                />
                <FieldError error={errors.adress} id={`${id}-adress`} />
              </div>

              <div>
                <Label
                  className="text-base sm:text-lg"
                  htmlFor={`${id}-message`}
                >
                  Votre projet
                </Label>
                <Textarea
                  {...errorProps(`${id}-message`, errors.message)}
                  className="mt-1"
                  name="message"
                  onChange={handleChange}
                  placeholder="Décrivez-nous votre projet d'adaptation de salle de bain..."
                  rows={4}
                  value={formData.message}
                />
                <FieldError error={errors.message} id={`${id}-message`} />
              </div>

              {turnstileWidget}

              <FormError message={formError} phone={config.phone} />

              {isSent && (
                <output
                  className="block p-3 bg-primary/10 border border-primary rounded-md font-semibold"
                  ref={success}
                  tabIndex={-1}
                >
                  Votre demande a bien été envoyée.
                </output>
              )}

              <Button
                aria-busy={isPending}
                className="w-full"
                disabled={isPending}
                size="lg"
                type="submit"
              >
                {isPending ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>

              <p className="text-sm sm:text-base text-muted-foreground text-center">
                * Champs obligatoires. Réponse sous 24h maximum.
              </p>
            </form>
          </CardContent>
        </Card>

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
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {config.form_section?.disponibility}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <Mail className="text-primary shrink-0" size={28} />
                <div className="min-w-0">
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">
                    Email
                  </h3>
                  <a
                    className="flex items-center gap-2 text-primary py-1"
                    href={`mailto:${config.email}`}
                  >
                    <span className="font-medium text-base sm:text-lg break-all">
                      {config.email}
                    </span>
                  </a>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Réponse sous 24h maximum
                  </p>
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
