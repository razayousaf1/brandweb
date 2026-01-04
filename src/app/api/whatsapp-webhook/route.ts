import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = formData.get('Body')?.toString().trim().toUpperCase();
    const from = formData.get('From')?.toString();

    // Check if reply is 'Y' or 'YES'
    if (body === 'Y' || body === 'YES') {
      // Find order by phone number
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef,
        where('customerPhone', '==', from?.replace('whatsapp:', '')),
        where('status', '==', 'pending')
      );
      
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const orderDoc = snapshot.docs[0];
        await updateDoc(orderDoc.ref, {
          status: 'confirmed',
          confirmedAt: new Date().toISOString()
        });

        // Send confirmation message back
        return new NextResponse(
          `<?xml version="1.0" encoding="UTF-8"?>
          <Response>
            <Message>✅ Order confirmed! Thank you. We'll process it shortly.</Message>
          </Response>`,
          { headers: { 'Content-Type': 'text/xml' } }
        );
      }
    }

    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    );
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}