import { checkSubscription } from "@/lib"
import { Separator } from "@/components/ui";

import {SubscriptionButton} from './_components'

import { Info } from "../_components";

const BillingPage = async () => {
  // const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={true} />
      <Separator className="my-2" />
      <SubscriptionButton
        isPro={true}
      />
    </div>
  );
};

export default BillingPage;