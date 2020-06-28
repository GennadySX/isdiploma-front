const data = [
  {
    id: "chat_page",
    icon: "simple-icon-bubbles",
    label: "menu.chat_page",
    title: "Чат",
    to: "/home/chat",
  },
  {
    id: "projects",
    icon: "simple-icon-layers",
    label: "menu.projects",
    title: "Проекты",
    to: "/home/project",

  },
  {
    id: "ui",
    icon: "simple-icon-pin",
    label: "menu.tasks",
    title: "Задачи",
    to: "/home/task"
  },
  {
    id: "menu",
    icon: "simple-icon-user",
    label: "menu.profile",
    to: "/home/profile",
    title: "Профиль",
  },/*
  {
    id: "docs",
    icon: "simple-icon-question",
    label: "menu.help",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    title: "Помощь",
  },*/
  {
    id: "blankpage",
    icon: "simple-icon-power",
    label: "menu.logout",
    to: "/home/blank-page",
    title: "Выйти",
    func: () => {
      localStorage.clear()
      window.location.href = '/'
    }
  },
];
export default data;
