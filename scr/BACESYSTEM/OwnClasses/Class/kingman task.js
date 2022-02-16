/**
 * kingman tax system
 * @param {Number} amount 
 * @param {Number} wassit 
 * @returns {{bot_tax: number, support_tax: number, full_tax: number, full_price: number, without_support_amout: number, amout: number}}
 */
const tax = (amount, wassit = 0.28) => {
    let probot_tax_percentage = 5;
    amount = Math.round(+amount);
    let wassit_percentage = +wassit;
    let probot_tax = Math.floor((Math.floor((parseInt(amount) * 20) /19)) +1) - parseInt(amount) * 20 /20;
    let wassit_tax = probot_tax + Math.round(amount * wassit_percentage / 100);
    let tax = probot_tax + wassit_tax;
    let all = amount + tax;
    return {
        bot_tax: probot_tax,
        support_tax: wassit_tax,
        full_tax: tax,
        full_price: all,
        without_support_amout: probot_tax + amount,
        amout: amount
    }
};
/**
 * 
 * @param {String} data 
 * @returns {Promise<{bot_tax: number, support_tax: number, full_tax: number, full_price: number, without_support_amout: number, amout: number}>}
 */
let all = async(data, nisba = 100) => {
    return new Promise(async(res, rej) => {
        if(isNaN(data)){
            if(data.match(`m`)){
                if(isNaN(Number(data.split(`m`).join(``)) * 1000000)){
                    return rej({message: `invaild data`})
                } else {
                    return res(tax((Number(data.split(`m`).join(``)) * 1000000 * nisba) / 100))
                }
            } else if(data.match(`k`)) {
                if(isNaN(Number(data.split(`k`).join(``)) * 1000)){
                    return rej({message: `invaild data`})
                } else {
                    return res(tax((Number(data.split(`k`).join(``)) * 1000 * nisba) / 100))
                }
            } else if(data.match(`b`)) {
                if(isNaN(Number(data.split(`b`).join(``)) * 1000000000)){
                    return rej({message: `invaild data`})
                } else {
                    return res(tax((Number(data.split(`b`).join(``)) * 1000000000) * nisba / 100))
                }
            } else {
                return rej({message: `invaild data`})
            }
        } else {
            return res(tax(Number(data)))
        }
    })
}
export { all, tax };