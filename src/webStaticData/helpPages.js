import { Link } from "react-router-dom";
import accountImage from "../assets/help__account.svg";
import productImage from "../assets/help__product.svg";
import returnImage from "../assets/help__return.svg";
import offerImage from "../assets/help__offer.svg";
import paymentImage from "../assets/help__payment.svg";
import OrderImage from "../assets/help__order.svg";

export const helpPages = [
  {
    page: "account",
    image: accountImage,
    name: "Account",
    description:
      "With your account, you can update personal info, change your password, and manage saved payment methods for faster checkouts. Track orders, view past purchases, and access invoices. Keep addresses updated for quicker delivery and manage your wishlist. Customize preferences and notifications for offers and updates.",

    dropdowns: [
      {
        id: 1,
        title: "How do I login to my Mobigarage account?",
        options: [
          {
            id: "1_1",
            contents: [
              "You can log in to your Mobigarage account with these 3 simple steps:",
              <>
                Click on{" "}
                <Link to="/authentication" style={{ color: "#FF6F3F" }}>
                  LOG IN/SIGN UP
                </Link>{" "}
                and enter your mobile number then click on{" "}
                <Link to="/authentication" style={{ color: "#FF6F3F" }}>
                  CONTINUE
                </Link>
                .
              </>,
              "An OTP will be sent to the mobile number entered by you.",
              "Verify the OTP, and post successful verification, you will be able to log in to Mobigarage.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "How do I update my personal information?",
        options: [
          {
            id: "2_1",
            contents: [
              'You can update your details in the "Account Details" section.',
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Can I change my password?",
        options: [
          {
            id: "3_1",
            contents: [
              'Yes, you can reset your password anytime from the "Password" section.',
            ],
          },
        ],
      },
      {
        id: 4,
        title: "How can I view my order history?",
        options: [
          {
            id: "4_1",
            contents: [
              'Your order history is available under the "Order History" tab.',
            ],
          },
        ],
      },
      {
        id: 5,
        title: "How do I add or remove addresses?",
        options: [
          {
            id: "5_1",
            contents: [
              'You can manage addresses in the "Address Book" section.',
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Can I delete my account?",
        options: [
          {
            id: "6_1",
            contents: [
              "Contact customer support if you wish to delete your account.",
            ],
          },
        ],
      },
    ],
  },
  {
    page: "products",
    image: productImage,
    name: "Products",
    description:
      "At Mobigarage, we offer a wide range of mobile products, including VRP for premium devices, Prexo for refurbished phones, Spare for individual parts, Open Box for unboxed phones with accessories, and New Phones for brand-new devices. Whether you seek affordability,reliability, or the latest technology, we provide quality and value for every customer.",
    dropdowns: [
      {
        id: 1,
        title: "What is VRP at Mobigarage?",
        options: [
          {
            id: "1_1",
            contents: [
              "VRP offers premium quality mobile devices for customers seeking high-end options.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "What products are available under Prexo?",
        options: [
          {
            id: "2_1",
            contents: [
              "Prexo features refurbished phones, providing a cost-effective and eco-friendly choice.",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "What items are included in the Spare category?",
        options: [
          {
            id: "3_1",
            contents: [
              "Spare includes individual mobile parts like batteries, chargers, and other accessories for repairs.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "What does the Open Box category offer?",
        options: [
          {
            id: "4_1",
            contents: [
              "Open Box features unboxed phones along with essential accessories, offering great value on slightly used devices.",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "What types of phones can I find in the New Phones category?",
        options: [
          {
            id: "5_1",
            contents: [
              "The New Phones category offers brand-new, seal-packed devices for customers wanting the latest models.",
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Which category is best for budget-friendly options?",
        options: [
          {
            id: "6_1",
            contents: [
              "The Prexo and Open Box categories are ideal for affordable options without compromising quality.",
            ],
          },
        ],
      },
      {
        id: 7,
        title: "How does Mobigarage ensure product quality across categories?",
        options: [
          {
            id: "7_1",
            contents: [
              "We prioritize quality, transparency, and customer value across all categories, ensuring you get reliable products.",
            ],
          },
        ],
      },
    ],
  },
  {
    page: "returns",
    image: returnImage,
    name: "Returns & Exchanges",
    description:
      "If you receive a defective, damaged, or incorrect item, initiate a return or exchange within the specified period via your account. We’ll arrange pickup, verify the item, and process a refund or replacement based on your preference. For exchanges, select a product of equal value, and we’ll ship it quickly. Our goal is to ensure a smooth, worry-free process.",
    dropdowns: [
      {
        id: 1,
        title:
          "What should I do if I receive a defective, damaged, or incorrect item?",
        options: [
          {
            id: "1_1",
            contents: [
              "If you receive a defective, damaged, or incorrect item, you can initiate a return or exchange within the specified return period through your account.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "How do I request a return for my order?",
        options: [
          {
            id: "2_1",
            contents: [
              "Simply log in to your account and request a return. We’ll arrange for the item to be picked up from your location.",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "What happens after the returned item is picked up?",
        options: [
          {
            id: "3_1",
            contents: [
              "Once the returned item is verified, you’ll receive either a refund or a replacement based on your preference.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Can I exchange an item for a different product?",
        options: [
          {
            id: "4_1",
            contents: [
              "Exchanges are only allowed for replacement products of equal value. Select your replacement during the exchange process, and we’ll ship it to you as soon as possible.",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "What is the company’s approach to returns and exchanges?",
        options: [
          {
            id: "5_1",
            contents: [
              "We aim to make the returns and exchanges process simple, smooth, and worry-free for our customers.",
            ],
          },
        ],
      },
    ],
  },
  {
    page: "offers",
    image: offerImage,
    name: "Offers/Coupons",
    description:
      "Enjoy exclusive deals and discounts on phones and accessories. Find offers on product pages or at checkout, and apply coupon codes for instant savings. From seasonal sale to first-time buyer discounts,there’s something for everyone. Check notifications and emails for personalized and limited-time promotions.",
    dropdowns: [
      {
        id: 1,
        title: "How can I find offers and coupons for my purchases?",
        options: [
          {
            id: "1_1",
            contents: [
              "Offers and coupons are displayed directly on product pages or during checkout for easy access.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "What types of discounts are available?",
        options: [
          {
            id: "2_1",
            contents: [
              "Discounts include seasonal sales, special promotions, first-time buyer offers, and exclusive deals on phones and accessories.",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "How do I apply a coupon code?",
        options: [
          {
            id: "3_1",
            contents: [
              "Enter your coupon code during checkout to enjoy instant savings on your purchase.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "How can I stay updated on the latest deals and promotions?",
        options: [
          {
            id: "4_1",
            contents: [
              "Keep an eye on your notifications and emails for personalized deals and limited-time promotions.",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Are the offers available for all customers?",
        options: [
          {
            id: "5_1",
            contents: [
              "Yes, we ensure there’s something for everyone, whether you’re a new or returning customer.",
            ],
          },
        ],
      },
    ],
  },
  {
    page: "payments",
    image: paymentImage,
    name: "Payments",
    description:
      "We offer secure and convenient payment options, including credit/debit cards, net banking, UPI, wallets, and COD for eligible orders. Online payments are processed through secure gateways, ensuring your financial details remain private. You'll receive instant confirmation and an invoice for every transaction. Save your preferred payment methods for faster future checkouts.",
    dropdowns: [
      {
        id: 1,
        title: "What payment methods are available for purchases?",
        options: [
          {
            id: "1_1",
            contents: [
              "You can choose from credit/debit cards, net banking, UPI, wallets, or cash on delivery (COD) for eligible orders.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Are online payments secure?",
        options: [
          {
            id: "2_1",
            contents: [
              "Yes, all online payments are processed through secure gateways to ensure your financial information is protected.",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Do I receive confirmation after making a payment?",
        options: [
          {
            id: "3_1",
            contents: [
              "Yes, you’ll receive an instant confirmation and an invoice for every successful transaction.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Can I save my payment methods for future purchases?",
        options: [
          {
            id: "4_1",
            contents: [
              "Yes, you can save your preferred payment methods for faster and more convenient checkouts.",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "How is my payment information handled?",
        options: [
          {
            id: "5_1",
            contents: [
              "Your payment details are kept private and secure at all times.",
            ],
          },
        ],
      },
    ],
  },
  {
    page: "orders",
    image: OrderImage,
    name: "Orders",
    description:
      " Easily manage your orders with real-time tracking from confirmation to delivery. Contact support for changes before shipping. Access past purchase details, invoices, and payment summaries, or quickly reorder—all from your account.",
    dropdowns: [
      {
        id: 1,
        title: "How can I track the status of my order?",
        options: [
          {
            id: "1_1",
            contents: [
              "You can track your order in real-time, from confirmation to delivery, directly from your account.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Can I make changes to my order after placing it?",
        options: [
          {
            id: "2_1",
            contents: [
              "Yes, you can contact our support team to make changes, but only before the order is shipped.",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Where can I find details about my past purchases?",
        options: [
          {
            id: "3_1",
            contents: [
              "Your account provides access to detailed information about past purchases, including product details, invoices, and payment summaries.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Is it possible to reorder a product I previously purchased?",
        options: [
          {
            id: "4_1",
            contents: [
              "Yes, you can easily reorder items from your purchase history.",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "How does the order management system make shopping easier?",
        options: [
          {
            id: "5_1",
            contents: [
              "It provides real-time tracking, order modification options, and access to past purchase details, making order management seamless and convenient.",
            ],
          },
        ],
      },
    ],
  },
];
