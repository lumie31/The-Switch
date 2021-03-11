import react, {useState, useRef, useEffect} from "react";
import { useToast } from "@chakra-ui/react";
import { setUserDetails, setFormState, editUsers, setFormData } from '../redux/actions'
import { connect } from "react-redux";
import {
  Heading,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";

import Head from "next/head";
import DataTable from "../components/table";

const Home = (props) => {
  const toast = useToast();

  useEffect(() => {
    let formData = props.state.formData;
    if (Object.keys(formData).length > 0){
      nameEl.current.value = formData.Name;
      phoneEl.current.value = formData.Phone;
      emailEl.current.value = formData.Email;
      cityEl.current.value = formData.City;
      setEditableIndex(formData.index);

      props.setFormState('edit');
    } else {
      nameEl.current.value = "";
      phoneEl.current.value = "";
      emailEl.current.value = "";
      cityEl.current.value = "";
      setEditableIndex(-1);

      props.setFormState("new");
    }
  }, [props.state.formData])

  const nameEl = useRef(null);
  const phoneEl = useRef(null);
  const emailEl = useRef(null);
  const cityEl = useRef(null);

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [nameErrorState, setNameErrorState] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [emailErrorState, setEmailErrorState] = useState(false);

  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
  const [phoneErrorState, setPhoneErrorState] = useState(false);

  const [cityErrorMsg, setCityErrorMsg] = useState("");
  const [cityErrorState, setCityErrorState] = useState(false);

  const [editableIndex, setEditableIndex] = useState(-1);

  const validateName = () => {

    if(nameEl.current.value.length < 3){
      setNameErrorState(true);
      setNameErrorMsg("Fullname is required, please put in your name");

      return false;
    }

    setNameErrorState(false);
    setNameErrorMsg("");

    return true;
  }

  const validateEmail = () => {

    if(emailEl.current.value.length < 3){
      setEmailErrorState(true);
      setEmailErrorMsg("Email is required, please put in your email");

      return false;
    }

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!mailformat.test(emailEl.current.value)){
      setEmailErrorState(true);
      setEmailErrorMsg("Email doesn't look right, Please check email");

      return false;
    }

    setEmailErrorState(false);
    setEmailErrorMsg("");

    return true;
  }

  const validatePhone = () => {
    
    if(phoneEl.current.value.length != 11){
      setPhoneErrorState(true);
      setPhoneErrorMsg("Mobile number is required, and must have 11 digits");

      return false;
    }

    setPhoneErrorState(false);
    setPhoneErrorMsg("");

    return true;
  }

  const validateCity = () => {

    if(cityEl.current.value.length < 3){
      setCityErrorState(true);
      setCityErrorMsg("City is required");

      return false;
    }

    setCityErrorState(false);
    setCityErrorMsg("");

    return true;
  }

  const submitUser = () => {
    if (!validateName() || !validateEmail() || !validatePhone() || !validateCity()){
      return;
    }

    toast({
      position: "top-right",
      description: "User added successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    let user = {
      Name: nameEl.current.value,
      Email: emailEl.current.value,
      Phone: phoneEl.current.value,
      City: cityEl.current.value,
    }

    props.setUserDetails(user);

    nameEl.current.value = ""; 
    emailEl.current.value = ""; 
    phoneEl.current.value = "";
    cityEl.current.value = "";
  }

  const updateUser = () => {
    let index = editableIndex;

    let users = [...props.state.users];
    users[index].Name = nameEl.current.value;
    users[index].Email = emailEl.current.value;
    users[index].Phone = phoneEl.current.value;
    users[index].City = cityEl.current.value;

    props.editUsers(users);
    props.setFormData("");
    toast({
      position: "top-right",
      description: "User updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <>
      <Head>
        <title>Visualize your data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexWrap="wrap">
        <Container>
          <Heading
            mt={10}
            mb={10}
            as="h1"
            bgClip="text"
            fontSize="4xl"
            textAlign="center"
            fontWeight="extrabold"
            bgGradient="linear(to-l, #7928CA,#FF0080)"
          >
            Input your data
          </Heading>
          <form>
            <Stack spacing={2}>
              <FormControl id="full-name" isRequired>
                <FormLabel>Full name</FormLabel>
                <Input
                  type="text"
                  placeholder="Full Name"
                  isInvalid={nameErrorState}
                  errorBorderColor={nameErrorState ? "crimson" : ""}
                  ref={nameEl}
                />
                <FormHelperText>{nameErrorMsg}</FormHelperText>
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Email Address"
                  isInvalid={emailErrorState}
                  errorBorderColor={emailErrorState ? "crimson" : ""}
                  ref={emailEl}
                />
                <FormHelperText>{emailErrorMsg}</FormHelperText>
              </FormControl>

              <FormControl id="number" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+234" />
                  <Input
                    type="tel"
                    placeholder="Mobile number"
                    isInvalid={phoneErrorState}
                    errorBorderColor={phoneErrorState ? "crimson" : ""}
                    ref={phoneEl}
                  />
                </InputGroup>
                <FormHelperText>{phoneErrorMsg}</FormHelperText>
              </FormControl>

              <FormControl id="city" isRequired>
                <FormLabel>Your city</FormLabel>
                <Input
                  type="text"
                  placeholder="e.g Lagos"
                  variant="outline"
                  isInvalid={cityErrorState}
                  errorBorderColor={cityErrorState ? "crimson" : ""}
                  ref={cityEl}
                />
                <FormHelperText>{cityErrorMsg}</FormHelperText>
              </FormControl>

              {props.state.formState == "new" ? (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  borderWidth="2px"
                  onClick={submitUser}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  borderWidth="2px"
                  onClick={updateUser}
                >
                  Update
                </Button>
              )}
            </Stack>
          </form>
        </Container>
        <DataTable />
      </Flex>
    </>
  );
}

const mapDispatchToProps = {
  setUserDetails,
  setFormState,
  editUsers,
  setFormData
};

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);