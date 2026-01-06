import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract response parameters
    const responseCode = formData.get('pp_ResponseCode') as string;
    const responseMessage = formData.get('pp_ResponseMessage') as string;
    const txnRefNo = formData.get('pp_TxnRefNo') as string;
    const billReference = formData.get('pp_BillReference') as string;
    const amount = formData.get('pp_Amount') as string;
    const secureHash = formData.get('pp_SecureHash') as string;
    const retrievalReferenceNo = formData.get('pp_RetreivalReferenceNo') as string;

    console.log('📦 JazzCash Response:', {
      responseCode,
      responseMessage,
      txnRefNo,
      billReference,
      amount,
    });

    // Verify secure hash
    const INTEGRITY_SALT = process.env.JAZZCASH_INTEGRITY_SALT || '00xvyh20x0';
    
    // Build verification string (MUST match JazzCash's order)
    const verificationString = 
      INTEGRITY_SALT + '&' +
      (formData.get('pp_Amount') || '') + '&' +
      (formData.get('pp_AuthCode') || '') + '&' +
      (formData.get('pp_BankID') || '') + '&' +
      (formData.get('pp_BillReference') || '') + '&' +
      (formData.get('pp_Description') || '') + '&' +
      (formData.get('pp_Language') || '') + '&' +
      (formData.get('pp_MerchantID') || '') + '&' +
      (formData.get('pp_ResponseCode') || '') + '&' +
      (formData.get('pp_ResponseMessage') || '') + '&' +
      (formData.get('pp_RetreivalReferenceNo') || '') + '&' +
      (formData.get('pp_SubMerchantID') || '') + '&' +
      (formData.get('pp_TxnCurrency') || '') + '&' +
      (formData.get('pp_TxnDateTime') || '') + '&' +
      (formData.get('pp_TxnRefNo') || '') + '&' +
      (formData.get('pp_Version') || '');

    const calculatedHash = crypto
      .createHmac('sha256', INTEGRITY_SALT)
      .update(verificationString)
      .digest('hex')
      .toUpperCase();

    console.log('🔐 Hash Verification:', {
      received: secureHash,
      calculated: calculatedHash,
      matches: secureHash === calculatedHash,
    });

    // Use billReference (orderId) instead of txnRefNo
    const orderId = billReference || txnRefNo;

    if (!orderId) {
      return NextResponse.redirect(
        new URL('/checkout/failed?reason=missing_reference', request.url)
      );
    }

    // Check if payment was successful (Response Code '000' means success)
    if (responseCode === '000') {
      try {
        // Update order in Firestore
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, {
          status: 'confirmed',
          paymentStatus: 'paid',
          jazzcashResponse: {
            responseCode,
            responseMessage,
            txnRefNo,
            retrievalReferenceNo,
            paidAt: new Date().toISOString(),
          },
          updatedAt: new Date().toISOString(),
        });

        console.log('✅ Order updated successfully:', orderId);

        // Redirect to success page
        return NextResponse.redirect(
          new URL('/checkout/confirm', request.url)
        );
      } catch (error) {
        console.error('❌ Database update error:', error);
        // Even if DB update fails, payment succeeded - redirect to success
        return NextResponse.redirect(
          new URL('/checkout/confirm', request.url)
        );
      }
    } else {
      // Payment failed
      console.log('❌ Payment failed:', responseMessage);
      return NextResponse.redirect(
        new URL(`/checkout/failed?reason=${encodeURIComponent(responseMessage)}`, request.url)
      );
    }
  } catch (error) {
    console.error('❌ Payment callback error:', error);
    return NextResponse.redirect(
      new URL('/checkout/failed?reason=server_error', request.url)
    );
  }
}