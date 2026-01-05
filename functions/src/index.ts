import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import { Resend } from 'resend';
import twilio from 'twilio';
import { defineSecret } from 'firebase-functions/params';

admin.initializeApp();

// Define secrets for Firebase Functions v2
const resendApiKey = defineSecret('RESEND_API_KEY');
const twilioAccountSid = defineSecret('TWILIO_ACCOUNT_SID');
const twilioAuthToken = defineSecret('TWILIO_AUTH_TOKEN');

const TWILIO_WHATSAPP_NUMBER = 'whatsapp:+14155238886';
const APP_URL = 'https://shahsawaarofficial.store';
const BRAND_EMAIL = 'orders@shahsawaarofficial.store';

// Trigger when new order is created
export const sendOrderConfirmation = onDocumentCreated(
  {
    document: 'orders/{orderId}',
    region: 'asia-south1',
    database: 'production',
    secrets: [resendApiKey, twilioAccountSid, twilioAuthToken], // Add secrets here
  },
  async (event) => {
    const snap = event.data;
    if (!snap) {
      console.log('No data associated with the event');
      return;
    }

    const order = snap.data();
    const orderId = event.params.orderId;

    // Initialize services with secrets
    const resend = new Resend(resendApiKey.value());
    const twilioClient = twilio(twilioAccountSid.value(), twilioAuthToken.value());

    try {
      // ... rest of your code stays the same ...
      const itemsList = order.items
        .map((item: any) => `${item.name} x${item.quantity} - Rs. ${item.price.toLocaleString()}`)
        .join('<br>');

      await resend.emails.send({
        from: `Shahsawaar Official <${BRAND_EMAIL}>`,
        to: order.userEmail,
        subject: 'Please Confirm Your Order',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <img src="${APP_URL}/logo.png" alt="Shahsawaar Official" style="max-width: 120px; height: auto; margin-bottom: 10px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Shahsawaar Official</h1>
            </div>
            
            <div style="padding: 30px 20px;">
              <h2 style="color: #333; margin-top: 0;">Order Confirmation Required</h2>
              <p style="color: #555; line-height: 1.6;">Hi ${order.shipping.fullName},</p>
              <p style="color: #555; line-height: 1.6;">Thank you for your order! Please confirm to proceed with processing.</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Order Details</h3>
                <p style="color: #555;"><strong>Order ID:</strong> ${orderId}</p>
                
                <h4 style="color: #333;">Items:</h4>
                <p style="color: #555; line-height: 1.8;">${itemsList}</p>
                
                <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
                
                <p style="color: #555;"><strong>Subtotal:</strong> Rs. ${order.subtotal.toLocaleString()}</p>
                <p style="color: #555;"><strong>Shipping:</strong> Rs. ${order.shippingFee.toLocaleString()}</p>
                <p style="font-size: 18px; color: #333;"><strong>Total:</strong> Rs. ${order.total.toLocaleString()}</p>
              </div>
              
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #333;">Shipping Address:</h4>
                <p style="margin: 5px 0; color: #555; line-height: 1.6;">
                  ${order.shipping.fullName}<br>
                  ${order.shipping.address}<br>
                  ${order.shipping.city}${order.shipping.postalCode ? ', ' + order.shipping.postalCode : ''}<br>
                  ${order.shipping.country}
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${APP_URL}/api/confirm/${orderId}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; 
                          text-decoration: none; border-radius: 6px; display: inline-block; 
                          font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  ✓ Confirm Order
                </a>
              </div>
              
              <p style="color: #666; font-size: 14px; text-align: center;">
                Or reply to this email with 'YES' to confirm your order.
              </p>
            </div>
            
            <div style="background: #f8f8f8; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px; margin: 5px 0;">
                <strong>Shahsawaar Official</strong><br>
                Questions? Contact us at ${BRAND_EMAIL}
              </p>
              <p style="color: #ccc; font-size: 11px; margin: 10px 0 0 0;">
                © 2025 Shahsawaar Official. All rights reserved.
              </p>
            </div>
          </div>
        `
      });

      console.log(`Email sent to ${order.userEmail} for order ${orderId}`);

      if (order.shipping.phoneForUpdates) {
        const whatsappItems = order.items
          .map((item: any) => `• ${item.name} x${item.quantity}`)
          .join('\n');

        await twilioClient.messages.create({
          from: TWILIO_WHATSAPP_NUMBER,
          to: `whatsapp:${order.shipping.phoneForUpdates}`,
          body: `🛍️ *Shahsawaar Official* - Order Confirmation Required

Hi ${order.shipping.fullName}!

Your order #${orderId} has been received.

*Items:*
${whatsappItems}

*Subtotal:* Rs. ${order.subtotal.toLocaleString()}
*Shipping:* Rs. ${order.shippingFee.toLocaleString()}
*Total:* Rs. ${order.total.toLocaleString()}

📍 *Shipping to:*
${order.shipping.address}
${order.shipping.city}, ${order.shipping.country}

⚠️ *Action Required:*
Reply with *Y* or *YES* to confirm your order.

Track your order: ${APP_URL}/order/${orderId}`
        });

        console.log(`WhatsApp sent to ${order.shipping.phoneForUpdates} for order ${orderId}`);
      }

      console.log(`Confirmation sent for order ${orderId}`);
    } catch (error) {
      console.error('Error sending confirmation:', error);
    }
  }
);