import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, customerEmail, customerPhone } = await request.json();

    // JazzCash credentials
    const MERCHANT_ID = process.env.JAZZCASH_MERCHANT_ID || 'MC558735';
    const PASSWORD = process.env.JAZZCASH_PASSWORD || 'yzg099f0ys';
    const INTEGRITY_SALT = process.env.JAZZCASH_INTEGRITY_SALT || '00xvyh20x0';
    const RETURN_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/jazzcash-callback`;

    // Convert amount to paisa (JazzCash uses paisa, not rupees)
    const amountInPaisa = Math.round(amount * 100);

    // Generate transaction date/time (Format: YYYYMMDDHHMMSS)
    const now = new Date();
    const txnDateTime = 
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');

    // Expiry date/time (1 day from now)
    const expiryDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const txnExpiryDateTime = 
      expiryDate.getFullYear() +
      String(expiryDate.getMonth() + 1).padStart(2, '0') +
      String(expiryDate.getDate()).padStart(2, '0') +
      String(expiryDate.getHours()).padStart(2, '0') +
      String(expiryDate.getMinutes()).padStart(2, '0') +
      String(expiryDate.getSeconds()).padStart(2, '0');

    // Generate secure hash (CRITICAL - Order matters!)
    const hashString = 
      INTEGRITY_SALT + '&' +
      amountInPaisa + '&' +
      'TBANK' + '&' +        // pp_BankID
      orderId + '&' +        // pp_BillReference
      'Order Payment' + '&' + // pp_Description
      'EN' + '&' +           // pp_Language
      MERCHANT_ID + '&' +    // pp_MerchantID
      PASSWORD + '&' +       // pp_Password
      'RETL' + '&' +         // pp_ProductID
      RETURN_URL + '&' +     // pp_ReturnURL
      '' + '&' +             // pp_SubMerchantID (empty)
      txnDateTime + '&' +    // pp_TxnDateTime
      'PKR' + '&' +          // pp_TxnCurrency
      txnExpiryDateTime + '&' + // pp_TxnExpiryDateTime
      orderId + '&' +        // pp_TxnRefNo
      'MIGS' + '&' +         // pp_TxnType (Card Payment)
      '1.1';                 // pp_Version

    // Generate HMAC SHA256 hash
    const secureHash = crypto
      .createHmac('sha256', INTEGRITY_SALT)
      .update(hashString)
      .digest('hex')
      .toUpperCase();

    console.log('🔐 Hash String:', hashString);
    console.log('🔐 Secure Hash:', secureHash);

    // JazzCash payment form data
    const paymentData = {
      pp_Version: '1.1',
      pp_TxnType: 'MIGS',              // Credit Card Payment
      pp_Language: 'EN',
      pp_MerchantID: MERCHANT_ID,
      pp_SubMerchantID: '',
      pp_Password: PASSWORD,
      pp_BankID: 'TBANK',
      pp_ProductID: 'RETL',
      pp_TxnRefNo: orderId,
      pp_Amount: amountInPaisa.toString(),
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: txnDateTime,
      pp_BillReference: orderId,
      pp_Description: 'Order Payment',
      pp_TxnExpiryDateTime: txnExpiryDateTime,
      pp_ReturnURL: RETURN_URL,
      pp_SecureHash: secureHash,
      ppmpf_1: customerEmail || '',    // Customer email
      ppmpf_2: customerPhone || '',    // Customer phone
      ppmpf_3: '',
      ppmpf_4: '',
      ppmpf_5: '',
    };

    // JazzCash payment gateway URL
    const JAZZCASH_URL = process.env.JAZZCASH_PAYMENT_URL || 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/';

    return NextResponse.json({
      success: true,
      paymentUrl: JAZZCASH_URL,
      paymentData: paymentData,
    });
  } catch (error) {
    console.error('JazzCash checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}