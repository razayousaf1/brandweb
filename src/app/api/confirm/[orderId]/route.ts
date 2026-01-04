import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    // Await params in Next.js 15+
    const params = await context.params;
    const orderId = params.orderId;
    
    console.log('Confirming order:', orderId);
    
    // First check if order exists
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (!orderSnap.exists()) {
      console.error('Order not found:', orderId);
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    console.log('Order found, updating status...');
    
    // Update order status in Firestore
    await updateDoc(orderRef, {
      status: 'confirmed',
      confirmedAt: new Date().toISOString()
    });
    
    console.log('Order confirmed successfully');
    
    // Redirect to success page
    return NextResponse.redirect(new URL('/order-confirmed', request.url));
  } catch (error) {
    console.error('Error confirming order:', error);
    return NextResponse.json(
      { 
        error: 'Failed to confirm order', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}