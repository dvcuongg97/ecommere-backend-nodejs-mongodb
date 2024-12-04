'use strict'

const { newOtp } = require('./otp.service')
const { getTemplate } = require('./template.service')
const transport = require('../configs/init.nodemailer.config')
const { NotFoundError } = require('../core/error.response')
const { replacePlaceHolder } = require('../utils/mailer.utils')

const sendEmailLinkVerify = ({
    html,
    toEmail,
    subject = 'Xac nhan Email dang ky',
    text = 'xac nhan'

}) => {
    //
    try {
        const mailOption = {
            from: 'ShopDEV <>',
            to: toEmail,
            subject,
            text,
            html
        }

        transport.sendMail(mailOption, (err, info) => {

            if (err) {
                return console.log(err);
            }
            console.log('message sent::: ', info.messageId);
        })

    } catch (error) {
        console.log('send mail error::: ', error);
        return error
    }
}

const sendEmailToken = async (email = null) => {
    //
    try {
        // 1. generate token
        const token = await newOtp({ email })
        // 2. get template
        const template = await getTemplate({
            tem_name: 'HTML EMAIL TOKEN'
        })
        if (!template) throw new NotFoundError('Template not found')
        // 3. replace placeholder with params
        const content = replacePlaceHolder(
            template.tem_html,
            {
                link_verify: `http://localhost:3056/cgp/welcome-back?token=${token}`
            }
        )
        // 4. send email
        sendEmailLinkVerify({
            html,
            toEmail: email,
            subject: 'Vui long xac nhan email dang ky'
        })

        return 1

    } catch (error) {

    }
}

module.exports = {
    sendEmailToken
}