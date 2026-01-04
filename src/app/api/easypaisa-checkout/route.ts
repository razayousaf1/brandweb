import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, customerEmail, customerPhone } = await request.json();
    
    // EasyPaisa credentials (you'll get these after merchant signup)
    const STORE_ID = process.env.EASYPAISA_STORE_ID || '';
    const HASH_KEY = process.env.EASYPAISA_HASH_KEY || '';
    const POST_BACK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/easypaisa-callback`;
    
    // Generate transaction details
    const transactionDateTime = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    const expiryDateTime = new Date(Date.now() + 30 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]; // 30 mins
    
    const amountInPaisa = Math.round(amount * 100); // Convert to paisa
    
    // Create hash string (order matters!)
    const hashString = `${amountInPaisa}${transactionDateTime}${expiryDateTime}${HASH_KEY}${orderId}${POST_BACK_URL}${STORE_ID}`;
    
    // Generate secure hash
    const secureHash = crypto
      .createHmac('sha256', HASH_KEY)
      .update(hashString)
      .digest('hex')
      .toUpperCase();
    
    // EasyPaisa payment form data
    const paymentData = {
      storeId: STORE_ID,
      orderId: orderId,
      transactionAmount: amountInPaisa,
      transactionType: 'MA', // Merchant Account
      mobileAccountNo: customerPhone,
      emailAddress: customerEmail,
      tokenExpiry: expiryDateTime,
      bankIdentificationNumber: '',
      encryptedHashRequest: secureHash,
      merchantPaymentMethod: '',
      postBackURL: POST_BACK_URL,
      signature: '',
      transactionDateTime: transactionDateTime,
    };
    
    // EasyPaisa payment gateway URL (you'll get this from EasyPaisa)
    const EASYPAISA_URL = process.env.EASYPAISA_PAYMENT_URL || 'https://easypaisa.com.pk/easypay';
    
    return NextResponse.json({
      success: true,
      paymentUrl: EASYPAISA_URL,
      paymentData: paymentData,
    });
    
  } catch (error) {
    console.error('EasyPaisa checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}