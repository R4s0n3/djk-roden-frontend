const actions = [
    {
      id: "news",
      name: "News",
      keywords: "aktion",
      perform: () => (window.location.pathname = "news"),
    },
    {
      id: "verein",
      name: "Verein",
      keywords: "vorstand",
      perform: () => (window.location.pathname = "verein"),
    },
    {
      id: "contact",
      name: "Kontakt",
      keywords: "kontakt",
      perform: () => (window.location.pathname = "kontakt"),
    }
  ]

  export default actions;