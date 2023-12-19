interface IFaq {
  id: number;
  title: string;
  response: string;
}

export const faq: IFaq[] = [
  {
    id: 1,
    title: "What is your return policy?",
    response:
      "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return",
  },
  {
    id: 2,
    title: "How do I track my order?",
    response: "You can track your order by clicking the tracking ",
  },
  {
    id: 3,
    title: "How do I contact customer support?",
    response:
      "You can contact our customer support team by emailing support@myecommercestore.com",
  },
];
