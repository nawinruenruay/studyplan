import { AppShell, Burger, Flex, Group, NavLink, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, NavLink as Nl, useNavigate } from "react-router-dom";
import { IconLogout, IconClipboard, IconHeart } from "@tabler/icons-react";

import "../css/layout.css";

function Layout() {
  const [Active, setActive] = useState(0);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();

  const iconLog = <IconLogout size={14} />;

  const data = [
    {
      title: "แผนการเรียน",
      path: "/home",
      icon: <IconClipboard />,
    },
    {
      title: "test",
      path: "/test",
      icon: <IconHeart />,
    },
    // {
    //   title: "",
    //   icon: <IconUserHeart />,
    //   subnav: [
    //     {
    //       title: "",
    //       path: "/",
    //       icon: <IconArrowNarrowRight size={15} />,
    //     },
    //     {
    //       title: "",
    //       path: "/",
    //       icon: <IconArrowNarrowRight size={15} />,
    //     },
    //     {
    //       title: "",
    //       path: "/",
    //       icon: <IconArrowNarrowRight size={15} />,
    //     },
    //   ],
    // },
  ];

  useEffect(() => {
    const activeIndex = parseInt(localStorage.getItem("activeMenu"));
    if (!isNaN(activeIndex)) {
      setActive(activeIndex);
    }
  }, []);

  const HandleNavClick = (key) => {
    setActive(key);
    toggleMobile();
    localStorage.setItem("activeMenu", key);
  };

  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{
        width: 270,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header
        style={{
          borderBottom: "0",
          background: "#3366FF",
          color: "#FFF",
          paddingRight: "5px",
        }}
        className="Header"
      >
        <Group h="100%" px="sm" w="auto" justify="space-between">
          <Flex className="NavLogo" align="center" gap={10} ml={10}>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              color="#FFF"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
              color="#FFF"
            />
          </Flex>
          <Button
            leftSection={iconLog}
            variant="filled"
            color="#3366FF"
            onClick={HandleLogout}
          >
            ออกจากระบบ
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ borderRight: "0" }} className="Navbar">
        <Flex direction={"column"} align={"center"}>
          {data.map((i, key) => (
            <NavLink
              key={key}
              color="#3366FF"
              style={{
                borderRadius: "10px",
                padding: "15px 15px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
              className="NavLink ripple"
              onClick={() => HandleNavClick(key)}
              active={key === Active}
              component={Nl}
              to={i.path}
              label={i.title}
              leftSection={i.icon}
            >
              {i.subnav && (
                <>
                  <Flex direction="column" align="flex-start">
                    {i.subnav.map((item, index) => (
                      <NavLink
                        color="#3366FF"
                        style={{
                          borderRadius: "10px",
                          padding: "15px 15px",
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                        key={index}
                        className="subNav"
                        onClick={() => HandleNavClick(key)}
                        component={Nl}
                        to={item.path}
                        label={item.title}
                        leftSection={item.icon}
                      />
                    ))}
                  </Flex>
                </>
              )}
            </NavLink>
          ))}
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main style={{ background: "#f0f2f8" }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
