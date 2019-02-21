const buildContactObject = (contactNameParam, contactEmailParam, contactPhoneParam) => {
    return {
        name: contactNameParam,
        email: contactEmailParam,
        phone: contactPhoneParam
      };
}
export default buildContactObject