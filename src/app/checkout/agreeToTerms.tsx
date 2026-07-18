import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import type { FC } from "react";

interface Props {
  checked: boolean;
  handleTermCondition: (value: boolean) => void;
}

const TermsCondition: FC<Props> = ({ checked, handleTermCondition }) => {
  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(checked: boolean) => handleTermCondition(checked)}
        className="mt-0.5 rounded-md border-neutral-300 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
      />
      <Label
        htmlFor="terms"
        className="text-xs text-neutral-600 leading-relaxed cursor-pointer select-none">
        I have read and agree to the website{" "}
        <Link
          href="/terms-conditions"
          className="text-neutral-900 font-medium underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 transition-colors">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="/return-policy"
          className="text-neutral-900 font-medium underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 transition-colors">
          Return & Refund Policy
        </Link>
      </Label>
    </div>
  );
};

export default TermsCondition;
