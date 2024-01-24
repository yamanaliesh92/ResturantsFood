import { useCreatePaymentMutation } from "../../redux/api/user.api";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../button";

interface I {
  amount: string;
}

export default function CheckoutForm() {
  const [SearchParams] = useSearchParams();
  const amount = SearchParams.get("amount") as string;
  console.log("amoutn", amount);

  const [mutate, { isLoading, error }] = useCreatePaymentMutation();

  const strip = useStripe();
  const elements = useElements();

  // console.log("data", { data });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!strip || !elements) {
      return;
    }
    const handelError = (error: any) => {};
    // const { error: submitError } = await elements.submit();
    // if (submitError) {
    //   handelError(submitError);
    //   return;
    // }
    const data = await mutate({ amount: Number(amount) });

    console.log("data in payement", data);

    const result = await strip.confirmPayment({
      // clientSecret: data?.data.client_secret as any,
      elements,
      confirmParams: {
        return_url: "http://localhost:3002/",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };

  return (
    <form className="m-10" onSubmit={handleSubmit}>
      <PaymentElement />
      <Button>submit</Button>
    </form>
  );
}

// "from backe do post create-intent will give you sercett"

// default value for proisme empty object if you dont put await befor will return emapty objecy
