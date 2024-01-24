import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkouform";
export default function Checkout() {
  const stripPromise = loadStripe(
    "pk_test_51OXgiuAJ4nwhwATXWoW5buXWHVfQbiojFzUfDwJG3UsbDetZqLQe9X1WTWg8uRq9ps3B3T9AjcQAis5ebo0IgHbY00XDR6KbGX"
  );

  const options = {
    mode: "payment",
    currency: "usd",
    amount: 100,
  };
  return (
    <>
      <Elements stripe={stripPromise} options={options as any}>
        <CheckoutForm />
      </Elements>
    </>
  );
}
