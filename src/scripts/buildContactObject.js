const buildContactObject = (contactNameParam, contactEmailParam, contactPhoneParam, userIdParam) => {
    return {
        name: contactNameParam,
        email: contactEmailParam,
        phone: contactPhoneParam,
        userId: userIdParam
      };
}
export default buildContactObject