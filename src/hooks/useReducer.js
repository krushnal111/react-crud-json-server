const FormReducer = (state, action) => {
  switch (action.type) {
    case "Handle Input Text":
      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return {
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        country: "",
        password: "",
      };
  }
};

export default FormReducer;
