import { Fragment, useState } from "react";
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
  FormGroup,
  TextField,
  Button,
  Modal,
  Box,
} from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header({ account }) {
  const { isLoggedIn, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [popover, setPopover] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [register, setRegister] = useState(false);
  const [open, setOpen] = useState(false);
  const [bankAccount, setBankAccount] = useState({
    name: "",
  });
  const [category, setCategory] = useState({
    name: "",
  });
  const [popUp, setPopUp] = useState("");

  const openPopover = (e) => {
    setPopover(true);
    setAnchorEl(e.currentTarget);
  };

  const closePopover = () => {
    setPopover(false);
    setAnchorEl(null);
  };

  const clickLogin = () => {
    setRegister(false);
    setAuthModal(true);
    closePopover();
  };

  const clickRegister = () => {
    setRegister(true);
    setAuthModal(true);
    closePopover();
  };

  const handleOpen = (name) => {
    setOpen(true);
    setPopUp(name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (popUp == "BA") {
      setBankAccount({
        ...bankAccount,
        [name]: value,
      });
    } else if (popUp === "AC") {
      setCategory({ name: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Bank Account submitted:", bankAccount);
    // Handle form submission, e.g., send the data to the server
    if (popUp === "BA") {
      try {
        const addBank = await axios.post("/budget/bankBalance", {
          name: bankAccount.name,
          user: account?.id,
        });
        if (addBank.status == 201 || addBank.status === 200) {
          handleClose();
        }
      } catch (error) {
        if (error.response.status === 400)
          alert(error?.response?.data?.message);
        handleClose();
      }
    } else if (popUp == "AC") {
      const addCategory = await axios.post("/budget/categories", category);
      if (addCategory.status == 201 || addCategory.status === 200) {
        handleClose();
      }
    }
  };

  return (
    <AppBar className="header" position="static">
      <h1>EffinTraK</h1>

      <IconButton onClick={openPopover}>
        <OnlineIndicator online={isLoggedIn}>
          <Avatar src={account?.username || ""} alt={account?.username || ""} />
        </OnlineIndicator>
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={popover}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <List style={{ minWidth: "100px" }}>
          <ListSubheader style={{ textAlign: "center" }}>
            Hello, {isLoggedIn ? account.username : "Guest"}
          </ListSubheader>

          {isLoggedIn ? (
            <Fragment>
              <ListItemButton onClick={() => handleOpen("BA")}>
                Add Bank Account
              </ListItemButton>
              <ListItemButton onClick={() => handleOpen("AC")}>
                Add Category
              </ListItemButton>
              <ListItemButton onClick={logout}>Logout</ListItemButton>
            </Fragment>
          ) : (
            <Fragment>
              <ListItemButton onClick={clickLogin}>Login</ListItemButton>
              <ListItemButton onClick={clickRegister}>Register</ListItemButton>
            </Fragment>
          )}
        </List>
      </Popover>

      <AuthModal
        open={authModal}
        close={() => setAuthModal(false)}
        isRegisterMode={register}
        toggleRegister={() => setRegister((prev) => !prev)}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {popUp == "BA" && (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <TextField
                  label="Bank Name"
                  name="name"
                  value={bankAccount.name}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginTop: "16px" }}
                >
                  Submit
                </Button>
              </FormGroup>
            </form>
          )}

          {popUp === "AC" && (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <TextField
                  label="Category Name"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginTop: "16px" }}
                >
                  Submit
                </Button>
              </FormGroup>
            </form>
          )}
        </Box>
      </Modal>
    </AppBar>
  );
}
