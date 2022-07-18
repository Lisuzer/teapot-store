import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const getMailConfig = async (
): Promise<any> => {
    const transport = process.env.MAIL_TRANSPORT;
    const mailFromName = process.env.MAIL_FROM_NAME;
    const mailFromAddress = transport.split(':')[1].split('//')[1];

    return {
        transport,
        defaults: {
            from: `"${mailFromName}" <${mailFromAddress}>`,
        },
        template: {
            adapter: new EjsAdapter(),
            options: {
                strict: false,
            },
        },
    };
};