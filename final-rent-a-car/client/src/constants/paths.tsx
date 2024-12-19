export const paths = {
  HOME: "/",
  LIST: "/list",
  DETAIL: (id = ":id") => `/detail/${id}`,
  PAYMENT: (id = ":id") => `/payment/${id}`,
  RESERVATIONS: "/reservations",
  DASHBOARD: {
    MAIN: "/dashboard",
    RENTS: {
      LIST: "/dashboard/rents",
      CREATE: "/dashboard/rents/create",
      EDIT: (id = ":id") => `/dashboard/rent/edit/${id}`,
    },
    RESERVATIONS: {
      LIST: "/dashboard/reservations",
    },
    REVIEWS: {
      LIST: "/dashboard/reviews",
    },
    CHAT: {
      VIEW: "/dashboard/chat",
      USER: (id = ":id") => `/dashboard/chat/${id}`,
    },
  },
};
