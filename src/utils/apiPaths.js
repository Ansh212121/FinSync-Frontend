export const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const API_PATHS = {
    AUTH: {
      LOGIN: "/api/v1/auth/login",
      REGISTER: "/api/v1/auth/register",
      GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD: {
      GET_DATA: "/api/v1/dashboard",
    },
    INCOME: {
      ADD_INCOME: "/api/v1/income/add-income",
      GET_ALL_INCOME: "/api/v1/income/get-all-income",
      DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
      DOWNLOAD_INCOME: "/api/v1/income/download-excel",
    },
    EXPENSE: {
      ADD_EXPENSE: "/api/v1/expense/add-expense",
      GET_ALL_EXPENSE: "/api/v1/expense/get-all-expense",
      DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
      DOWNLOAD_EXPENSE: "/api/v1/expense/download-excel",
    },
    IMAGE: {
      UPLOAD_IMAGE: "/api/v1/auth/upload-image",
      UPDATE_IMAGE: "/api/v1/auth/updateProfileImageUrl",
    },
  };
  