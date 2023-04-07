import nodemailer, { Transporter } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import dotenv from 'dotenv';

const getHtmlEmail = (link: string) => {
	return `
<table align="center" cellpadding="0" cellspacing="0" width="600">
  <tr>
    <td bgcolor="#ffffff" style="padding: 40px 30px 20px 30px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="60%" style="font-size: 24px; font-weight: bold; color: #333333;">
            Activate your account
          </td>
          <td width="40%" align="right">
            <img src="https://example.com/logo.png" alt="Logo" width="100" height="auto" style="display: block;">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td bgcolor="#ffffff" style="padding: 20px 30px 40px 30px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="font-size: 16px; color: #333333;">
            <p>Hello,</p>
            <p>Please click the following button to activate your account:</p>
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td bgcolor="#008CBA" align="center" style="padding: 10px 20px; border-radius: 4px;">
                  <a href="${link}" target="_blank" style="font-size: 16px; color: #ffffff; text-decoration: none;">Activate Now</a>
                </td>
              </tr>
            </table>
            <p>If the button above doesn't work, you can copy and paste the following link into your web browser:</p>
            <p><a href="${link}" target="_blank">${link}</a></p>
            <p>If you didn't request this email, you can safely ignore it.</p>
            <p>Thanks,</p>
            <p>The Example Team</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td bgcolor="#f5f5f5" style="padding: 20px 30px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="font-size: 14px; color: #666666;">
            &copy; Example, Inc. 2023. All rights reserved.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
}
export class MailService {
	private transporter: Transporter

	constructor() {
        dotenv.config();
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT || '587', 10),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendActivationMail(to: string, link: string) {
		const mailOptions: MailOptions = {
			from: process.env.SMTP_USER,
			to,
			subject: 'Activate your account' + process.env.API_URL,
			text: '',
			html: getHtmlEmail(link),
		}
		await this.transporter.sendMail(mailOptions)
	}
}
export default new MailService()
