import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Skeleton,
} from "@nextui-org/react";
import Api from "../api/api";


export default function StudentInfo() {
  const { student_id } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    getSTudentInfo();
  }, []);

  async function getSTudentInfo() {
    const fHandle = await fetch(
      `${Api}/students/${student_id}`,
      {
        method: "GET",
      }
    );
    const fData = await fHandle.json();
    setStudentInfo(fData);
  }

  function handleStudentInfo(arg) {
    if (studentInfo) {
      switch (arg) {
        case "name":
          return studentInfo.name;
        case "email":
          return studentInfo.email;
        default:
          return <Skeleton className="w-fit rounded-md">Loding ... </Skeleton>;
      }
    } else {
      return  <Skeleton className="w-fit mt-2 rounded-md">Loding ... </Skeleton>;
    }
  }
  return (
    <>
      <div className="mainDiv pt-10 min-h-[100vh] flex flex-col justify-start items-center gap-y-8">
        <div className="text-primary text-[2rem] text-center">
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-[1.5em] font-bold">
            Student Info {student_id}
          </h1>
        </div>
        <div className="studentInfo pt-10">
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <div className="text-md">{handleStudentInfo("name")}</div>
                <div className="text-small text-default-500">{handleStudentInfo("email")}</div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
              >
                Visit source code on GitHub.
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
