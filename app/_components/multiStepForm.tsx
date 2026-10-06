"use client";

import {
  Bath,
  Building2,
  CircleCheck,
  Home,
  KeyRound,
  Loader2,
  type LucideIcon,
  ShowerHead,
  User,
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type RefObject,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { consentRequired } from "@/lib/contact/contactSchema";
import {
  errorProps,
  FieldError,
  FormError,
  PhoneFallback,
} from "./contactFeedback";
import {
  ContactFields,
  type ContactValues,
  emptyContact,
} from "./contactFields";
import {
  type ContactErrors,
  useContactSubmission,
} from "./useContactSubmission";

type QuestionField = "step1" | "step2" | "step3" | "step4";

type ConsentField = "consentMain" | "consentPartners";

interface GuideRequest extends ContactValues {
  step1?: string;
  step2?: string;
  step3?: string;
  step4?: string;
  consentMain: boolean;
  consentPartners: boolean;
}

interface QuestionOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface Question {
  field: QuestionField;
  title: string;
  options: QuestionOption[];
}

const questions: Question[] = [
  {
    field: "step1",
    title: "Êtes-vous propriétaire ou locataire ?",
    options: [
      { value: "proprietaire", label: "Propriétaire", icon: KeyRound },
      { value: "locataire", label: "Locataire", icon: User },
    ],
  },
  {
    field: "step2",
    title: "Habitez-vous une maison ou un appartement ?",
    options: [
      { value: "maison", label: "Maison", icon: Home },
      { value: "appart", label: "Appartement", icon: Building2 },
    ],
  },
  {
    field: "step3",
    title: "Qu'avez-vous aujourd'hui dans votre salle de bain ?",
    options: [
      { value: "baignoire", label: "Baignoire", icon: Bath },
      { value: "douche", label: "Douche", icon: ShowerHead },
    ],
  },
  {
    field: "step4",
    title: "Quel est l'âge de la personne concernée ?",
    options: [
      { value: "moins70", label: "Moins de 70 ans" },
      { value: "plus70", label: "70 ans ou plus" },
    ],
  },
];

const contactStep = questions.length + 1;
const consentStep = contactStep + 1;
const contactFields = ["name", "phone", "email", "adress", "message"];

interface StepHeadingProps {
  headingRef: RefObject<HTMLHeadingElement | null>;
  id?: string;
  children: string;
}

function StepHeading({ headingRef, id, children }: StepHeadingProps) {
  return (
    <h3 id={id} ref={headingRef} tabIndex={-1}>
      {children}
    </h3>
  );
}

interface QuestionStepProps {
  question: Question;
  selected?: string;
  onSelect: (value: string) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
}

function QuestionStep({
  question,
  selected,
  onSelect,
  headingRef,
}: QuestionStepProps) {
  const id = useId();

  return (
    <>
      <StepHeading headingRef={headingRef} id={id}>
        {question.title}
      </StepHeading>
      <RadioGroup
        aria-labelledby={id}
        className="grid-cols-2"
        onValueChange={onSelect}
        value={selected ?? ""}
      >
        {question.options.map(({ value, label, icon: Icon }) => (
          <Label className="choice" key={value}>
            {Icon ? <Icon aria-hidden="true" className="icon-mark" /> : null}
            <RadioGroupItem value={value} />
            {label}
          </Label>
        ))}
      </RadioGroup>
    </>
  );
}

interface ConsentStepProps {
  data: GuideRequest;
  errors: ContactErrors;
  onCheck: (field: ConsentField, checked: boolean) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
}

function ConsentStep({ data, errors, onCheck, headingRef }: ConsentStepProps) {
  const id = useId();

  return (
    <>
      <StepHeading headingRef={headingRef}>Votre accord</StepHeading>
      <div className="consent">
        <Checkbox
          {...errorProps(`${id}-main`, errors.consentMain)}
          aria-required
          checked={data.consentMain}
          onCheckedChange={(checked) =>
            onCheck("consentMain", checked === true)
          }
        />
        <Label data-weight="regular" htmlFor={`${id}-main`}>
          Oui, je consens au traitement de mes données personnelles par Douche
          Senior France et ses éventuels sous-traitants, pour le suivi de ma
          demande et de la relation commerciale qui peut en découler.{" "}
          <strong>Obligatoire.</strong>
        </Label>
        <div className="col-start-2">
          <FieldError error={errors.consentMain} id={`${id}-main`} />
        </div>
      </div>

      <div className="consent">
        <Checkbox
          checked={data.consentPartners}
          id={`${id}-partners`}
          onCheckedChange={(checked) =>
            onCheck("consentPartners", checked === true)
          }
        />
        <Label data-weight="regular" htmlFor={`${id}-partners`}>
          Oui, je consens au traitement de mes données personnelles par les
          partenaires de Douche Senior France. Facultatif.
        </Label>
      </div>
    </>
  );
}

export interface ModalMultiStepFormProps {
  link?: string;
  phone?: string | null;
}

export function ModalMultiStepForm({ link, phone }: ModalMultiStepFormProps) {
  const id = useId();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState<GuideRequest>({
    ...emptyContact,
    consentMain: false,
    consentPartners: false,
  });
  const heading = useRef<HTMLHeadingElement>(null);
  const hasMoved = useRef(false);
  const { formRef, errors, formError, isPending, turnstileWidget, ...form } =
    useContactSubmission({
      onFieldErrors: (fieldErrors) => {
        if (contactFields.some((field) => field in fieldErrors)) {
          setStep(contactStep);
        }
      },
    });

  // biome-ignore lint/correctness/useExhaustiveDependencies: the heading of the step that just appeared takes the focus
  useEffect(() => {
    if (hasMoved.current) {
      hasMoved.current = false;
      heading.current?.focus();
    }
  }, [step]);

  const goTo = (target: number) => {
    hasMoved.current = true;
    setStep(Math.min(consentStep, Math.max(1, target)));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setData((previous) => ({ ...previous, [name]: value }));
    form.clearError(name);
  };

  const handleCheck = (field: ConsentField, checked: boolean) => {
    setData((previous) => ({ ...previous, [field]: checked }));
    form.clearError(field);
  };

  const handleNext = () => {
    if (step === contactStep && !form.check(data)) {
      return;
    }

    goTo(step + 1);
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
  const progressLabel = `Étape ${step} sur ${consentStep}`;

  if (isSubmitted) {
    return (
      <output
        className="notice grid justify-items-start gap-stack"
        data-tone="success"
        ref={(node) => node?.focus()}
        tabIndex={-1}
      >
        <CircleCheck aria-hidden="true" className="icon-mark" />
        <strong>Votre demande est envoyée.</strong>
        {link ? (
          <Button asChild size="lg">
            <a href={link} rel="noopener" target="_blank">
              Ouvrir le document (PDF, nouvel onglet)
            </a>
          </Button>
        ) : null}
      </output>
    );
  }

  return (
    <form
      className="grid gap-stack"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <p className="small soft" id={`${id}-progress`}>
        {progressLabel}
      </p>
      <Progress
        aria-labelledby={`${id}-progress`}
        value={(step / consentStep) * 100}
      />

      {question ? (
        <QuestionStep
          headingRef={heading}
          onSelect={(value) =>
            setData((previous) => ({ ...previous, [question.field]: value }))
          }
          question={question}
          selected={data[question.field]}
        />
      ) : null}
      {step === contactStep ? (
        <>
          <StepHeading headingRef={heading}>Vos coordonnées</StepHeading>
          <ContactFields
            errors={errors}
            id={id}
            onChange={handleChange}
            values={data}
          />
        </>
      ) : null}
      {step === consentStep ? (
        <>
          <ConsentStep
            data={data}
            errors={errors}
            headingRef={heading}
            onCheck={handleCheck}
          />
          {turnstileWidget}
        </>
      ) : null}

      <FormError message={formError} />

      <div className="flex flex-wrap justify-between gap-inline">
        {step > 1 ? (
          <Button
            onClick={() => goTo(step - 1)}
            size="lg"
            type="button"
            variant="secondary"
          >
            Retour
          </Button>
        ) : null}
        {step < consentStep ? (
          <Button
            className="ml-auto"
            key="next"
            onClick={handleNext}
            size="lg"
            type="button"
          >
            Suivant
          </Button>
        ) : (
          <Button
            aria-busy={isPending}
            disabled={isPending}
            key="submit"
            size="lg"
            type="submit"
          >
            {isPending ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                Envoi en cours
              </>
            ) : (
              "Envoyer et recevoir le document"
            )}
          </Button>
        )}
      </div>

      {step >= contactStep ? <PhoneFallback phone={phone} /> : null}
    </form>
  );
}
