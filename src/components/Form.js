import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";

function Formiks() {
    // debugger;
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "Username must be 3 characters long").required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password required"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    
    fetch("http://localhost:4500", {
      method: 'POST', // Change to POST method
      headers: {
        'Content-Type': 'application/json', // Set the content type
      },
      body: JSON.stringify(values), // Send the values as the request body
    })
    .then(response => response.json()) // Parse the response JSON
    .then(responseData => {
      console.log('Response:', responseData);
      // Handle the response data
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors
    });
  };
  
  

  return (
    <Container className="p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Field
                type="text"
                name="username"
                placeholder="Your username here"
                className="form-control"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
              <Form.Label className="my-3">Email address</Form.Label>
              <Field
                type="email"
                name="email"
                placeholder="name@example.com"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
              <Form.Label className="my-3">Password</Form.Label>
              <Field
                type="password"
                name="password"
                placeholder="Your password here"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
              <Button type="submit" className="my-2" variant="primary">
                Submit
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Formiks;
