import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  const raw = await req.text();

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ received: true, message: 'Stripe not configured' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event: Stripe.Event;

  try {
    event = process.env.STRIPE_WEBHOOK_SECRET
      ? stripe.webhooks.constructEvent(
          raw,
          req.headers.get('stripe-signature') || '',
          process.env.STRIPE_WEBHOOK_SECRET,
        )
      : JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const uid = session.client_reference_id || session.metadata?.uid || '';

    if (uid && session.mode === 'subscription' && session.subscription) {
      await adminDb.collection('subscriptions').doc(uid).set(
        {
          stripeCustomerId: String(session.customer || ''),
          stripeSubscriptionId: String(session.subscription),
          status: 'active',
          updatedAt: new Date(),
        },
        { merge: true },
      );
    }
  }

  if (event.type.startsWith('customer.subscription')) {
    const subscription = event.data.object as Stripe.Subscription;
    const uid = subscription.metadata?.uid || '';

    if (uid) {
      await adminDb.collection('subscriptions').doc(uid).set(
        {
          stripeCustomerId: String(subscription.customer),
          stripeSubscriptionId: subscription.id,
          plan: subscription.items.data[0]?.price.id || '',
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end * 1000,
          updatedAt: new Date(),
        },
        { merge: true },
      );
    }
  }

  return NextResponse.json({ received: true });
}
