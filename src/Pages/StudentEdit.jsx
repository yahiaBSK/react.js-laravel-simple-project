import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../api/api";
import React from "react"; 

export default function StudentEdit(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [studentUpdatedInfo, setStudentUpdatedInfo] = useState({
    name: props.studentInfo.name,

    email: props.studentInfo.email,
    degree: props.studentInfo.degree,
  });
  const [loadingData, setLoadingData] = useState(false);
  const loadingState = props.tableIsLoading;

  useEffect(() => {
    if (loadingState == false) {
      setLoadingData(false);
    }
  }, [loadingState]);

  const updateStudent = async () => {
    setLoadingData(true);

    await axios.get(`${Api}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });

    function getCookie(name) {
      var re = new RegExp(name + "=([^;]+)");
      var value = re.exec(document.cookie);
      return value != null ? unescape(value[1]) : null;
    }

    await axios
      .put(
        `${Api}/students/${props.studentInfo.id}/update`,
        {
          name: studentUpdatedInfo.name,
          email: studentUpdatedInfo.email,
          degree: studentUpdatedInfo.degree,
        },
        {
          headers: {
            accept: "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.message);
        const updateTable = props.isStudentInfoUpdated;
        updateTable();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function checkChanges() {
    let isChanged;
    for (let i = 0; i < 3; i++) {
      if (
        Object.entries(studentUpdatedInfo)[i][1] !==
        Object.entries(props.studentInfo)[i + 1][1]
      ) {
        isChanged = true;
      }
    }
    if (isChanged) {
      return false;
    } else {
      return true;
    }
  }

  function checkInputColor(arg) {
    if (props.studentInfo[arg] == studentUpdatedInfo[arg]) {
      return "warning";
    } else {
      return "success";
    }
  }

  return (
    <div>
      {/* <div className="m-auto absolute inset-0 w-[1000px] h-[1000px] text-red-950 bg-red-500">ERROR</div> */}
      <Button
        onPress={onOpen}
        color="primary"
        variant="flat"
        className="w-fitt p-2"
        size="sm"
        isLoading={loadingData}
      >
        ✏️ Edit
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Student {props.studentInfo.id}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Id"
                  variant="flat"
                  isDisabled
                  defaultValue={props.studentInfo.id}
                />
                <Input
                  label="Name"
                  variant="flat"
                  defaultValue={props.studentInfo.name}
                  color={checkInputColor("name")}
                  onChange={(e) =>
                    setStudentUpdatedInfo((info) => ({
                      ...info,
                      name: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Email"
                  variant="flat"
                  defaultValue={props.studentInfo.email}
                  color={checkInputColor("email")}
                  onChange={(e) =>
                    setStudentUpdatedInfo((info) => ({
                      ...info,
                      email: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Degree"
                  variant="flat"
                  defaultValue={props.studentInfo.degree}
                  color={checkInputColor("degree")}
                  onChange={(e) =>
                    setStudentUpdatedInfo((info) => ({
                      ...info,
                      degree: e.target.value,
                    }))
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={onClose}
                  onClick={() => {
                    updateStudent();
                  }}
                  isDisabled={checkChanges()}
                >
                  ✏️ Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
