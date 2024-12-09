import aboutNavigator from "../assets/aboutNavigator.svg";
import faqNavigator from "../assets/faqNavigator.svg";
import termNavigator from "../assets/termNavigator.svg";
import policyNavigator from "../assets/policyNavigator.svg";
import grievanceNavigator from "../assets/grievanceNavigator.svg";

export const otherDetails = [
  {
    page: "aboutUs",
    image: aboutNavigator,
    name: "About Us",
    description:
      "MobiGarage is a pre-owned business scaling platform. Established in 2019, it has been a pioneer in bringing refurbished smartphones to the tier 2, 3, & beyond markets. It is an organized platform that successfully integrates the existing extensive retail footprint of phone sellers and repair kiosks. MobiGarage is increasing the accessibility to quality and affordable smartphones for its end customer. It is shortening the gaps in the stock inventory and prices which are usually experienced in the unorganized pre-owned device industry.",
  },
  {
    page: "faqs",
    image: faqNavigator,
    name: "FAQs",
    description:
      "Have questions? We’ve got answers! Browse our Frequently Asked Questions for quick solutions to common queries about orders, payments, shipping, and more.",
    dropdowns: [
      {
        id: 1,
        title: "How do I initiate a return or exchange?",
        options: [
          {
            id: "1_1",
            contents: [
              "Initiate a return or exchange through your account within the specified period.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "What happens after I return an item?",
        options: [
          {
            id: "2_1",
            contents: [
              "We’ll arrange pickup, verify the item, and process a refund or replacement based on your preference.",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Can I exchange an item for a different product?",
        options: [
          {
            id: "3_1",
            contents: [
              "Yes, you can exchange an item for a product of equal value.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Where can I find exclusive deals and discounts?",
        options: [
          {
            id: "4_1",
            contents: ["Offers are available on product pages or at checkout."],
          },
        ],
      },
      {
        id: 5,
        title: "How do I apply a coupon code?",
        options: [
          {
            id: "5_1",
            contents: ["Apply coupon codes at checkout for instant savings."],
          },
        ],
      },
      {
        id: 6,
        title: "What payment methods are available?",
        options: [
          {
            id: "6_1",
            contents: [
              "We accept credit/debit cards, net banking, UPI, wallets, and COD for eligible orders.",
            ],
          },
        ],
      },
      {
        id: 7,
        title: "Is my payment information secure?",
        options: [
          {
            id: "7_1",
            contents: [
              "Yes, payments are processed through secure gateways to protect your financial details.",
            ],
          },
        ],
      },
      {
        id: 8,
        title: "Will I get a confirmation after making a payment?",
        options: [
          {
            id: "8_1",
            contents: [
              "Yes, you’ll receive instant confirmation and an invoice for every successful transaction.",
            ],
          },
        ],
      },
      {
        id: 9,
        title: "Can I save my payment methods for future use?",
        options: [
          {
            id: "9_1",
            contents: [
              "Yes, you can save your preferred payment methods for quicker checkouts.",
            ],
          },
        ],
      },
      {
        id: 10,
        title: "What product categories does Mobigarage offer?",
        options: [
          {
            id: "10_1",
            contents: [
              "We offer VRP (premium devices), Prexo (refurbished phones), Spare (individual parts), Open Box (unboxed phones with accessories), and New Phones (brand-new devices).",
            ],
          },
        ],
      },
      {
        id: 11,
        title: "How can I manage my account information?",
        options: [
          {
            id: "11_1",
            contents: [
              "You can update personal info, change your password, and manage saved payment methods through your account.",
            ],
          },
        ],
      },
      {
        id: 12,
        title: "How do I track my orders?",
        options: [
          {
            id: "12_1",
            contents: [
              "Track your orders, view past purchases, and access invoices directly from your account.",
            ],
          },
        ],
      },
    ],
  },
  {
    page: "termsOfUse",
    image: termNavigator,
    name: "Terms of Use",
    description:
      "Understand the terms and conditions that govern your use of our platform. From account creation to transactions, get familiar with the rules to ensure a smooth shopping experience.",
  },
  {
    page: "privacyPolicy",
    image: policyNavigator,
    name: "Privacy Policy",
    description:
      "Your privacy matters to us. Read about how we collect, use, and protect your personal information, and the steps we take to ensure your data remains secure.",
  },
  {
    page: "grievance",
    image: grievanceNavigator,
    name: "Grievance Officer",
    description:
      "At MobiGarage, our Grievance Officer ensures any issues you face are resolved promptly and effectively.",
    benefits: [
      {
        desc_1: "Quick Issue Resolution.",
        desc_2:
          "Get fast solutions for order, return, exchange, or product issues.",
      },
      {
        desc_1: "Personalized Support",
        desc_2: "Receive tailored assistance for your specific concerns.",
      },
      {
        desc_1: "Escalation for Unresolved Issues",
        desc_2:
          "If necessary, your issue will be escalated for faster resolution.",
      },
      {
        desc_1: "Clear Communication",
        desc_2: "Stay updated on the progress of your issue.",
      },
      {
        desc_1: "Service Improvement",
        desc_2: "Your feedback helps us enhance our services.",
      },
    ],
    contactUs: "Contact the Grievance Officer for quick, reliable support!",
  },
];
