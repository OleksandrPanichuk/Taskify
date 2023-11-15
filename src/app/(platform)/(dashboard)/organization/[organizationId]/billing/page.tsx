import { checkSubscription } from "@/lib"
import { Separator } from "@/components/ui";

import {SubscriptionButton} from './_components'

import { Info } from "../_components";

const BillingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptionButton
        isPro={isPro}
      />
    </div>
  );
};

export default BillingPage;