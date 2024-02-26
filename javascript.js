const div1 = document.querySelector(".top1");
const div2 = document.querySelector(".top2");
const div3 = document.querySelector(".maindiv3");
const nextbtn = document.querySelector(".nextbtn");
const backbtn = document.querySelector(".Backbtn");
const nameit = document.querySelector(".in1");
const sal = document.querySelector(".salin");
const ed = document.querySelector(".eid");
const des = document.querySelector(".desig");
const department = document.querySelector(".depat");
const dob = document.querySelector(".date");
const exp = document.querySelector(".expi");

div1.classList.remove("hide");
nextbtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (nameit.value != "" && dob.value != "" && ed.value != "") {
    console.log("Forms 2");
    div1.classList.add("hide");
    div2.classList.remove("hide");
  } else {
    alert("All fields are to be filled");
  }
});

const functionalityofdisplay = () => {
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
        alert("An error occurred while adding data. Please try again later.");
      }
    }

    console.log("east");
    postData();
  });
backbtn.addEventListener("click", (event) => {
  div3.classList.add("hide");
  div1.classList.remove("hide");
});
