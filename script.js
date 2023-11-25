const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar__"),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle__switch"),
      modeText = body.querySelector(".mode_text");

      toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close");
      });

      modeSwitch.addEventListener("click", () =>{
        body.classList.toggle("dark");
      });