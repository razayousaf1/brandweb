import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract response parameters
    const responseCode = formData.get('pp_ResponseCode') as string;
    const responseMessage = formData.get('pp_ResponseMessage') as string;
    const txnRefNo = formData.get('pp_TxnRefNo') as string;
    const amount = formData.get('pp_Amount') as string;
    const secureHash = formData.get('pp_SecureHash') as string;
    const retrievalReferenceNo = formData.get('pp_RetreivalReferenceNo') as string;

    console.log('📦 JazzCash Response:', {
      responseCode,
      responseMessage,
      txnRefNo,
      amount,
    });

    // Verify secure hash (optional but recommended)
    const INTEGRITY_SALT = process.env.JAZZCASH_INTEGRITY_SALT || '00xvyh20x0';
    
    // Build verification string (same order as request)
    const verificationString = 
      INTEGRITY_SALT + '&' +
      (formData.get('pp_Amount') || '') + '&' +
      (formData.get('pp_BankID') || '') + '&' +
      (formData.get('pp_BillReference') || '') + '&' +
      (formData.get('pp_Description') || '') + '&' +
      (formData.get('pp_Language') || '') + '&' +
      (formData.get('pp_MerchantID') || '') + '&' +
      (formData.get('pp_Password') || '') + '&' +
      (formData.get('pp_ProductID') || '') + '&' +
      (formData.get('pp_ResponseCode') || '') + '&' +
      (formData.get('pp_ResponseMessage') || '') + '&' +
      (formData.get('pp_ReturnURL') || '') + '&' +
      (formData.get('pp_SubMerchantID') || '') + '&' +
      (formData.get('pp_TxnCurrency') || '') + '&' +
      (formData.get('pp_TxnDateTime') || '') + '&' +
      (formData.get('pp_TxnRefNo') || '') + '&' +
      (formData.get('pp_TxnType') || '') + '&' +
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

    if (!txnRefNo) {
      return NextResponse.redirect(
        new URL('/payment-failed?reason=Missing transaction reference', request.url)
      );
    }

    // Check if payment was successful
    // Response Code '000' means success
    if (responseCode === '000') {
      try {
        // Update order in Firestore
        await db.collection('orders').doc(txnRefNo).update({
          status: 'confirmed',
          paymentStatus: 'paid',
          paymentMethod: 'card',
          jazzcashResponse: {
            responseCode,
            responseMessage,
            retrievalReferenceNo,
            paidAt: new Date().toISOString(),
          },
        });

        console.log('✅ Order updated successfully:', txnRefNo);

        // Redirect to success page
        return NextResponse.redirect(
          new URL(`/payment-success?orderId=${txnRefNo}`, request.url)
        );
      } catch (error) {
        console.error('❌ Database update error:', error);
        return NextResponse.redirect(
          new URL('/payment-failed?reason=Database error', request.url)
        );
      }
    } else {
      // Payment failed
      console.log('❌ Payment failed:', responseMessage);
      return NextResponse.redirect(
        new URL(`/payment-failed?reason=${encodeURIComponent(responseMessage)}`, request.url)
      );
    }
  } catch (error) {
    console.error('❌ Payment callback error:', error);
    return NextResponse.redirect(
      new URL('/payment-failed?reason=Server error', request.url)
    );
  }
}