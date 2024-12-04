export const updateUserSchema = {
  name: {
    in: ["body"],
    isString: true,
    isLength: {
      errorMessage: "Name should be at least 2 chars long",
      options: { min: 2 },
    },
    optional: true,
  },
};
