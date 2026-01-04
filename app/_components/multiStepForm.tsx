/** biome-ignore-all lint/suspicious/noExplicitAny: ok */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: ok */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: ok */
"use client";

import { load } from "@fingerprintjs/botd";
import { Bath, Check, Home, HomeIcon, ShowerHead, User } from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

// ------------------------------------
// 🔹 Types
// ------------------------------------
export type FormData = {
  step1?: "proprietaire" | "locataire";
  step2?: "maison" | "appart";
  step3?: "baignoire" | "douche";
  step4?: "moins70" | "plus70";
  name: string;
  phone: string;
  email: string;
  adress: string;
  message?: string;
  consentMain: boolean;
  consentPartners: boolean;
};

interface ModalFormProps {
  initialData?: Partial<FormData>;
  link?: string;
}

// ------------------------------------
// 🔹 Sous-composants partagés
// ------------------------------------
const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-8 text-xl font-medium">{children}</div>
);

const RadioOption = ({
  id,
  icon: Icon,
  label,
  value,
  group,
  autoNext,
  onSelect,
  isSelected,
}: {
  id: string;
  icon?: any;
  label: string;
  value: string;
  group: keyof FormData;
  autoNext?: boolean;
  onSelect: (group: keyof FormData, value: string, autoNext?: boolean) => void;
  isSelected?: boolean;
}) => (
  <div
    aria-checked={isSelected}
    className={`flex flex-col justify-center items-center gap-2 sm:gap-4 p-4 sm:p-6 md:p-8 border-4 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-200 hover:shadow-xl ${
      isSelected
        ? "border-primary bg-primary/10"
        : "border-gray-300 hover:border-primary/50"
    }`}
    onClick={() => onSelect(group, value, autoNext)}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(group, value, autoNext);
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

// ------------------------------------
// 🔹 Steps
// ------------------------------------
export const Step1 = ({ data, onSelect }: any) => (
  <StepWrapper>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
      Êtes-vous propriétaire ou locataire ?
    </h2>
    <RadioGroup
      className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6"
      onValueChange={(val) => onSelect("step1", val, true)}
      value={data.step1}
    >
      <RadioOption
        autoNext
        group="step1"
        icon={Home}
        id="prop"
        isSelected={data.step1 === "proprietaire"}
        label="Propriétaire"
        onSelect={onSelect}
        value="proprietaire"
      />
      <RadioOption
        autoNext
        group="step1"
        icon={User}
        id="loc"
        isSelected={data.step1 === "locataire"}
        label="Locataire"
        onSelect={onSelect}
        value="locataire"
      />
    </RadioGroup>
  </StepWrapper>
);

export const Step2 = ({ data, onSelect }: any) => (
  <StepWrapper>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
      Maison ou appartement ?
    </h2>
    <RadioGroup
      className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6"
      onValueChange={(val) => onSelect("step2", val, true)}
      value={data.step2}
    >
      <RadioOption
        autoNext
        group="step2"
        icon={HomeIcon}
        id="maison"
        isSelected={data.step2 === "maison"}
        label="Maison"
        onSelect={onSelect}
        value="maison"
      />
      <RadioOption
        autoNext
        group="step2"
        icon={User}
        id="appart"
        isSelected={data.step2 === "appart"}
        label="Appartement"
        onSelect={onSelect}
        value="appart"
      />
    </RadioGroup>
  </StepWrapper>
);

export const Step3 = ({ data, onSelect }: any) => (
  <StepWrapper>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
      Actuellement :
    </h2>
    <RadioGroup
      className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6"
      onValueChange={(val) => onSelect("step3", val, true)}
      value={data.step3}
    >
      <RadioOption
        autoNext
        group="step3"
        icon={Bath}
        id="bain"
        isSelected={data.step3 === "baignoire"}
        label="Baignoire"
        onSelect={onSelect}
        value="baignoire"
      />
      <RadioOption
        autoNext
        group="step3"
        icon={ShowerHead}
        id="douche"
        isSelected={data.step3 === "douche"}
        label="Douche"
        onSelect={onSelect}
        value="douche"
      />
    </RadioGroup>
  </StepWrapper>
);

export const Step4 = ({ data, onSelect }: any) => (
  <StepWrapper>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
      Âge du bénéficiaire :
    </h2>
    <RadioGroup
      className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6"
      onValueChange={(val) => onSelect("step4", val, true)}
      value={data.step4}
    >
      <RadioOption
        autoNext
        group="step4"
        id="moins70"
        isSelected={data.step4 === "moins70"}
        label="Moins de 70 ans"
        onSelect={onSelect}
        value="moins70"
      />
      <RadioOption
        autoNext
        group="step4"
        id="plus70"
        isSelected={data.step4 === "plus70"}
        label="Plus de 70 ans"
        onSelect={onSelect}
        value="plus70"
      />
    </RadioGroup>
  </StepWrapper>
);

export const Step5 = ({ data, onChange }: any) => (
  <StepWrapper>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
      Vos coordonnées
    </h2>
    <div className="grid gap-4 sm:gap-6 text-base sm:text-lg md:text-xl">
      <Input
        className="h-12 sm:h-14 text-base sm:text-lg md:text-xl px-3 sm:px-4"
        name="name"
        onChange={onChange}
        placeholder="Votre nom*"
        required
        type="text"
        value={data.name}
      />
      <Input
        className="h-12 sm:h-14 text-base sm:text-lg md:text-xl px-3 sm:px-4"
        name="phone"
        onChange={onChange}
        placeholder="Téléphone*"
        required
        type="tel"
        value={data.phone}
      />
      <Input
        className="h-12 sm:h-14 text-base sm:text-lg md:text-xl px-3 sm:px-4"
        name="email"
        onChange={onChange}
        placeholder="Email*"
        required
        type="email"
        value={data.email}
      />
      <Input
        className="h-12 sm:h-14 text-base sm:text-lg md:text-xl px-3 sm:px-4"
        name="adress"
        onChange={onChange}
        placeholder="Adresse complète*"
        required
        type="text"
        value={data.adress}
      />
      <Textarea
        className="text-base sm:text-lg md:text-xl p-3 sm:p-4"
        name="message"
        onChange={onChange}
        placeholder="Message (optionnel)"
        value={data.message}
      />
    </div>
  </StepWrapper>
);

export const Step6 = ({ data, setData }: any) => (
  <StepWrapper>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8">
      Consentements nécessaires
    </h2>
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={data.consentMain}
          className="w-8 h-8 border-2 border-gray-400 mt-1 cursor-pointer"
          onCheckedChange={(checked) =>
            setData((prev: any) => ({ ...prev, consentMain: Boolean(checked) }))
          }
        />
        <Label className="text-base text-pretty">
          Oui, je consens au traitement de mes données personnelles par Douche
          Senior France et ses éventuels sous-traitants, pour le suivi de ma
          demande et de la relation commerciale qui peut en découler.
          <span className="text-red-500">*</span>
        </Label>
      </div>

      <div className="flex items-start gap-4">
        <Checkbox
          checked={data.consentPartners}
          className="w-8 h-8 border-2 border-gray-400 mt-1 cursor-pointer"
          onCheckedChange={(checked) =>
            setData((prev: any) => ({
              ...prev,
              consentPartners: Boolean(checked),
            }))
          }
        />
        <Label className="text-base texte-pretty">
          Oui, je consens au traitement de mes données personnelles par les
          partenaires de Douche Senior France.
          <span className="text-red-500">*</span>
        </Label>
      </div>
    </div>
  </StepWrapper>
);

// ------------------------------------
// 🔹 Composant principal
// ------------------------------------
export function ModalMultiStepForm({ initialData, link }: ModalFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    adress: "",
    consentMain: false,
    consentPartners: false,
    ...initialData,
  });

  const [isBot, setIsBot] = useState(false);
  useEffect(() => {
    (async () => {
      const botd = await load();
      const resBotd = botd.detect();
      setIsBot(resBotd.bot);
    })();
  }, []);

  const goNext = () => setStep((s) => Math.min(6, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (
    name: keyof FormData,
    value: string,
    autoNext = false,
  ) => {
    setData((prev) => ({ ...prev, [name]: value as any }));
    if (autoNext) setTimeout(goNext, 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBot) return;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsSubmitted(true);
    } else {
      alert("Erreur lors de l'envoi ❌");
    }
  };

  const progressValue = (step / 6) * 100;
  const canSubmit = data.consentMain && data.consentPartners;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={data} onSelect={handleRadioChange} />;
      case 2:
        return <Step2 data={data} onSelect={handleRadioChange} />;
      case 3:
        return <Step3 data={data} onSelect={handleRadioChange} />;
      case 4:
        return <Step4 data={data} onSelect={handleRadioChange} />;
      case 5:
        return <Step5 data={data} onChange={handleChange} />;
      case 6:
        return <Step6 data={data} setData={setData} />;
    }
  };

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
    <form className="space-y-12" onSubmit={handleSubmit}>
      <Progress className="h-4 rounded-full" value={progressValue} />
      {renderStep()}

      {!["step1"].includes(`step${step}`) && (
        <div className="flex justify-between mt-10">
          {step > 1 && (
            <Button
              className="text-xl px-8 py-5"
              onClick={goBack}
              type="button"
              variant="secondary"
            >
              Retour
            </Button>
          )}
          {step < 6 && (
            <Button
              className="text-xl px-8 py-5"
              disabled={
                step === 5 &&
                (data.name.length === 0 ||
                  data.email.length === 0 ||
                  data.phone.length === 0 ||
                  data.adress.length === 0)
              }
              onClick={goNext}
              type="button"
            >
              Suivant
            </Button>
          )}
          {step === 6 && (
            <Button
              className="text-xl px-10 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!canSubmit}
              type="submit"
            >
              Envoyer
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
