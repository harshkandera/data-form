export const generateOtpEmail = (otp: string, name: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
            }
            .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 1px solid #eeeeee;
            }
            .logo-container {
                background-color: #020016; /* Dark blue background */
                padding: 15px;
                border-radius: 6px;
                display: inline-block;
            }
            .logo-text {
                font-size: 28px;
                font-weight: bold;
                color: white;
                text-decoration: none;
            }
            .logo-highlight {
                color: #3E1E90; /* Rich blue highlight color similar to richblue-100 */
            }
            .content {
                padding: 30px 20px;
                text-align: center;
            }
            .otp-code {
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 5px;
                padding: 15px 20px;
                margin: 20px 0;
                background-color: #f5f5f5;
                border-radius: 6px;
                display: inline-block;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #4285F4;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999999;
                border-top: 1px solid #eeeeee;
            }
            .warning {
                font-size: 13px;
                color: #777777;
                margin-top: 30px;
                padding: 15px;
                background-color: #fffde7;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo-container">
                    <span class="logo-text">Data <span class="logo-highlight">Form</span></span>
                </div>
            </div>
            
            <div class="content">
                <h1>Verification Code</h1>
                <p>Hello ${name},</p>
                <p>Please use the following code to complete your verification. This code will expire in 10 minutes.</p>
                
                <div class="otp-code">${otp}</div>
                
                <p>If you didn't request this code, please ignore this email.</p>
                
                
                <div class="warning">
                    <strong>Security Notice:</strong> We will never ask for your password or the full OTP via phone call, email, or SMS. Don't share this code with anyone.
                </div>
            </div>
            
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
                <p>&copy; 2025 DataForm All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };