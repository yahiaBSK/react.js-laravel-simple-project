import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import StudentEdit from "./StudentEdit";
import axios from "axios";
import Api from "../api/api";
import { studentStore } from "../stores/studentsStore";
import { useQuery } from "@tanstack/react-query";

export default function Students() {
  const [data, setdata] = useState();
  const [tableIsLoading, setTableIsLoading] = useState(true);

  const getStudentsData = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const getdata = await axios.get(`${Api}/students`);
      return getdata.data;
    },
    cacheTime: 1000 * 5 * 60,
    staleTime: 1000 * 5 * 60,
  });
  const { data: stdData, isLoading, error } = getStudentsData;

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else if (error) {
      console.log("error loading students", error);
    } else if (stdData) {
      console.log("data is here !!", stdData);
      setdata(stdData)
    }
  }, [error, isLoading]);

  useEffect(() => {
    // getStudents()
  }, [isLoading]);

  async function getStudents(){
    const fHandle = await axios
      .get(`${Api}/students`)
      .then(
        (res) => (
          setdata(res.data), localStorage.setItem("dataIsUpdated", res.data)
        )
      )
      .catch((err) =>
        console.log(`ERROR: ${err.code} | ERR-Msg: ${err.message}`)
      );
  }

  const studentInfoUpdated = async () => {
    setTableIsLoading(true);
    await getStudents();
    setTableIsLoading(false);
    console.log(
      `table loading finished - tableLoadingProps = ${tableIsLoading}`
    );
  };

  function handleTableHeader() {
    if (data) {
      const columns = [];
      for (let i = 0; i < Object.keys(data[0]).length - 1; i++) {
        columns.push(
          <TableColumn key={Object.keys(data[0])[i + 1]}>
            {Object.keys(data[0])[i + 1]}
          </TableColumn>
        );
      }
      columns.push(<TableColumn key={"edit,delete"}>Info</TableColumn>);
      return columns;
    } else {
      const loadingColumns = [];
      for (let i = 0; i < 4; i++) {
        loadingColumns.push(
          <TableColumn key={i} className="w-[85vw]">
            <Skeleton className="m-auto rounded-md ">Loading ...</Skeleton>
          </TableColumn>
        );
      }
      return loadingColumns;
    }
  }

  function handleTableRows() {
    if (data) {
      return data.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.degree}</TableCell>
          <TableCell>
            <div className="flex flex-row gap-4 justify-center">
              <Button
                color="primary"
                variant="flat"
                size="sm"
                className="p-0 w-3 "
              >
                <Link to={`/students/${item.id}`} className="p-3">
                  🔍 Show
                </Link>
              </Button>
              <StudentEdit
                studentInfo={item}
                isStudentInfoUpdated={studentInfoUpdated}
                tableIsLoading={tableIsLoading}
              />
              <Button
                color="danger"
                variant="flat"
                size="sm"
                className="p-0 w-3 "
              >
                <Link to={`/students/${item.id}`} className="p-3">
                  ❌ Delete
                </Link>
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ));
    } else {
      const loadingRows = [];
      for (let i = 0; i < 5; i++) {
        loadingRows.push(
          <TableRow key={i}>
            <TableCell>
              <Skeleton className=" m-auto rounded-md">Loading</Skeleton>
            </TableCell>
            <TableCell>
              <Skeleton className=" m-auto rounded-md">Loading</Skeleton>
            </TableCell>
            <TableCell>
              <Skeleton className=" m-auto rounded-md">Loading</Skeleton>
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-4 justify-center">
                <Skeleton className="rounded-md">
                  <Button color="success" variant="flat" size="sm">
                    Show
                  </Button>
                </Skeleton>
                <Skeleton className="rounded-md">
                  <Button color="danger" variant="flat" size="sm">
                    edit
                  </Button>
                </Skeleton>
                <Skeleton className=" rounded-md">
                  <Button color="danger" variant="flat" size="sm">
                    Delete
                  </Button>
                </Skeleton>
              </div>
            </TableCell>
          </TableRow>
        );
      }
      return loadingRows;
    }
  }

  function handleSelectMode() {
    if (data) {
      return "multiple";
    } else {
      return "none";
    }
  }

  return (
    <>
      <div className="mainDiv pt-10 min-h-screen flex flex-col justify-start items-center gap-y-8">
        <div className="text-primary text-[2rem] text-center">
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-[1.5em] font-bold">
            <Skeleton isLoaded={true} className="w-3/4 rounded-lg"></Skeleton>
            Students
          </h1>
        </div>
        <div className="tableDiv ">
          <Table
            selectionMode={handleSelectMode()}
            aria-label="Example static collection table"
            color="danger"
            className="w-[90vw]"
          >
            <TableHeader>{handleTableHeader()}</TableHeader>
            <TableBody>{handleTableRows()}</TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
