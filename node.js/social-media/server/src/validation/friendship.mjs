export const followRequestSchema = {
  recipientId: {
    in: ['params'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Recipient is required'
  }
};