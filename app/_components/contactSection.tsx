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
import { toTelHref } from "@/lib/seo/phone";
import type { Config1 } from "@/payload-types";
import {
  errorProps,
  FieldError,
  FormError,
  fieldClass,
  submitClass,
  textareaClass,
} from "./contactFeedback";
import { PageSection, SectionHeader } from "./pageSection";
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
    <PageSection id="contact" tone="muted">
      <SectionHeader
        className="mb-10"
        heading="Demandez votre devis gratuit"
        intro="Intervention rapide dans votre région. Étude personnalisée de vos besoins."
        isCentered
      />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <Card className="min-w-0 bg-background shadow-none">
          <CardHeader className="px-2 sm:px-6">
            <CardTitle className="text-2xl">Formulaire de contact</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <form
              className="space-y-4"
              noValidate
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div>
                <Label className="text-lg" htmlFor={`${id}-name`}>
                  Nom complet *
                </Label>
                <Input
                  {...errorProps(`${id}-name`, errors.name)}
                  autoComplete="name"
                  className={fieldClass}
                  name="name"
                  onChange={handleChange}
                  placeholder="Votre nom et prénom"
                  required
                  value={formData.name}
                />
                <FieldError error={errors.name} id={`${id}-name`} />
              </div>

              <div>
                <Label className="text-lg" htmlFor={`${id}-phone`}>
                  Téléphone *
                </Label>
                <Input
                  {...errorProps(`${id}-phone`, errors.phone)}
                  autoComplete="tel"
                  className={fieldClass}
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
                <Label className="text-lg" htmlFor={`${id}-email`}>
                  Email *
                </Label>
                <Input
                  {...errorProps(`${id}-email`, errors.email)}
                  autoComplete="email"
                  className={fieldClass}
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
                <Label className="text-lg" htmlFor={`${id}-adress`}>
                  Adresse *
                </Label>
                <Input
                  {...errorProps(`${id}-adress`, errors.adress)}
                  autoComplete="address-level2"
                  className={fieldClass}
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
                <Label className="text-lg" htmlFor={`${id}-message`}>
                  Votre projet
                </Label>
                <Textarea
                  {...errorProps(`${id}-message`, errors.message)}
                  className={textareaClass}
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
                className={submitClass}
                disabled={isPending}
                size="xl"
                type="submit"
              >
                {isPending ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>

              <p className="text-muted-foreground text-center">
                * Champs obligatoires. Réponse sous 24h maximum.
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="min-w-0 space-y-4">
          <Card className="bg-background shadow-none">
            <CardContent className="flex items-start gap-4">
              <Phone
                aria-hidden="true"
                className="mt-1 text-primary shrink-0"
                size={28}
              />
              <div className="min-w-0">
                <h3 className="text-lg font-bold">Appelez-nous directement</h3>
                <a
                  className="flex min-h-11 items-center text-xl font-extrabold text-primary underline hover:no-underline"
                  href={toTelHref(config.phone ?? "")}
                >
                  <span className="break-all">{config.phone}</span>
                </a>
                <p className="text-muted-foreground">
                  {config.form_section?.disponibility}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background shadow-none">
            <CardContent className="flex items-start gap-4">
              <Mail
                aria-hidden="true"
                className="mt-1 text-primary shrink-0"
                size={28}
              />
              <div className="min-w-0">
                <h3 className="text-lg font-bold">Email</h3>
                <a
                  className="flex min-h-11 items-center text-xl font-extrabold text-primary underline hover:no-underline"
                  href={`mailto:${config.email}`}
                >
                  <span className="break-all">{config.email}</span>
                </a>
                <p className="text-muted-foreground">
                  Réponse sous 24h maximum
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background shadow-none">
            <CardContent className="flex items-start gap-4">
              <MapPin
                aria-hidden="true"
                className="mt-1 text-primary shrink-0"
                size={28}
              />
              <div className="min-w-0">
                <h3 className="text-lg font-bold">
                  {config.form_section?.work_zone?.title}
                </h3>
                <p className="text-muted-foreground">
                  {config.form_section?.work_zone?.region}
                  <br />
                  {config.form_section?.work_zone?.radius}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background shadow-none">
            <CardContent className="flex items-start gap-4">
              <Clock
                aria-hidden="true"
                className="mt-1 text-primary shrink-0"
                size={28}
              />
              <div className="min-w-0">
                <h3 className="text-lg font-bold">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </PageSection>
  );
}
