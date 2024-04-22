import {
  ActionIcon,
  Flex,
  Modal,
  Button,
  Loader,
  Input,
  Select,
  Table,
  rem,
  Autocomplete,
} from "@mantine/core";
import { IconPlus, IconX, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../css/home.css";

function Home() {
  const column = [
    {
      label: "ปีการศึกษา",
      field: "year",
    },
    {
      label: "กลุ่มวิชา",
      field: "group_name",
    },
    {
      label: "รหัสวิชา",
      field: "course_id",
    },
    {
      label: "ชื่อวิชา",
      field: "course_name",
    },
    {
      label: "หน่วยกิต",
      field: "unit",
    },
    {
      label: "ลบ",
      field: "manage",
    },
  ];

  const [Table, setTable] = useState({
    columns: column,
    rows: [],
  });

  const Fetch = () => {
    axios.get("http://localhost/apistudyplan/plan.php").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        setTable({
          columns: column,
          rows: [
            ...data.map((i, key) => ({
              key: key,
              id: i.id,
              year: i.year,
              group_name: i.group_name,
              course_id: i.course_id,
              course_name: i.course_name,
              unit: i.unit,
              manage: (
                <>
                  <Flex gap="xs" justify="center" align="center">
                    <ActionIcon color="red" onClick={() => handleDelete(i.id)}>
                      <IconX />
                    </ActionIcon>
                  </Flex>
                </>
              ),
            })),
          ],
        });
      }
    });
  };

  const [year, setYear] = useState("");
  const [Unit, setUnit] = useState("");

  const [course_id, setCourse_id] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [Course, setCourse] = useState([]);
  const getCourse = () => {
    axios.get(`http://localhost/apistudyplan/course.php`).then((res) => {
      setCourse(res.data);
    });
  };

  const [Group_id, setGroup_id] = useState("");
  const [Group, setGroup] = useState([]);
  const getGroup = () => {
    axios.get(`http://localhost/apistudyplan/group_course.php`).then((res) => {
      setGroup(res.data);
    });
  };

  const handleAddplan = async () => {
    if (!year || !course_id || !course_name || !Group_id || !Unit) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3366ff",
      });
      return;
    }
    try {
      const data = {
        year: year,
        group_id: Group_id,
        course_id: course_id,
        course_name: course_name,
        unit: Unit,
      };
      console.log(data);
      const res = await axios.post(
        "http://localhost/apistudyplan/insert_plan.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          Fetch();
          setYear(null);
          setGroup_id(null);
          setCourse_id(null);
          setCourse_name("");
          setUnit("");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.response.data.error,
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "คุณต้องการลบข้อมูล?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD3333",
      cancelButtonColor: "#000000",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost/apistudyplan/del_plan.php", {
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              id: id,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "ลบข้อมูลสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
            Fetch();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
            });
          });
      }
    });
  };

  useEffect(() => {
    getCourse();
    getGroup();
    Fetch();
  }, []);

  return (
    <div style={{ background: "#f0f2f8", padding: "28px" }}>
      <div
        style={{
          marginBottom: "15px",
          textAlign: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Flex w="100%">
          {/* <Select
            searchable
            ml={5}
            w="100%"
            placeholder="ค้นหา"
            clearable
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            data={Course.map((Course) => ({
              value: Course.course_id,
              label: `${Course.course_id} ${Course.course_name}`,
            }))}
            onChange={(v) => {
              const gid = Course.find((val) => val.course_id === v).group_id;
              const unit = Course.find((val) => val.course_id === v).unit;
              const coursename = Course.find(
                (val) => val.course_id === v
              ).course_name;
              setCourse_id(v);
              setGroup_id(gid);
              setUnit(unit);
              setCourse_name(coursename);
            }}
          /> */}
          <Select
            w="50%"
            ml={5}
            placeholder="ปีการศึกษา"
            searchable
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            clearable
            name="year"
            value={year}
            data={["1/2567", "2/2567", "1/2568", "2/2568"]}
            onChange={(v) => setYear(v)}
          />
          <Select
            w="50%"
            ml={5}
            placeholder="กลุ่มวิชา"
            searchable
            clearable
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            name="group_name"
            nothingFoundMessage="ไม่พบกลุ่มวิชา"
            value={Group_id}
            data={Group.map((group) => ({
              value: group.group_id,
              label: `${group.group_name}`,
            }))}
            onChange={(v) => {
              setGroup_id(v);
            }}
          />
          {/* <Input
            ml={5}
            w="50%"
            placeholder="รหัสวิชา"
            value={course_id}
            onChange={(e) => {
              setCourse_id(e.target.value);
            }}
          /> */}
          <Select
            searchable
            ml={5}
            w="80%"
            placeholder="ค้นหารายวิชา"
            clearable
            // leftSection={
            //   <IconSearch
            //     style={{ width: rem(16), height: rem(16) }}
            //     stroke={1.5}
            //   />
            // }
            rightSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            nothingFoundMessage="ไม่พบรายวิชา"
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            value={course_id}
            data={Course.filter(
              (course) => !Group_id || course.group_id === Group_id
            ).map((Course) => ({
              value: Course.course_id,
              label: `${Course.course_id} ${Course.course_name}`,
            }))}
            onChange={(v) => {
              if (v) {
                const selectedCourse = Course.find(
                  (val) => val.course_id === v
                );
                if (selectedCourse) {
                  const gid = selectedCourse.group_id;
                  const unit = selectedCourse.unit;
                  const coursename = selectedCourse.course_name;
                  setCourse_id(v);
                  setGroup_id(gid);
                  setUnit(unit);
                  setCourse_name(coursename);
                  console.log(v, gid, unit, coursename);
                }
              } else {
                // setYear(null);
                // setGroup_id(null);
                setCourse_id("");
                setCourse_name("");
                setUnit("");
              }
            }}
          />
          <Button
            ml={5}
            w="25%"
            variant="filled"
            color="#3366FF"
            leftSection={<IconPlus />}
            style={{ fontSize: "0.8rem" }}
            onClick={handleAddplan}
          >
            เพิ่มรายวิชา
          </Button>
        </Flex>
      </div>
      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
        }}
        className="Main-Content"
      >
        <MDBDataTable
          bordered
          hover
          data={Table}
          noBottomColumns
          small
          noRecordsFoundLabel="ไม่พบรายการ"
          searchLabel="ค้นหา"
          infoLabel={["กำลังแสดง", "ถึง", "ของ", "รายการ"]}
          entriesLabel="แสดงรายการ"
          paginationLabel={["ก่อนหน้า", "ถัดไป"]}
          sortable={false}
        />
      </div>
    </div>
  );
}

export default Home;
