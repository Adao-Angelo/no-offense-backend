import { smtp } from "../config";

export async function SendVerificationEmails(email: string, token: string) {
  const url = `${process.env.APP_URL}/verify?token=${token}`;

  await smtp.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #6200ea; color: white; padding: 15px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px; animation: fadeInDown 1s;">Verify your Email</h1>
      </div>
      <div style="padding: 20px; background-color: white; border-radius: 0 0 10px 10px;">
        <p style="font-size: 18px; color: #333; animation: fadeIn 2s;">Hi,</p>
        <p style="font-size: 16px; color: #666; animation: fadeIn 2s;">Thank you for registering with us! To complete your registration, please verify your email by clicking the link below:</p>
        <a href="${url}" style="display: inline-block; margin: 20px 0; background-color: #6200ea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; transition: background-color 0.3s ease; animation: bounceIn 1s;">
          Verify Email
        </a>
        <p style="font-size: 14px; color: #999; animation: fadeIn 2s;">If you did not request this, please ignore this email.</p>
      </div>
    </div>
  
    <style>
      @keyframes fadeInDown {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
  
      @keyframes bounceIn {
        0% {
          transform: scale(0.8);
          opacity: 0;
        }
        60% {
          transform: scale(1.05);
          opacity: 1;
        }
        100% {
          transform: scale(1);
        }
      }
  
      a:hover {
        background-color: #3700b3;
      }
    </style>
    `,
  });
}
