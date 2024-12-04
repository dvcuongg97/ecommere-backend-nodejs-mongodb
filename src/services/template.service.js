'use strict'

const TEMPLATE = require('../models/template.model')
const { htmlEmail } = require('../utils/mailer.utils')

const newTemplate = async ({
    tem_name,
    tem_html,
    tem_id = 0
}) => {
    //1. check email template   

    //2. create a new template

    const newTem = await TEMPLATE.create({
        tem_name,
        tem_html: htmlEmail(),
        tem_id
    })

    return newTem
}

const getTemplate = async (
    tem_name
) => {
    const template = await TEMPLATE.findOne({ tem_name })
    return template
}

module.exports = {
    newTemplate,
    getTemplate
}