import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Use a write client with the token
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    });

    // Create the subscriber document in Sanity
    const newSubscriber = await writeClient.create({
      _type: 'subscriber',
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'Successfully subscribed', subscriber: newSubscriber },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.', details: error.message },
      { status: 500 }
    );
  }
}
