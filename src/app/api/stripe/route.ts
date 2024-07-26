import prisma from "@/lib/db"

// ngrok http --domain=preferably-happy-kangaroo.ngrok-free.app 3000

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('Stripe-Signature')

  // verify webhook came from Stripe
  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    console.log("Webhook verification failed", error);
    return Response.json(null, { status: 400 })
  }

  // fullfill order
  switch (event.type) {
    case 'checkout.session.completed':
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email
        },
        data: {
          hasAccess: true
        }
      })
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // return 200 OK
  return Response.json(null, { status: 200 })
} 