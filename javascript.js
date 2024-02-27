const div1 = document.querySelector(".top1");
const div2 = document.querySelector(".top2");
const div3 = document.querySelector(".maindiv3");
const div4 = document.querySelector(".idcarddiv");
const nextbtn = document.querySelector(".nextbtn");
const backbtn = document.querySelector(".Backbtn");

const nameit = document.querySelector(".in1");
const sal = document.querySelector(".salin");
const ed = document.querySelector(".eid");
const des = document.querySelector(".desig");
const department = document.querySelector(".depat");
const dob = document.querySelector(".date");
const exp = document.querySelector(".expi");

function containsOnlyALpha(str) {
  var regex = /^[A-Za-z .]+$/;
  return regex.test(str);
}

function isDateAtLeast18YearsAgo(dateString) {
  var inputDate = new Date(dateString);

  var currentDate = new Date();

  var eighteenYearsAgoDate = new Date();
  eighteenYearsAgoDate.setFullYear(currentDate.getFullYear() - 18);

  return inputDate <= eighteenYearsAgoDate;
}

nextbtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (nameit.value != "" && dob.value != "" && ed.value != "") {
    if (containsOnlyALpha(nameit.value) && isDateAtLeast18YearsAgo(dob.value)) {
      console.log("Forms 2");
      div1.classList.add("hide");
      div2.classList.remove("hide");
    } else {
      if (!containsOnlyALpha(nameit.value)) {
        alert("Enter a proper name");
      } else {
        alert("The dob entered doesn't seems to be legit");
      }
    }
  } else {
    alert("All fields are to be filled");
  }
});

const functionalityofdisplay = () => {
  const empnamespan = document.querySelector("#empNameSpan");
  const designationspan = document.querySelector("#designationSpan");
  const employeeID = document.querySelector("#employeeIdSpan");
  const dobspan = document.querySelector("#dobSpan");
  const departmentSpan = document.querySelector("#departmentSpan");

  empnamespan.innerHTML = nameit.value;
  designationspan.innerHTML = des.value;
  employeeID.innerHTML = ed.value;
  dobspan.innerHTML = dob.value;
  departmentSpan.innerHTML = department.value;

  const selector = document.querySelector(".tb");
  async function fetching() {
    const response = await fetch(
      "https://emp-backend-78rl.onrender.com/api/v1/tasks"
    );
    const data = await response.json();
    console.log(data.data);
    if (Array.isArray(data.data)) {
      data.data.forEach((d) => {
        const date = d.dob;
        const interator = `<tr>
          <td>${d.empname}</td>
          <td>${d.dept}</td>
          <td>${date.split("T")[0]}</td>
          <td>${d.experience}</td>
          <td>${d.sal}</td>
          <td>${d.empid}</td>
          <td>${d.desig}</td>
        </tr>`;
        selector.innerHTML += interator;
      });
    } else {
      console.log("data is not an array");
    }
  }
  fetching();
  const bttn = document
    .querySelector(".btn")
    .addEventListener("click", (event) => {
      div3.classList.remove("hide");
      div2.classList.add("hide");
    });
};

document
  .querySelector(".submitbtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (des.value != "" && sal.value != "" && exp.value != "") {
      if (!containsOnlyALpha(des.value)) {
        alert("Enter a proper designation");
      } else {
        console.log(nameit.value);
        console.log(sal.value);
        console.log(ed.value);
        console.log(des.value);
        console.log(department.value);
        console.log(dob.value);
        console.log(exp.value);

        const requestData1 = {
          name: nameit.value,
          depart: department.value,
          dob: dob.value,
          eid: ed.value,
          sal: sal.value,
          exp: exp.value,
          des: des.value,
        };

        async function postData(
          url = "https://emp-backend-78rl.onrender.com/api/v1/tasks/postone",
          data = requestData1
        ) {
          try {
            console.log("Executing posting");
            const response = await fetch(url, {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow",
              referrerPolicy: "no-referrer",
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              throw new Error("Failed to add data. Please try again.");
            }

            const responseData = await response.json();
            console.log(responseData.msg);

            if (responseData.msg === "Success") {
              console.log("Success on time");
              alert("Your data is added");
              div2.classList.add("hide");
              div3.classList.remove("hide");
              functionalityofdisplay();
            } else {
              alert(responseData.msg);
            }
          } catch (error) {
            console.error("Error:", error.message);
            alert(
              "An error occurred while adding data. Please try again later."
            );
          }
        }
        postData();
      }
    } else {
      alert("Fill all fields");
    }
  });
backbtn.addEventListener("click", (event) => {
  div3.classList.add("hide");
  div1.classList.remove("hide");
});
const genidbtn = document.querySelector(".genidcard");

genidbtn.addEventListener("click", (event) => {
  div3.classList.add("hide");
  div4.classList.remove("hide");
});

function downloadEmployeeCard() {
  var employeeCard = document.getElementById("employeeCard");

  var empName = document.getElementById("empNameSpan").innerText;
  var designation = document.getElementById("designationSpan").innerText;
  var employeeId = document.getElementById("employeeIdSpan").innerText;
  var dob = document.getElementById("dobSpan").innerText;
  var department = document.getElementById("departmentSpan").innerText;

  var canvas = document.createElement("canvas");
  canvas.width = employeeCard.offsetWidth;
  canvas.height = employeeCard.offsetHeight;

  var context = canvas.getContext("2d");

  context.fillStyle = "#f0f0f0";

  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#333";

  context.font = "bold 16px Arial";

  context.fillText("EMP name:", 20, 40);
  context.fillText(empName, 150, 40);

  context.fillText("Designation:", 20, 80);
  context.fillText(designation, 150, 80);

  context.fillText("Employee ID:", 20, 120);
  context.fillText(employeeId, 150, 120);

  context.fillText("DOB:", 20, 160);
  context.fillText(dob, 150, 160);

  context.fillText("Department:", 20, 200);
  context.fillText(department, 150, 200);

  var dataURL = canvas.toDataURL("image/png");

  var link = document.createElement("a");
  link.href = dataURL;
  link.download = "employee_id_card.png";
  link.click();
}
const idcardgenerationbtn = document
  .querySelector(".idcardgenbtn")
  .addEventListener("click", (event) => {
    downloadEmployeeCard();
  });

document.querySelector(".idbackbtn").addEventListener("click", (event) => {
  div4.classList.add("hide");
  div3.classList.remove("hide");
  functionalityofdisplay();
});
