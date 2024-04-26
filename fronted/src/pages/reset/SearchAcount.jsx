import { Link } from "react-router-dom";
import "./style.css";

import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/logininput/LoginInput";
import * as YUP from "yup";
import axios from "axios";

const SearchAcount = ({
  email,
  error,
  setEmail,
  setLoading,
  setError,
  setVisible,
  setUserInfos,
}) => {
  const validateEmail = YUP.object({
    email: YUP.string()
      .required("Email address is required")
      .email("Must be a valid email address.")
      .max(50, "Email address can't be more than 50 characters."),
  });

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      setUserInfos(data);
      setVisible(1);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form">
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => handleSearch()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or phone number"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAcount;
