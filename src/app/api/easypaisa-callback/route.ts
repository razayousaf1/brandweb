import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const orderId = formData.get('orderId') as string;
    const responseCode = formData.get('responseCode') as string;
    const responseDesc = formData.get('responseDesc') as string;
    
    // Success codes: '0000' or '00' (varies by EasyPaisa version)
    if (responseCode === '0000' || responseCode === '00') {
      // Payment successful - update order
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'card',
        confirmedAt: new Date().toISOString(),
      });
      
      // Redirect to success page
      return NextResponse.redirect(new URL(`/payment-success?orderId=${orderId}`, request.url));
    } else {
      // Payment failed
      return NextResponse.redirect(new URL(`/payment-failed?reason=${responseDesc}`, request.url));
    }
    
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.redirect(new URL('/payment-failed', request.url));
  }
}