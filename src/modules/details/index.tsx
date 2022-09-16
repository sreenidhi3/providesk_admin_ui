import { Box, Typography } from "@mui/material";
import { Select } from "modules/shared/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { StyleLabel } from "modules/shared/StyleLabel";
import { Button } from "modules/shared/Button";
import { useCallback, useState } from "react";
import { Form, Formik } from "formik";
import { TimeLineCom } from "./Timeline";

function Details() {
  const onSubmit = useCallback(() => {}, []);
  const onResolve = useCallback(() => {}, []);
  const initialValues = {
    department: "",
    catagory: "",
    user: "",
    description: "",
  };
  //todo yup
  const validationSchema = (value) => {};

  return (
    <>
      <div className='d-flex justify-content-around'>
        <div>
          <TimeLineCom />
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, handleChange }) => (
              <Form>
                <Select
                  value={values.department}
                  name='department'
                  label='Department'
                  options={["ayush"]}
                  required={true}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  error={errors.department}
                />
                <Select
                  value={values.catagory}
                  label='Category'
                  name='catagory'
                  options={[{ label: "sh", value: "aksjd" }]}
                  required={true}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  error={errors.catagory}
                />
                <Select
                  value={values.user}
                  label='Assign to User'
                  name='user'
                  options={["ayush"]}
                  required={true}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  error={errors.user}
                />
                <Box>
                  <StyleLabel text={"Description"} required={true} />
                  <TextareaAutosize
                    name='description'
                    value={values.description}
                    minRows={3}
                    placeholder='Minimum 3 rows'
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    error={errors.description}
                  />
                </Box>
                <Button
                  onClick={onResolve}
                  disabled={!(values.description.length > 0)}
                  sx={{ backgroundColor: "success" }}
                >
                  Assign
                </Button>
                <Button
                  onClick={onResolve}
                  disabled={!(values.description.length > 0)}
                >
                  Resolve
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Details;
