var elave_et = document.querySelector(".add");
var task_daxil_et = document.getElementById("text");
var secilmisleri_sil = document.querySelector(".checked_delete");
var hamisini_sec = document.querySelector(".check_all");
var boxContainer = document.querySelector(".box_container");
var sil = document.querySelector(".sil");

let data = JSON.parse(localStorage.getItem("data")) || [
  {
    todo: "Task 1",
    checked: false,
    editable: false,
  },
  {
    todo: "Task 2",
    checked: false,
    editable: false,
  },
];

elave_et.addEventListener("click", () => {
  data.push({
    todo: task_daxil_et.value,
    checked: false,
    editable: false,
  });
  writeData();
});

function selectItem(i) {
  var checkbox_inputs = document.querySelectorAll(".checks");
  data[i].checked = checkbox_inputs[i].checked;
  writeData();
}

function writeData() {
  boxContainer.innerHTML = "";
  for (let i in data) {
    boxContainer.innerHTML += `
    <div class='data'>
       <input type="checkbox" ${
         data[i].checked ? "checked" : ""
       }   name="" class="checks" id='check${i}" onClick="selectItem(${i})'>

        <div class='content'>
        <input id="${i}" type="text" ${
      !data[i].editable ? "readonly" : ""
    } value='${data[i].todo}' name="" class="task1" id=''>
    <div class = "actions">
        <div class='sil' onClick="deleteData(${i})" >Sil</div>
        <div class='edit' onClick="editTodo(${i})">${
      data[i].editable ? "Save" : "Edit"
    }</div>
        </div>
     </div>
    `;
  }
  savesStorage();
}

(() => {
  writeData();
})();

function allSelect() {
  var counter = 0;
  for (i of data) {
    if (i.checked === true) {
      counter++;
    }
  }

  if (counter === data.length) {
    for (i of data) {
      i.checked = false;
    }
  } else {
    for (i of data) {
      i.checked = true;
    }
  }

  writeData();
}

function checkedDelete() {
  for (i in data) {
    if (data[i].checked === true) {
      data.splice(i, 1);
    }
  }

  writeData();
}

function deleteData(i) {
  data.splice(i, 1);
  writeData();
}

function editTodo(i) {
  if (data[i].editable === true) {
    data[i].editable = false;
  } else {
    data[i].editable = true;
  }

  data[i].todo = document.getElementById(i).value;

  writeData();
}

function savesStorage() {
  localStorage.setItem("data", JSON.stringify(data));
}
