import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService, registerAs } from '@nestjs/config';

export const emailSenderOptions = registerAs('smtp', () => ({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: JSON.parse(process.env.SMTP_SECURE),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
}));

export function getSmtpConfig() {
  return {
    useFactory: async (configService: ConfigService): Promise<MailerOptions> => ({
      transport: {
        host: configService.get<string>('smtp.host'),
        port: configService.get<number>('smtp.port'),
        secure: configService.get<boolean>('smtp.secure'),
        auth: {
          user: configService.get<string>('smtp.user'),
          pass: configService.get<string>('smtp.pass'),
        }
      }
    }),
    inject: [ConfigService],
  }
}
