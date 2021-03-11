
import MUIDataTable from "mui-datatables";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { setFormData, editUsers } from '../redux/actions';
import Swal from "sweetalert2";
import { useToast } from "@chakra-ui/react";

import {
  Button,
  Heading,
  Container,
} from "@chakra-ui/react";

const DataTable = (props) => {
  const toast = useToast();

  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return <span>{tableMeta.rowIndex + 1}</span>;
        },
        sort: false,
      },
    },
    {
      name: "Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Phone",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "City",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          console.log(tableMeta.rowData);
          return (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => editClass(tableMeta.rowIndex)}
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{ margin: "0 1rem" }}
                onClick={() => deleteUser(tableMeta.rowIndex)}
              >
                <DeleteForeverIcon />
              </Button>
            </>
          );
        },
      },
    },
  ];

  const editClass = (index) => {
    let formData = { ...props.data[index] };
    formData.index = index;
    props.setFormData(formData);
    toast({
      position: "top-right",
      description: "Edit your data in the input field",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  }

  const deleteUser = (index) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: `Delete`,
      confirmButtonColor:'#d33',
      allowOutsideClick: false
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let users = [...props.data];
        let newUsers = users.filter((user, i) => i != index);
        props.editUsers(newUsers);
        props.setFormData("")
        toast({
          position: "top-right",
          description: "User deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      <Container maxW="container.md">
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
          Visualize your data
        </Heading>

          <MUIDataTable
            title={"Your Data"}
            data={props.data}
            columns={columns}
            options={{
              selectableRows: "none",
              selectableRowsHeader: false,
              elevation: 3,
            }}
          />
      </Container>
    </>
  );
}

const mapDispatchToProps = {
  setFormData,
  editUsers
};

const mapStateToProps = (state) => ({
  data: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);