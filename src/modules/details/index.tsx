import { Box, Typography, Grid } from "@mui/material";
import { Select } from "modules/shared/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { StyleLabel } from "modules/shared/StyleLabel";
import { Button } from "modules/shared/Button";

import { Form, Formik } from "formik";
import Paper from "@mui/material/Paper";
import { useDetails } from "./details.hook";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

function Details() {
  // toDo
  //   const id: number = parseInt(useParams().id as string);
  //   const { data, isLoading } = useDetails(id);

  const onSubmit = useCallback(() => {}, []);
  const onResolve = useCallback(() => {}, []);
  const initialValues = {
    department: "",
    catagory: "",
    user: "",
    description: "",
  };

  //todo yup
  const validationSchema = {};

  return (
    <>
      <Grid container>
        <Grid item xs={6} style={{ maxHeight: "85vh", overflow: "auto" }}>
          <div className='timeline'>
            {[1, 2, 2, 3, 3, 34, 3, 3, 3, 3, 2].map((item) => {
              return (
                <>
                  <div style={{ display: "flex" }}>
                    <div className='content-left left'>dfkj.</div>
                    <div>
                      <div className='container right'>
                        <div className='content'>
                          <Paper elevation={8}>
                            <div className='p-2 m-2'>
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing omnis laudantium est obcaecati
                                quibusdam aliquam excepturi nulla?
                              </p>
                            </div>
                          </Paper>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Grid>
        <Grid item xs={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, handleChange }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 20,
                  alignItems: "center",
                }}
              >
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
                  sx={{ width: "300px", my: 1 }}
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
                  sx={{ width: "300px", my: 1 }}
                />
                <Select
                  value={values.user}
                  label='Assign to User'
                  name='user'
                  options={["ayush"]}
                  required={true}
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleChange(e);
                  }}
                  error={errors.user}
                  sx={{ width: "300px", my: 1 }}
                />
                <Box>
                  <StyleLabel text={"Description"} required={true} />
                  <TextareaAutosize
                    name='description'
                    value={values.description}
                    minRows={3}
                    placeholder='Minimum 3 rows'
                    style={{ width: "300px" }}
                    onChange={handleChange}
                    // error={errors.description}
                  />
                </Box>
                <div className='d-flex '>
                  <button
                    onClick={onResolve}
                    disabled={!(values.description.length > 0)}
                    //   color={"primary.main"}
                    className={"btn btn-primary mx-5"}
                  >
                    Assign
                  </button>
                  <button
                    onClick={onResolve}
                    className={"btn btn-success"}
                    disabled={!(values.description.length > 0)}
                  >
                    Resolve
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
}

export default Details;
