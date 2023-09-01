import React, { useState, useEffect } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { PushSpinner } from "react-spinners-kit";
import {
  getControls,
  updateControls,
} from "../../store/actions/datacollection";
const Mycontrolspage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getControls());
  });
  const [loadingbtn, setloadbtn] = useState(false);
  const sitecontrols = useSelector((value) => value.ControlVersion);
  const [vpn, setvpn] = useState("");
  const [ads, setads] = useState("");
  const [adscount, setcount] = useState("");
  const [_id, setid] = useState("");

  useEffect(() => {
    if (sitecontrols && sitecontrols.control) {
      setvpn(sitecontrols.control.vpnaccess);
      setads(sitecontrols.control.topads);
      setcount(sitecontrols.control.adscount);
      setid(sitecontrols.control._id);
    }
  
  });
  const notifications = useSelector((value) => value.notification);
  useEffect(() => {
    if (notifications && notifications.notice) {
      setloadbtn(false);
    }
  });
  const Formik = useFormik({
    initialValues: {
      vpnaccess: `${vpn !== null ? vpn : ""}`,
      topads: `${ads !== null ? ads : ""}`,
      adscount: `${adscount !== null ? adscount : ""}`,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      vpnaccess: Yup.number().required("field required"),

      topads: Yup.string().required("field required"),
      adscount: Yup.string().required("field required"),
    }),

    onSubmit: (data) => {
      dispatch(updateControls(_id, data));
      setloadbtn(true);
    },
  });

  return (
    <div className="contolv" style={{ minHeight: `${window.innerHeight}px` }}>
      <p>Access Controls</p>

      <Form
        onSubmit={Formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          height: "100%",
        }}
      >
        <FormControl
          fullWidth
          style={{
            marginBottom: "30px",
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Access Control rate
          </InputLabel>
          <Select
            name="vpnaccess"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Formik.values.vpnaccess}
            label="Access Control rate"
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.vpnaccess && Boolean(Formik.errors.vpnaccess)}
            helperText={Formik.touched.vpnaccess && Formik.errors.vpnaccess}
            {...Formik.getFieldHelpers("vpnaccess")}
          >
           <MenuItem value={0}>Zero</MenuItem>
            <MenuItem value={1}>one</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </Select>
        </FormControl>

        <TextField
                      className="textfields"
          style={{
            marginBottom: "30px",
          }}
          name="topads"
          multiline
          rows={7}
          value={Formik.values.topads}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.topads && Boolean(Formik.errors.topads)}
          helperText={Formik.touched.topads && Formik.errors.topads}
          {...Formik.getFieldHelpers("topads")}
          label="Advertisement "
        ></TextField>

        <TextField
                      className="textfields"
          style={{
            marginBottom: "30px",
          }}
          name="adscount"
          value={Formik.values.adscount}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.vpnaccess && Boolean(Formik.errors.adscount)}
          helperText={Formik.touched.vpnaccess && Formik.errors.adscount}
          {...Formik.getFieldHelpers("adscount")}
          label="Advertisement Durations"
        ></TextField>

        {loadingbtn ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            <PushSpinner color="aqua" size={17} />
          </div>
        ) : (
          <Button
            type="submit"
            style={{
              marginBottom: "50px",
              width: "25%",
              minWidth: "98%",
            }}
          >
            Update Details
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Mycontrolspage;
