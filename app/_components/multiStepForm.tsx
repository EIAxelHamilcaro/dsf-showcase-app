"use client";

import {
  Bath,
  Check,
  Home,
  Loader2,
  type LucideIcon,
  ShowerHead,
  User,
} from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, type FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  errorProps,
  FieldError,
  FormError,
  PhoneFallback,
} from "./contactFeedback";
import {
  type ContactErrors,
  useContactSubmission,
} from "./useContactSubmission";

type QuestionField = "step1" | "step2" | "step3" | "step4";

interface GuideRequest {
  step1?: string;
  step2?: string;
  step3?: string;
  step4?: string;
  name: string;
  phone: string;
  email: string;
  adress: string;
  message?: string;
  consentMain: boolean;
  consentPartners: boolean;
}

interface Question {
  field: QuestionField;
  title: string;
  options: { value: string; label: string; icon?: LucideIcon }[];
}

interface ModalFormProps {
  link?: string;
  phone?: string | null;
}

const questions: Question[] = [
  {
    field: "step1",
    title: "Êtes-vous propriétaire ou locataire ?",
    options: [
      { value: "proprietaire", label: "Propriétaire", icon: Home },
      { value: "locataire", label: "Locataire", icon: User },
    ],
  },
  {
    field: "step2",
    title: "Maison ou appartement ?",
    options: [
      { value: "maison", label: "Maison", icon: Home },
      { value: "appart", label: "Appartement", icon: User },
    ],
  },
  {
    field: "step3",
    title: "Actuellement :",
    options: [
      { value: "baignoire", label: "Baignoire", icon: Bath },
      { value: "douche", label: "Douche", icon: ShowerHead },
    ],
  },
  {
    field: "step4",
    title: "Âge du bénéficiaire :",
    options: [
      { value: "moins70", label: "Moins de 70 ans" },
      { value: "plus70", label: "Plus de 70 ans" },
    ],
  },
];

const contactStep = questions.length + 1;
const consentStep = contactStep + 1;
const contactFields = ["name", "phone", "email", "adress", "message"];
const consentRequired = "Cochez cette case pour envoyer votre demande.";
const inputClassName =
  "mt-1 h-12 sm:h-14 text-base sm:text-lg md:text-xl px-3 sm:px-4";

function RadioOption({
  icon: Icon,
  label,
  isSelected,
  onSelect,
}: {
  icon?: LucideIcon;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: the validated card design is a styled block, a native radio would change its keyboard and auto-advance behaviour
    <div
      aria-checked={isSelected}
      className={`flex flex-col justify-center items-center gap-2 sm:gap-4 p-4 sm:p-6 md:p-8 border-4 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-200 hover:shadow-xl ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-gray-300 hover:border-primary/50"
      }`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      role="radio"
      tabIndex={0}
    >
      {Icon && (
        <Icon
          className={`${
            isSelected ? "text-primary" : "text-gray-600"
          } w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16`}
        />
      )}
      <span
        className={`text-base sm:text-lg md:text-2xl font-semibold text-center ${
          isSelected ? "text-primary" : "text-gray-800"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function QuestionStep({
  question,
  selected,
  onSelect,
}: {
  question: Question;
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-8 text-xl font-medium">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        {question.title}
      </h2>
      <RadioGroup
        className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6"
        value={selected}
      >
        {question.options.map((option) => (
          <RadioOption
            icon={option.icon}
            isSelected={selected === option.value}
            key={option.value}
            label={option.label}
            onSelect={() => onSelect(option.value)}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

function ContactStep({
  data,
  errors,
  onChange,
}: {
  data: GuideRequest;
  errors: ContactErrors;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) {
  const id = useId();

  return (
    <div className="space-y-8 text-xl font-medium">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
        Vos coordonnées
      </h2>
      <div className="grid gap-4 sm:gap-6">
        <div>
          <Label className="text-base sm:text-lg" htmlFor={`${id}-name`}>
            Votre nom*
          </Label>
          <Input
            {...errorProps(`${id}-name`, errors.name)}
            autoComplete="name"
            className={inputClassName}
            name="name"
            onChange={onChange}
            required
            type="text"
            value={data.name}
          />
          <FieldError error={errors.name} id={`${id}-name`} />
        </div>
        <div>
          <Label className="text-base sm:text-lg" htmlFor={`${id}-phone`}>
            Téléphone*
          </Label>
          <Input
            {...errorProps(`${id}-phone`, errors.phone)}
            autoComplete="tel"
            className={inputClassName}
            inputMode="tel"
            name="phone"
            onChange={onChange}
            required
            type="tel"
            value={data.phone}
          />
          <FieldError error={errors.phone} id={`${id}-phone`} />
        </div>
        <div>
          <Label className="text-base sm:text-lg" htmlFor={`${id}-email`}>
            Email*
          </Label>
          <Input
            {...errorProps(`${id}-email`, errors.email)}
            autoComplete="email"
            className={inputClassName}
            inputMode="email"
            name="email"
            onChange={onChange}
            required
            type="email"
            value={data.email}
          />
          <FieldError error={errors.email} id={`${id}-email`} />
        </div>
        <div>
          <Label className="text-base sm:text-lg" htmlFor={`${id}-adress`}>
            Adresse complète*
          </Label>
          <Input
            {...errorProps(`${id}-adress`, errors.adress)}
            autoComplete="street-address"
            className={inputClassName}
            name="adress"
            onChange={onChange}
            required
            type="text"
            value={data.adress}
          />
          <FieldError error={errors.adress} id={`${id}-adress`} />
        </div>
        <div>
          <Label className="text-base sm:text-lg" htmlFor={`${id}-message`}>
            Message (optionnel)
          </Label>
          <Textarea
            {...errorProps(`${id}-message`, errors.message)}
            className="mt-1 text-base sm:text-lg md:text-xl p-3 sm:p-4"
            name="message"
            onChange={onChange}
            value={data.message ?? ""}
          />
          <FieldError error={errors.message} id={`${id}-message`} />
        </div>
      </div>
    </div>
  );
}

function ConsentStep({
  data,
  errors,
  onCheck,
}: {
  data: GuideRequest;
  errors: ContactErrors;
  onCheck: (field: "consentMain" | "consentPartners", checked: boolean) => void;
}) {
  const id = useId();

  return (
    <div className="space-y-8 text-xl font-medium">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8">
        Consentements nécessaires
      </h2>
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-start gap-4">
            <Checkbox
              {...errorProps(`${id}-main`, errors.consentMain)}
              checked={data.consentMain}
              className="w-8 h-8 border-2 border-gray-400 mt-1 cursor-pointer"
              onCheckedChange={(checked) =>
                onCheck("consentMain", checked === true)
              }
            />
            <Label className="text-base text-pretty" htmlFor={`${id}-main`}>
              Oui, je consens au traitement de mes données personnelles par
              Douche Senior France et ses éventuels sous-traitants, pour le
              suivi de ma demande et de la relation commerciale qui peut en
              découler.
              <span className="text-red-500">*</span>
            </Label>
          </div>
          <FieldError error={errors.consentMain} id={`${id}-main`} />
        </div>

        <div>
          <div className="flex items-start gap-4">
            <Checkbox
              checked={data.consentPartners}
              className="w-8 h-8 border-2 border-gray-400 mt-1 cursor-pointer"
              id={`${id}-partners`}
              onCheckedChange={(checked) =>
                onCheck("consentPartners", checked === true)
              }
            />
            <Label className="text-base text-pretty" htmlFor={`${id}-partners`}>
              Oui, je consens au traitement de mes données personnelles par les
              partenaires de Douche Senior France.
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalMultiStepForm({ link, phone }: ModalFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState<GuideRequest>({
    name: "",
    phone: "",
    email: "",
    adress: "",
    consentMain: false,
    consentPartners: false,
  });
  const { formRef, errors, formError, isPending, turnstileWidget, ...form } =
    useContactSubmission({
      onFieldErrors: (fieldErrors) => {
        if (contactFields.some((field) => field in fieldErrors)) {
          setStep(contactStep);
        }
      },
    });

  const goNext = () => setStep((current) => Math.min(consentStep, current + 1));
  const goBack = () => setStep((current) => Math.max(1, current - 1));

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setData((previous) => ({ ...previous, [name]: value }));
    form.clearError(name);
  };

  const handleAnswer = (field: QuestionField, value: string) => {
    setData((previous) => ({ ...previous, [field]: value }));
    setTimeout(goNext, 150);
  };

  const handleCheck = (
    field: "consentMain" | "consentPartners",
    checked: boolean,
  ) => {
    setData((previous) => ({ ...previous, [field]: checked }));
    form.clearError(field);
  };

  const handleNext = () => {
    if (step === contactStep && !form.check(data)) {
      return;
    }

    goNext();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (step < consentStep) {
      handleNext();
      return;
    }

    const isSent = await form.submit(
      data,
      data.consentMain ? {} : { consentMain: consentRequired },
    );

    setIsSubmitted(isSent);
  };

  const question = questions[step - 1];

  if (isSubmitted)
    return (
      <div className="text-center space-y-10 py-10 flex flex-col">
        <Check className="mx-auto text-green-500 w-20 h-20" />
        <h2 className="text-4xl font-bold">Merci pour votre demande !</h2>
        <p className="text-2xl text-gray-700">
          Votre demande a bien été envoyée.
        </p>
        {link && (
          <Button asChild className="text-xl px-10 py-6">
            <Link href={link} target="_blank">
              Accéder au document
            </Link>
          </Button>
        )}
      </div>
    );

  return (
    <form
      className="space-y-12"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Progress
        className="h-4 rounded-full"
        value={(step / consentStep) * 100}
      />

      {question && (
        <QuestionStep
          onSelect={(value) => handleAnswer(question.field, value)}
          question={question}
          selected={data[question.field]}
        />
      )}
      {step === contactStep && (
        <ContactStep data={data} errors={errors} onChange={handleChange} />
      )}
      {step === consentStep && (
        <ConsentStep data={data} errors={errors} onCheck={handleCheck} />
      )}

      {step > 1 && (
        <div className="space-y-4">
          {step === consentStep && turnstileWidget}
          <FormError message={formError} />
          <div className="flex justify-between mt-10">
            <Button
              className="text-xl px-8 py-5"
              onClick={goBack}
              type="button"
              variant="secondary"
            >
              Retour
            </Button>
            {step < consentStep && (
              <Button
                className="text-xl px-8 py-5"
                onClick={handleNext}
                type="button"
              >
                Suivant
              </Button>
            )}
            {step === consentStep && (
              <Button
                aria-busy={isPending}
                className="text-xl px-10 py-6"
                disabled={isPending}
                type="submit"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer"
                )}
              </Button>
            )}
          </div>
          {step >= contactStep && <PhoneFallback phone={phone} />}
        </div>
      )}
    </form>
  );
}
