// const addItemButton = document.getElementById('additemButton');
const tableBody = document.querySelector("#tableBody");

var items = [
  {
    checked: false,
    title: "Document Title 1",
    Status: "Completed",
    date: "03/02/2025",
    time: "2:20 PM",
    file: "",
  },
  {
    checked: false,
    title: "Document Title 2",
    Status: "Pending",
    date: "03/02/2025",
    time: "2:30 PM",
    file: "",
  },
  {
    checked: true,
    title: "Document Title 3",
    Status: "Waiting",
    date: "03/02/2025",
    time: "2:40 PM",
    file: "",
  },
];

// Reset modal to default values when opened

const profile_Div = document.getElementById("profile_Page");
const document_Div = document.getElementById("Document_Page");
const modalElement = document.getElementById("inputModal");
const headCheckbox = document.getElementById("headCheckbox");
const removeButton = document.getElementById("removeButtonText");
const panelClosingButton = document.getElementById("PanelClosingIcon");
const panelOpeningButton = document.getElementById("PanelOpeningIcon");
const profileButton = document.getElementById("profileIcon");
const profileBox = document.getElementById("profileBox");
const editButton = document.getElementById("editButton");
const document_nav = document.getElementById("document");

modalElement.addEventListener("show.bs.modal", () => {
  document.getElementById("modalForm").reset();
  const listSelection = document.getElementById("listSelection");
  listSelection.selectedIndex = 0; // Reset the dropdown to default
});

document.getElementById("saveButton").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  const listSelection = document.getElementById("listSelection");

  if (!fileInput.files.length) {
    alert("Please select a file.");
    return;
  }

  if (!listSelection.value) {
    alert("Please select file Status from the list.");
    return;
  }

  // Example of processing the form data
  const file = fileInput.files[0];
  const selectedOption = listSelection.value;

  //   console.log("File:", file);
  //   console.log("Selected Option:", selectedOption);

  let fileTitle = file.name;
  let fileStatus = selectedOption;

  const lastModifiedDate = file.lastModifiedDate;

  const day = String(lastModifiedDate.getDate()).padStart(2, "0");
  const month = String(lastModifiedDate.getMonth() + 1).padStart(2, "0");
  const year = lastModifiedDate.getFullYear();

  const date = `${day}/${month}/${year}`;
  const time = lastModifiedDate.toTimeString().split(" ")[0];

  addNewItem(fileTitle, fileStatus, date, time, file);

  // Close the modal
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();

  //   alert("Data saved successfully!");
});

//Add Item in items

// function addNewItem(fileTitle, fileStatus, date, time) {
//   items = [
//     ...items,
//     {
//       checked: false,
//       title: fileTitle,
//       Status: fileStatus,
//       date: date,
//       time: time,
//     },
//   ];
//   loadItems(items);
// }

function addNewItem(title, status, date, time, file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const fileData = {
      name: file.name,
      content: event.target.result, // Base64 encoded file content
    };

    // Add new item to the items array
    const newItem = {
      checked: false,
      title,
      Status: status,
      date,
      time,
      file: fileData,
    };

    items.push(newItem);
    loadItems(items);

    localStorage.setItem("items", JSON.stringify(items));
    // alert("Item added and saved to local storage!");
  };

  reader.readAsDataURL(file); // Read file as Base64
}

// Loading items

function loadItems(items) {
  let stringhtml = "";

  items.forEach((element, index) => {
    // console.log(element);
    //

    // stringhtml += `
    //     <tr class="table w-full table-fixed h-10">
    //             <td class="trCustom" style="padding-left: 28px; width: 75px">
    //                 <input check-id='${index}' type="checkbox"  name="check1" id="check1" ${
    //   element.checked ? "checked" : ""
    // }/>
    //             </td>
    //             <td class="trCustom">
    //                 <p class="text-slate-400 font-semibold text-sm pl-2 pt-2 pb-2">${
    //                   element.title
    //                 }</p>
    //             </td>
    //             <td class="trCustom">
    //                 <button class="button2 ${
    //                   element.Status == "Completed"
    //                     ? "green"
    //                     : element.Status == "Waiting"
    //                     ? "grey"
    //                     : "darkgrey"
    //                 }">${
    //   element.Status == "Completed"
    //     ? "Completed"
    //     : element.Status == "Waiting"
    //     ? "Pending"
    //     : "Needs Signing"
    // }</button>
    //             </td>
    //             <td class="trCustom">
    //                 <div class="last-area">
    //                 <div class="time-section">
    //                     <time date="10/22/2024">${element.date}</time>
    //                     <time time="2:01 pm">${element.time}</time>
    //                 </div>
    //                 <div class="button-menu-section">
    //                     <button class="button3">${
    //                       element.Status == "Completed"
    //                         ? "Download PDF"
    //                         : element.Status == "Waiting"
    //                         ? "Preview"
    //                         : "Sign Now"
    //                     }</button>
    //                     <figure style="margin:0px">
    //                     <img
    //                         src="assets/menu.svg"
    //                         alt="Not Found"
    //                         style="align-self: center;"
    //                     />
    //                     </figure>
    //                 </div>
    //                 </div>
    //             </td>
    //         </tr>
    //     `;

    stringhtml += `<tr>
                              <td class="px-6 py-4"><input check-id='${index}' type="checkbox" name="check1" class="w-4 h-4 cursor-pointer" id="check1" ${
      element.checked ? "checked" : ""
    } /></td>
                              <td class="px-6 py-4">${element.title}</td>
                              <td class="px-6 py-4">
                                  <button class=" text-black font-semibold px-3 py-1 rounded ${
                                    element.Status == "Completed"
                                      ? "bg-green-300"
                                      : element.Status == "Waiting"
                                      ? "bg-yellow-200"
                                      : "bg-blue-300"
                                  }" >${
      element.Status == "Completed"
        ? "Completed"
        : element.Status == "Waiting"
        ? "Pending"
        : "Needs Signing"
    }</button>
                              </td>
                              <td class="tdCustom px-6 py-4">
                                  <div class="last-area flex justify-between">
                                      <div class="flex flex-col self-center text-gray-600">
                                          <time date="10/25/2024">${
                                            element.date
                                          }</time>
                                          <time time="4:10 pm">${
                                            element.time
                                          }</time>
                                      </div>
                                      <div class="button-menu-section flex self-center items-center gap-3">
                                          <button class="bg-slate-400 text-black font-semibold px-4 py-1 rounded">${
                                            element.Status == "Completed"
                                              ? "Download PDF"
                                              : element.Status == "Waiting"
                                              ? "Preview"
                                              : "Sign Now"
                                          }</button>
                                          <figure class="m-0">
                                              <img src="assets/menu.svg" alt="Menu" class="w-5 h-5 cursor-pointer">
                                          </figure>
                                      </div>
                                  </div>
                              </td>
                          </tr>
        `;
  });
  checkCheckbox();
  tableBody.innerHTML = stringhtml;
}

function handelCheckbox() {
  // headCheckbox.hasAttribute;
  if (headCheckbox.checked) {
    // headCheckbox.removeAttribute("checked");
    items = items.map((element) => {
      return {
        ...element,
        checked: true,
      };
    });
  } else {
    // headCheckbox.checked == true;
    items = items.map((element) => {
      return {
        ...element,
        checked: false,
      };
    });
  }
  loadItems(items);
  localStorage.setItem("items", JSON.stringify(items));
}

function handelCheckBox(event) {
  // console.log(event.target.checked);
  if (event.target.nodeName.toLowerCase() === "input") {
    let id = event.target.getAttribute("check-id");
    // console.log(id);
    items = items.map((element, index) => {
      if (index == id) {
        // console.log("Hll");
        if (event.target.checked) {
          return {
            ...element,
            checked: true,
          };
        } else {
          return {
            ...element,
            checked: false,
          };
        }
      }
      return element;
    });
    // console.log(items);

    checkCheckbox();
  }
}

function checkCheckbox() {
  if (
    items.some((element) => {
      return element.checked === true;
    })
  ) {
    // console.log("RedText");
    document.getElementById("removeButtonText").style.display = "block";
  } else {
    document.getElementById("removeButtonText").style.display = "none";
  }
}

function handelRemove() {
  items = items.filter((element, index) => {
    if (!element.checked) {
      return element;
    }
  });
  headCheckbox.checked = false;
  // console.log(items);
  loadItems(items);
  localStorage.setItem("items", JSON.stringify(items));
}

function handelPanelClosing() {
  const panel = document.getElementById("sidepanel");
  panel.style.width = "0px";
  panel.style.padding = "0px";
  panel.style.display = "none";
  panelOpeningButton.style.display = "block";

  //Profile Box Position

  if (profileBox.style.display !== "none") {
    profileBox.style.top = "125px";
  }
}

function handelProfileButton() {
  profileBox.style.display =
    profileBox.style.display == "none" ? "block" : "none";

  if (panelOpeningButton.style.display == "none") {
    profileBox.style.top = "70px";
  } else {
    profileBox.style.top = "125px";
  }
}

function handleEditButton() {
  // window.location.href = "editProfile.html";
  document_Div.style.display = "none";
  profile_Div.style.display = "block";

  // let document_nav = document.getElementById("document");
  document_nav.classList.remove("active");
}

function getItemsFromLocalStorage() {
  const storedItems = localStorage.getItem("items");

  if (storedItems) {
    items = JSON.parse(storedItems);
    // console.log("Retrieved items:", items);
    // return items;
  } else {
    console.log("No items found in local storage.");
    items = [
      {
        checked: false,
        title: "Document Title 1",
        Status: "Completed",
        date: "03/02/2025",
        time: "2:20 PM",
        file: "",
      },
      {
        checked: false,
        title: "Document Title 2",
        Status: "Pending",
        date: "03/02/2025",
        time: "2:30 PM",
        file: "",
      },
      {
        checked: true,
        title: "Document Title 3",
        Status: "Waiting",
        date: "03/02/2025",
        time: "2:40 PM",
        file: "",
      },
    ];

    // Store these predefined items in localStorage for future use
    localStorage.setItem("items", JSON.stringify(items));
    // return [];
  }
}

function load_document_Page() {
  document_nav.classList.add("active");
  document_Div.style.display = "block";
  profile_Div.style.display = "none";
  profileBox.style.display = "none";
}
function init() {
  // addItemButton.addEventListener('click' , handleAddItem);

  getItemsFromLocalStorage();

  loadItems(items);

  headCheckbox.addEventListener("click", handelCheckbox);

  tableBody.addEventListener("click", handelCheckBox);

  removeButton.addEventListener("click", handelRemove);

  panelClosingButton.addEventListener("click", handelPanelClosing);

  profileButton.addEventListener("click", handelProfileButton);

  // editButton.addEventListener("click", handleEditButton);

  document_nav.addEventListener("click", load_document_Page);
}

init();

function openNav() {
  const panel = document.getElementById("sidepanel");
  panel.style.display = "block";
  panel.style.width = "20%";
  panel.style.height = "100%";
  // panel.style.padding = "20px 24px 20px 24px";
  panelOpeningButton.style.display = "none";

  //Profile Box Position

  if (profileBox.style.display !== "none") {
    profileBox.style.top = "70px";
  }
}
