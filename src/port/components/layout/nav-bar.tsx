import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Menubar, MenubarProps } from "primereact/menubar";

import httpService from "../../services/httpService";
import { getUserDetails } from "../../services/userService";

type MenuItem = Exclude<MenubarProps["model"], undefined>[number];

const Navbar = ({ user }: { [key: string]: any } | any): any => {
  const history = useHistory();

  const items = [
    {
      command: (event: any) => {
        event.originalEvent.preventDefault();
        history.push("/");
      },
      template: (item: MenuItem, options: any) => {
        const { target } = item;
        return (
          <a
            aria-haspopup="false"
            className={options.className}
            href="/"
            onClick={options.onClick}
            role="menuitem"
            tabIndex={0}
            target={target}
          >
            PixelHub <i className="fas fa-paint-brush" /> App
          </a>
        );
      },
    },
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => history.push("/"),
    },
    {
      label: "About",
      icon: "pi pi-fw pi-info-circle",
      command: () => history.push("/about"),
    },
    {
      label: "Studio",
      icon: "pi pi-fw pi-palette",
      style: { display: user ? "" : "none" },
      items: [
        {
          label: "Create Drawing",
          icon: "pi pi-fw pi-image",
          command: () => history.push("/create-drawing"),
        },
        {
          label: "My Drawings",
          icon: "pi pi-fw pi-images",
          command: () => history.push("/my-drawings"),
        },
        {
          label: "My favorites",
          icon: "pi pi-fw pi-star",
          command: () => history.push("/my-favorites"),
        },
      ],
    },
    {
      label: "Account",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Sign In",
          icon: "pi pi-fw pi-sign-in",
          style: { display: !user ? "" : "none" },
          command: () => history.push("/sign-in"),
        },
        {
          label: "Sign Up",
          icon: "pi pi-fw pi-user-plus",
          style: { display: !user ? "" : "none" },
          command: () => history.push("/sign-up"),
        },
        {
          label: `${
            user?.painter === false ? "Upgrade to" : "Sign Up as"
          } a Painter`,
          icon: "fas fa-paint-brush",
          style: {
            display: !user?.painter ? "" : "none",
            fontSize: 14,
          },
          command: async () => {
            if (user?.painter === false) {
              try {
                const {
                  data: { email, avatarUrl, name },
                } = (await getUserDetails(user._id)) as any;

                await httpService.patch(
                  `${process.env.GATSBY_API_URL}/users/${user._id}`,
                  { name, avatarUrl, email, painter: true, strategy: "local" }
                );
                toast.success(
                  "You have successfully upgraded to a Painter, please login in to start creating!!",
                  {
                    position: "top-center",
                    autoClose: 4000,
                  }
                );
                history.push("/logout");
                history.push("/sign-in");
                return;
              } catch (error) {
                throw new Error(error);
              }
            }
            history.push("/painter-sign-up");
          },
        },
        {
          label: "Logout",
          icon: "pi pi-fw pi-sign-out",
          style: { display: user ? "" : "none" },
          command: () => history.push("/logout"),
        },
        {
          label: "My Profile",
          icon: "pi pi-fw pi-user-edit",
          style: { display: user ? "" : "none" },
          command: () => history.push("/me"),
        },
      ],
    },
    {
      label: "Explore",
      icon: "pi pi-fw pi-compass",
      style: { display: user ? "" : "none" },
      command: () => history.push("/browse"),
    },
  ];

  return (
    <div>
      <Menubar model={items as any} />
    </div>
  );
};

export default Navbar;
