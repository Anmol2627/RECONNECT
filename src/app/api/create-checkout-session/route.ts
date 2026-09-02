import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-06-20" as any, // use latest compatible
    });

    const { title, price, sessionId, returnUrl } = await req.json();

    const baseUrl = req.headers.get("origin");
    const safeReturnUrl = returnUrl ? returnUrl.startsWith('/') ? returnUrl : '/' + returnUrl : '/journey';

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: title,
              description: `Access to ${title}`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/api/payment-success?session_id={CHECKOUT_SESSION_ID}&support_session_id=${sessionId}&return_url=${encodeURIComponent(safeReturnUrl)}`,
      cancel_url: `${baseUrl}${safeReturnUrl}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
