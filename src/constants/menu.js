const data = [
  {
    id: "chat_page",
    icon: "simple-icon-bubbles",
    label: "menu.chat_page",
    title: "Чат",
    to: "/app/pages",
    subs: [
      {
        icon: "simple-icon-bubbles",
        label: "menu.chat",
        to: "/app/applications/chat"
      },
      {
        icon: "simple-icon-credit-card",
        label: "menu.data-list",
        to: "/app/pages/data-list"
      },
      {
        icon: "simple-icon-list",
        label: "menu.thumb-list",
        to: "/app/pages/thumb-list"
      },
      {
        icon: "simple-icon-grid",
        label: "menu.image-list",
        to: "/app/pages/image-list"
      },
      {
        icon: "simple-icon-book-open",
        label: "menu.details",
        to: "/app/pages/details"
      },
      {
        icon: "simple-icon-magnifier",
        label: "menu.search",
        to: "/app/pages/search"
      },
      {
        icon: "simple-icon-envelope-open",
        label: "menu.mailing",
        to: "/app/pages/mailing"
      },
      {
        icon: "simple-icon-bag",
        label: "menu.invoice",
        to: "/app/pages/invoice"
      },
      {
        icon: "simple-icon-user-following",
        label: "menu.login",
        to: "/user/login",
        newWindow: true
      },
      {
        icon: "simple-icon-user-follow",
        label: "menu.register",
        to: "/user/register",
        newWindow: true
      },
      {
        icon: "simple-icon-user-following",
        label: "menu.forgot-password",
        to: "/user/forgot-password",
        newWindow: true
      },
      {
        icon: "simple-icon-exclamation",
        label: "menu.error",
        to: "/error",
        newWindow: true
      }
    ]
  },
  {
    id: "projects",
    icon: "simple-icon-layers",
    label: "menu.projects",
    title: "Проекты",
    to: "/app/applications",
    subs: [
      {
        icon: "simple-icon-check",
        label: "menu.todo",
        to: "/app/applications/todo"
      },
      {
        icon: "simple-icon-calculator",
        label: "menu.survey",
        to: "/app/applications/survey"
      }
    ]
  },
  {
    id: "ui",
    icon: "simple-icon-pin",
    label: "menu.ui",
    title: "Задачи",
    to: "/app/ui",
    subs: [
      { icon: "simple-icon-bell", label: "menu.alerts", to: "/app/ui/alerts" },
      { icon: "simple-icon-badge", label: "menu.badges", to: "/app/ui/badges" },
      {
        icon: "simple-icon-control-play",
        label: "menu.buttons",
        to: "/app/ui/buttons"
      },
      { icon: "simple-icon-layers", label: "menu.cards", to: "/app/ui/cards" },
      {
        icon: "simple-icon-picture",
        label: "menu.carousel",
        to: "/app/ui/carousel"
      },
      { icon: "simple-icon-chart", label: "menu.charts", to: "/app/ui/charts" },
      {
        icon: "simple-icon-arrow-up",
        label: "menu.collapse",
        to: "/app/ui/collapse"
      },
      {
        icon: "simple-icon-arrow-down",
        label: "menu.dropdowns",
        to: "/app/ui/dropdowns"
      },
      {
        icon: "simple-icon-book-open",
        label: "menu.editors",
        to: "/app/ui/editors"
      },
      {
        icon: "simple-icon-notebook",
        label: "menu.form-layouts",
        to: "/app/ui/form-layouts"
      },
      {
        icon: "simple-icon-puzzle",
        label: "menu.form-components",
        to: "/app/ui/form-components"
      },
      {
        icon: "simple-icon-check",
        label: "menu.form-validations",
        to: "/app/ui/form-validations"
      },
      { icon: "simple-icon-star", label: "menu.icons", to: "/app/ui/icons" },
      {
        icon: "simple-icon-note",
        label: "menu.input-groups",
        to: "/app/ui/input-groups"
      },
      {
        icon: "simple-icon-screen-desktop",
        label: "menu.jumbotron",
        to: "/app/ui/jumbotron"
      },
      { icon: "simple-icon-map", label: "menu.maps", to: "/app/ui/maps" },
      { icon: "simple-icon-docs", label: "menu.modal", to: "/app/ui/modal" },
      {
        icon: "simple-icon-cursor",
        label: "menu.navigation",
        to: "/app/ui/navigation"
      },
      {
        icon: "simple-icon-pin",
        label: "menu.popover-tooltip",
        to: "/app/ui/popover-tooltip"
      },
      {
        icon: "simple-icon-shuffle",
        label: "menu.sortable",
        to: "/app/ui/sortable"
      },
      { icon: "simple-icon-grid", label: "menu.tables", to: "/app/ui/tables" }
    ]
  },
  {
    id: "menu",
    icon: "simple-icon-user",
    label: "menu.menu",
    to: "/app/menu",
    title: "Профиль",
    subs: [
      {
        icon: "simple-icon-logout",
        label: "menu.types",
        to: "/app/menu/types"
      },
      {
        icon: "simple-icon-layers",
        label: "menu.levels",
        to: "/app/menu/levels",
        subs: [
          {
            icon: "simple-icon-arrow-right",
            label: "menu.third-level-1",
            to: "/app/menu/levels/third-level-1"
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.third-level-2",
            to: "/app/menu/levels/third-level-2"
          },
          {
            icon: "simple-icon-arrow-right",
            label: "menu.third-level-3",
            to: "/app/menu/levels/third-level-3"
          }
        ]
      }
    ]
  },
  {
    id: "docs",
    icon: "simple-icon-question",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    title: "Помощь",
    // newWindow:true
  },
  {
    id: "blankpage",
    icon: "simple-icon-power",
    label: "menu.blank-page",
    to: "/app/blank-page",
    title: "Выйти",
  }
];
export default data;
